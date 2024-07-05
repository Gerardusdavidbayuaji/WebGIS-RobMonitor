import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface BasemapProps {
  dataLayers: any;
  zoomToData: any;
}

const Basemap = (props: BasemapProps) => {
  const { dataLayers, zoomToData } = props;
  const mapRef = useRef<L.Map | null>(null);
  const layerRefs = useRef<any>({});

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", { zoomControl: false }).setView(
        [-2.18, 115.795],
        5
      );
      const baseMap = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        }
      );
      baseMap.addTo(mapRef.current);
    }

    Object.keys(layerRefs.current).forEach((key) => {
      if (mapRef.current && layerRefs.current[key]) {
        mapRef.current.removeLayer(layerRefs.current[key]);
      }
    });

    Object.keys(dataLayers).forEach((key) => {
      if (mapRef.current) {
        switch (key) {
          case "Bahaya Rob Rendah":
            layerRefs.current[key] = L.geoJSON(dataLayers[key], {
              style: () => ({
                fillColor: "#5DAE8B",
                fillOpacity: 0.8,
                stroke: false,
              }),
              onEachFeature: (feature, layer) => {
                const popupContent = `
              <div>
                <p class="text-base text-[#292929]">Luas (ha): <span>${feature.properties.Luas_m2}</span></p>
                <p class="text-base text-[#292929]">Status: <span>${feature.properties.layer}</span></p>
              </div>
            `;
                layer.bindPopup(popupContent);
              },
            }).addTo(mapRef.current);
            break;
          case "Bahaya Rob Sedang":
            layerRefs.current[key] = L.geoJSON(dataLayers[key], {
              style: () => ({
                fillColor: "#F6F49D",
                fillOpacity: 0.8,
                stroke: false,
              }),
              onEachFeature: (feature, layer) => {
                const popupContent = `
              <div>
                <p class="text-base text-[#292929]">Luas (ha): <span>${feature.properties.Luas_m2}</span></p>
                <p class="text-base text-[#292929]">Status: <span>${feature.properties.layer}</span></p>
              </div>
            `;
                layer.bindPopup(popupContent);
              },
            }).addTo(mapRef.current);
            break;
          case "Bahaya Rob Tinggi":
            layerRefs.current[key] = L.geoJSON(dataLayers[key], {
              style: () => ({
                fillColor: "#FF7676",
                fillOpacity: 0.8,
                stroke: false,
              }),
              onEachFeature: (feature, layer) => {
                const popupContent = `
              <div>
                <p class="text-base text-[#292929]">Luas (ha): <span>${feature.properties.Luas_m2}</span></p>
                <p class="text-base text-[#292929]">Status: <span>${feature.properties.layer}</span></p>
              </div>
            `;
                layer.bindPopup(popupContent);
              },
            }).addTo(mapRef.current);
            break;
          case "Batas Kecamatan":
            layerRefs.current[key] = L.geoJSON(dataLayers[key], {
              style: {
                color: "#9DB2BF",
                weight: 1,
                opacity: 1,
              },
              onEachFeature: (feature, layer) => {
                const popupContent = `
              <div>
                <p class="text-base text-[#292929]">Kecamatan: <span>${feature.properties.WADMKC}</span></p>
              </div>
            `;
                layer.bindPopup(popupContent);
              },
            }).addTo(mapRef.current);
            break;
          case "Garis Pantai":
            layerRefs.current[key] = L.geoJSON(dataLayers[key], {
              style: {
                color: "#9DB2BF",
                weight: 1,
                opacity: 1,
              },
              onEachFeature: (feature, layer) => {
                const popupContent = `
              <div>
                <p class="text-base text-[#292929]">Panjang Pantai: <span>${feature.properties.Panjang_m2}</span></p>
              </div>
            `;
                layer.bindPopup(popupContent);
              },
            }).addTo(mapRef.current);
            break;
          case "Persil Bangunan":
            layerRefs.current[key] = L.geoJSON(dataLayers[key], {
              style: (feature: any) => {
                let color = "blue";
                switch (feature.properties.tipe) {
                  case "Industri/Gedung":
                    color = "#4245f5";
                    break;
                  case "Pemukiman":
                    color = "#FF5B22";
                    break;
                  case "Perdagangan/Jasa":
                    color = "#9c7a1f";
                    break;
                  case "Tempat Ibadah":
                    color = "#a31107";
                    break;
                  case "Kantor Pemerintahan":
                    color = "#095c1f";
                    break;
                  default:
                    color = "blue";
                }
                return {
                  color: color,
                  fillOpacity: 0.5,
                  weight: 1,
                  opacity: 1,
                };
              },
              onEachFeature: (feature, layer) => {
                const popupContent = `
              <div>
                <p class="text-base text-[#292929]">Luas (ha): <span>${feature.properties.tipe}</span></p>
                <p class="text-base text-[#292929]">Tinggi Bangunan: <span>${feature.properties.tinggi} meter</span></p>
              </div>
            `;
                layer.bindPopup(popupContent);
              },
            }).addTo(mapRef.current);
            break;
          case "Sungai":
            layerRefs.current[key] = L.geoJSON(dataLayers[key], {
              style: {
                fillColor: "#6DB9EF",
                fillOpacity: 1,
                stroke: false,
              },
              onEachFeature: (feature, layer) => {
                const popupContent = `
              <div>
                <p class="text-base text-[#292929]">Luas (ha): <span>${feature.properties.NAMOBJ}</span></p>
              </div>
            `;
                layer.bindPopup(popupContent);
              },
            }).addTo(mapRef.current);
            break;
          case "Titik Validasi":
            const validationIcon = L.icon({
              iconUrl: "/assets/banjir.svg",
              iconSize: [32, 32],
              iconAnchor: [12, 25],
              popupAnchor: [0, -25],
            });
            layerRefs.current[key] = L.geoJSON(dataLayers[key], {
              pointToLayer: (_feature: any, latlng: L.LatLngExpression) => {
                return L.marker(latlng, { icon: validationIcon });
              },
              onEachFeature: (feature, layer) => {
                const popupContent = `
              <div>
                <p class="text-base text-[#292929]">Latitude: <span>${feature.properties.Latitude}</span></p>
                <p class="text-base text-[#292929]">Longitude: <span>${feature.properties.Longitude}</span></p>
              </div>
            `;
                layer.bindPopup(popupContent);
              },
            }).addTo(mapRef.current);
            break;
          default:
            layerRefs.current[key] = L.geoJSON(dataLayers[key], {
              onEachFeature: (feature, layer) => {
                layer.bindPopup(`Layer: ${feature.properties.layer}`);
              },
            }).addTo(mapRef.current);
            break;
        }
      }
    });

    if (zoomToData && mapRef.current) {
      const layer = L.geoJSON(zoomToData);
      const bounds = layer.getBounds();
      mapRef.current.flyToBounds(bounds, { maxZoom: 14 });
    }
  }, [dataLayers, zoomToData]);

  return (
    <div className="w-full h-screen z-0 absolute top-0">
      <div id="map" />
    </div>
  );
};

export default Basemap;
