import { useEffect, useState } from "react";
import CardParameter from "@/components/CardParameter";
import CardBaseMap from "@/components/CardBaseMap";
import Basemap from "@/components/Basemap";
import Sidebar from "@/components/Sidebar";
import { getGenanganRob } from "@/utils/apis/work";

const Dashboard = () => {
  const [activateParam, setActivateParam] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [zoomToData, setZoomToData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGenanganRob();
        setData(result);
        if (activateParam === "Bahaya Rob Rendah") {
          setZoomToData(result);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    if (activateParam == "Bahaya Rob Rendah") {
      fetchData();
    } else {
      setData(null);
      setZoomToData(null);
    }
  }, [activateParam]);

  const toggleSideBar = (param: string) => {
    setActivateParam(activateParam === param ? null : param);
  };

  const handleZoomToData = (param: string) => {
    if (param === "Bahaya Rob Rendah") {
      setZoomToData(data);
    }
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
      <Basemap data={data} zoomToData={zoomToData} />
      <div className="fixed bottom-0 left-0 right-0 p-4 z-10 mb-2">
        <div className="flex space-x-4 overflow-x-auto">
          {parameters.map((param) => (
            <CardParameter
              key={param}
              title={param}
              isActive={activateParam === param}
              onToggle={toggleSideBar}
              onEyeClick={handleZoomToData}
            />
          ))}
        </div>
      </div>
      <CardBaseMap />
      <Sidebar activateParam={activateParam} />
    </div>
  );
};

export default Dashboard;
