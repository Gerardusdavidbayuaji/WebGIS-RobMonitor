import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const MapPlain = () => {
  const [selectedDanger] = useState("Bahaya Rob Rendah");
  const [dangerLayer, setDangerLayer] = useState<L.LayerGroup<any> | null>(
    null
  );
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [showWMSLayer, setShowWMSLayer] = useState(true);
  const [showHighDanger, setShowHighDanger] = useState(false);
  const [showMediumDanger, setShowMediumDanger] = useState(false);
  const [showLowDanger, setShowLowDanger] = useState(false);

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

        let filteredGeoJsonData = geoJsonData.features.filter(
          (feature: { properties: { layer: string } }) => {
            if (selectedDanger === "All") return true;
            if (selectedDanger === "Bahaya Rob Rendah")
              return (
                showLowDanger &&
                feature.properties.layer === "Bahaya Rob Rendah"
              );
            if (selectedDanger === "Bahaya Rob Sedang")
              return (
                showMediumDanger &&
                feature.properties.layer === "Bahaya Rob Sedang"
              );
            if (selectedDanger === "Bahaya Rob Tinggi")
              return (
                showHighDanger &&
                feature.properties.layer === "Bahaya Rob Tinggi"
              );
            return false;
          }
        );

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
  }, [
    selectedDanger,
    mapInstance,
    showHighDanger,
    showMediumDanger,
    showLowDanger,
  ]);

  useEffect(() => {
    const getWmsData = async () => {
      if (!mapInstance) return;

      const urlBahayaRob = "http://localhost:8080/geoserver/rob_jatim/wms";

      try {
        if (showWMSLayer) {
          const wmsLayer = L.tileLayer.wms(urlBahayaRob, {
            layers: "rob_jatim:bahaya_rob_jatim",
            format: "image/png",
            transparent: true,
          });
          wmsLayer.addTo(mapInstance);

          mapInstance.on("click", async (e) => {
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
        } else {
          // Remove WMS layer if showWMSLayer is false
          mapInstance.eachLayer((layer) => {
            if (layer instanceof L.TileLayer.WMS) {
              mapInstance.removeLayer(layer);
            }
          });
        }
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

  const handleWMSLayerToggle = () => {
    setShowWMSLayer(!showWMSLayer);
  };

  const handleHighDangerToggle = () => {
    setShowHighDanger(!showHighDanger);
  };

  const handleMediumDangerToggle = () => {
    setShowMediumDanger(!showMediumDanger);
  };

  const handleLowDangerToggle = () => {
    setShowLowDanger(!showLowDanger);
  };

  return (
    <section>
      <div className="flex flex-col bg-[#FAFAF9] w-60 h-44 font-poppins z-20 absolute rounded-md m-2">
        <div className="m-2">
          <div>
            <h2>WFS: Bahaya Rob</h2>
            <hr />
            <input
              type="checkbox"
              id="toggleHighDanger"
              checked={showHighDanger}
              onChange={handleHighDangerToggle}
            />
            <label htmlFor="toggleHighDanger">Bahaya Rob Tinggi</label>
            <br />
            <input
              type="checkbox"
              id="toggleMediumDanger"
              checked={showMediumDanger}
              onChange={handleMediumDangerToggle}
            />
            <label htmlFor="toggleMediumDanger">Bahaya Rob Sedang</label>
            <br />
            <input
              type="checkbox"
              id="toggleLowDanger"
              checked={showLowDanger}
              onChange={handleLowDangerToggle}
            />
            <label htmlFor="toggleLowDanger">Bahaya Rob Rendah</label>
          </div>
          <div className="mt-2">
            <h2>WMS : Index Bahaya Rob</h2>
            <hr />
            <input
              type="checkbox"
              id="toggleWMSLayer"
              checked={showWMSLayer}
              onChange={handleWMSLayerToggle}
            />
            <label htmlFor="toggleWMSLayer">Index</label>
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
