import { useEffect, useState } from "react";
import {
  getGenanganRob,
  getPersilBangunan,
  getSungai,
  getTitikValdasi,
  getGarisPantai,
  getBatasKecamatan,
} from "@/utils/apis/work";
import CardParameter from "@/components/CardParameter";
import CardBaseMap from "@/components/CardBaseMap";
import Basemap from "@/components/Basemap";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const [activateParam, setActivateParam] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [zoomToData, setZoomToData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        switch (activateParam) {
          case "Bahaya Rob Rendah":
          case "Bahaya Rob Sedang":
          case "Bahaya Rob Tinggi":
            result = await getGenanganRob();
            break;
          case "Persil Bangunan":
            result = await getPersilBangunan();
            break;
          case "Sungai":
            result = await getSungai();
            break;
          case "Titik Validasi":
            result = await getTitikValdasi();
            break;
          case "Garis Pantai":
            result = await getGarisPantai();
            break;
          case "Batas Kecamatan":
            result = await getBatasKecamatan();
            break;
          default:
            result = null;
            break;
        }

        if (result) {
          setData(result);
          setZoomToData(result);
        } else {
          setData(null);
          setZoomToData(null);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [activateParam]);

  const toggleSideBar = (param: string) => {
    setActivateParam((currentParam) => (currentParam === param ? null : param));
  };

  const handleZoomToData = (param: string) => {
    if (param === activateParam) {
      setZoomToData(data);
    }
  };

  const parameters = [
    "Bahaya Rob Rendah",
    "Bahaya Rob Sedang",
    "Bahaya Rob Tinggi",
    "Batas Kecamatan",
    "Garis Pantai",
    "Persil Bangunan",
    "Sungai",
    "Titik Validasi",
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
