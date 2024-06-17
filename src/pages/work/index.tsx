import { useState } from "react";
import CardParameter from "@/components/CardParameter";
import CardBaseMap from "@/components/CardBaseMap";
import Basemap from "@/components/Basemap";
import Sidebar from "@/components/Sidebar";

const MapPlain = () => {
  const [activateParam, setActivateParam] = useState<string | null>(null);

  const toggleSideBar = (param: string) => {
    setActivateParam(activateParam === param ? null : param);
  };

  const parameters = [
    "Bahaya Rob Rendah",
    "Bahaya Rob Sedang",
    "Bahaya Rob Tinggi",
    "Persil Bangunan",
    "Batas Kecamatan",
    "Sungai",
  ];

  return (
    <div className="relative min-h-screen">
      <Basemap />
      <div className="fixed bottom-0 left-0 right-0 p-4 z-10 mb-2">
        <div className="flex space-x-4 overflow-x-auto">
          {parameters.map((param) => (
            <CardParameter
              key={param}
              title={param}
              isActive={activateParam === param}
              onToggle={toggleSideBar}
            />
          ))}
        </div>
      </div>
      <CardBaseMap />
      <Sidebar activateParam={activateParam} />
    </div>
  );
};

export default MapPlain;
