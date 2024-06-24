import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface BasemapProps {
  dataLayers: any;
  zoomToData: any;
}

const Basemap = ({ dataLayers, zoomToData }: BasemapProps) => {
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
        layerRefs.current[key] = L.geoJSON(dataLayers[key]).addTo(
          mapRef.current
        );
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
