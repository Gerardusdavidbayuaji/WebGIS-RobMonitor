import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const MapPlain = () => {
  const [selectedDanger, setSelectedDanger] = useState("Bahaya Rob Rendah");
  const [dangerLayer, setDangerLayer] = useState<L.LayerGroup<any> | null>(
    null
  );
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [showWMSLayer, setShowWMSLayer] = useState(false);

  useEffect(() => {
    const map = L.map("map").setView([-7.749, 113.422], 13);
    const baseMap = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    );

    baseMap.addTo(map);
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const getDataGenangan = async () => {
      if (!mapInstance) return;

      const urlGenangan =
        "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Agenangan_rob_jatim&outputFormat=application%2Fjson";

      try {
        const response = await axios.get(urlGenangan);
        const geoJsonData = response.data;

        let filteredGeoJsonData = geoJsonData.features;
        if (selectedDanger !== "All") {
          filteredGeoJsonData = geoJsonData.features.filter(
            (feature: { properties: { layer: string } }) =>
              feature.properties.layer === selectedDanger
          );
        }

        if (dangerLayer) {
          dangerLayer.removeFrom(mapInstance);
        }

        const newDangerLayer = L.geoJson(filteredGeoJsonData, {
          style: {
            color:
              selectedDanger === "Bahaya Rob Rendah"
                ? "green"
                : selectedDanger === "Bahaya Rob Sedang"
                ? "yellow"
                : selectedDanger === "Bahaya Rob Tinggi"
                ? "red"
                : "blue",
            fillOpacity: 0.5,
            weight: 0.3,
            opacity: 1,
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup(
              "luas: " +
                feature.properties.Luas_m2 +
                " status:" +
                feature.properties.layer
            );
          },
        }).addTo(mapInstance);

        setDangerLayer(newDangerLayer);

        mapInstance.fitBounds(newDangerLayer.getBounds());
      } catch (error) {
        console.log("Oops, something went wrong while fetching data", error);
      }
    };

    getDataGenangan();
  }, [selectedDanger, mapInstance]);

  useEffect(() => {
    const getWmsData = async () => {
      if (!mapInstance) return;

      const urlBahayaRob = "http://localhost:8080/geoserver/rob_jatim/wms";

      try {
        const wmsLayer = L.tileLayer.wms(urlBahayaRob, {
          layers: "rob_jatim:bahaya_rob_jatim",
          format: "image/png",
          transparent: true,
        });

        if (showWMSLayer) {
          wmsLayer.addTo(mapInstance);
        } else {
          mapInstance.removeLayer(wmsLayer);
        }

        mapInstance.on("click", async (e) => {
          if (!showWMSLayer) return;

          const urlGetBahayaRob = `${urlBahayaRob}?&styles=
          &service=WMS
          &version=1.1.0
          &srs=EPSG%3A4326
          &request=GetFeatureInfo
          &info_format=application/json
          &layers=rob_jatim%3Abahaya_rob_jatim
          &query_layers=rob_jatim%3Abahaya_rob_jatim
          &width=${mapInstance.getSize().x}
          &height=${mapInstance.getSize().y}
          &bbox=${mapInstance.getBounds().toBBoxString()}
          &x=${mapInstance.latLngToContainerPoint(e.latlng).x}
          &y=${mapInstance.latLngToContainerPoint(e.latlng).y}`;

          try {
            const response = await axios.get(urlGetBahayaRob);
            const geoJsonBahayaRob = response.data;
            const bahayaRobValue =
              geoJsonBahayaRob.features[0].properties.GRAY_INDEX;

            L.popup()
              .setLatLng(e.latlng)
              .setContent("Index: " + bahayaRobValue + " pixel")
              .openOn(mapInstance);
          } catch (error) {
            console.log(
              "Oops, something went wrong while fetching WMS data",
              error
            );
          }
        });
      } catch (error) {
        console.log(
          "Oops, something went wrong while fetching WMS data",
          error
        );
      }
    };

    getWmsData();

    return () => {
      if (mapInstance) {
        mapInstance.off("click");
      }
    };
  }, [mapInstance, showWMSLayer]);

  const handleDangerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDanger(e.target.value);
  };

  const handleWMSLayerToggle = () => {
    setShowWMSLayer(!showWMSLayer);
  };

  return (
    <section>
      <div className="flex flex-col bg-[#FAFAF9] w-60 h-40 font-poppins z-20 absolute rounded-md m-2">
        <div className="m-2">
          <div className="mb-1">
            <h2>WFS</h2>
            <hr />
            <select value={selectedDanger} onChange={handleDangerChange}>
              <option value="All">Bahaya Rob</option>
              <option value="Bahaya Rob Rendah">Bahaya Rob Rendah</option>
              <option value="Bahaya Rob Sedang">Bahaya Rob Sedang</option>
              <option value="Bahaya Rob Tinggi">Bahaya Rob Tinggi</option>
            </select>
          </div>
          <div>
            <h2>WMS</h2>
            <hr />
            <input
              type="checkbox"
              id="toggleWMSLayer"
              checked={showWMSLayer}
              onChange={handleWMSLayerToggle}
            />
            <label htmlFor="toggleWMSLayer">Index Bahaya Rob</label>
          </div>
        </div>
      </div>
      <div className="w-full h-screen z-0 absolute top-0">
        <div id="map"></div>
      </div>
    </section>
  );
};

export default MapPlain;
