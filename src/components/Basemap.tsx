import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface BasemapProps {
  data: any;
  zoomToData: any;
}

const Basemap = ({ data, zoomToData }: BasemapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.GeoJSON | null>(null);
  const [showData, setShowData] = useState(false);

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

    if (layerRef.current) {
      mapRef.current?.removeLayer(layerRef.current);
    }

    if (data && showData) {
      layerRef.current = L.geoJSON(data).addTo(mapRef.current);
    }

    if (zoomToData && mapRef.current) {
      const layer = L.geoJSON(zoomToData);
      const bounds = layer.getBounds();
      mapRef.current.flyToBounds(bounds, { maxZoom: 14 });

      // Setelah selesai zoom, tampilkan data
      setShowData(true);
    }
  }, [data, zoomToData, showData]);

  return (
    <div className="w-full h-screen z-0 absolute top-0">
      <div id="map" />
    </div>
  );
};

export default Basemap;
