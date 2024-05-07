import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const MapPlain = () => {
  const [selectedDanger, setSelectedDanger] = useState("Bahaya Rob Rendah");
  const [dangerLayer, setDangerLayer] = useState<L.LayerGroup<any> | null>(
    null
  );
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  // add basemap
  useEffect(() => {
    const map = L.map("map").setView([-7.749, 113.422], 13);
    const baseMap = L.tileLayer(
      "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=AW8IuG306IIk8kNdxEw6",
      {
        maxZoom: 19,
        attribution:
          '© <a href="https://www.maptiler.com/copyright/">MapTiler</a>, © OpenStreetMap contributors',
      }
    );

    baseMap.addTo(map);
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  // fetch danger data
  useEffect(() => {
    const getDataGenangan = async () => {
      if (!mapInstance) return;

      const urlGenangan =
        "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Agenangan_rob_jatim&outputFormat=application%2Fjson";

      try {
        const response = await axios.get(urlGenangan);
        const geoJsonData = response.data;

        // Filter GeoJSON data based on selected danger
        let filteredGeoJsonData = geoJsonData.features;
        if (selectedDanger !== "All") {
          filteredGeoJsonData = geoJsonData.features.filter(
            (feature: { properties: { layer: string } }) =>
              feature.properties.layer === selectedDanger
          );
        }

        // Remove previous danger layer if exists
        if (dangerLayer) {
          dangerLayer.removeFrom(mapInstance);
        }

        // Create new danger layer and add to map
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
          onEachFeature: function (f, l) {
            l.bindPopup(
              "luas: " + f.properties.Luas_m2 + " status:" + f.properties.layer
            );
          },
        }).addTo(mapInstance);

        // Set new danger layer to state
        setDangerLayer(newDangerLayer);

        mapInstance.fitBounds(newDangerLayer.getBounds());
      } catch (error) {
        console.log("Oops, something went wrong while fetching data", error);
      }
    };

    getDataGenangan();
  }, [selectedDanger, mapInstance]);

  const handleDangerChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedDanger(e.target.value);
  };

  return (
    <section>
      <div className="flex flex-col bg-[#FAFAF9] w-60 h-40 font-poppins z-20 absolute rounded-md m-2">
        <div className=" m-2">
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
            {/* tambahkan pilihan WMS di sini jika diperlukan */}
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
