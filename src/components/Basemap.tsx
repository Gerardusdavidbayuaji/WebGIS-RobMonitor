import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Basemap = () => {
  useEffect(() => {
    const map = L.map("map", { zoomControl: false }).setView(
      [-2.18, 115.795],
      5
    );
    const baseMap = L.tileLayer(
      "https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}@2x.png?key=AW8IuG306IIk8kNdxEw6",
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      }
    );

    baseMap.addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="w-full h-screen z-0 absolute top-0">
      <div id="map" />
    </div>
  );
};

export default Basemap;
