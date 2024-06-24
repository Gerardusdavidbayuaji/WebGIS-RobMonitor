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
  const [activeParams, setActiveParams] = useState<string[]>([]);
  const [dataLayers, setDataLayers] = useState<any>({
    "Bahaya Rob Rendah": null,
    "Bahaya Rob Sedang": null,
    "Bahaya Rob Tinggi": null,
  });
  const [zoomToData, setZoomToData] = useState<any>(null);
  const [lastParam, setLastParam] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (param: string) => {
      try {
        let result;

        switch (param) {
          case "Bahaya Rob Rendah":
          case "Bahaya Rob Sedang":
          case "Bahaya Rob Tinggi":
            const genanganRobData = await getGenanganRob();
            result = genanganRobData.features.filter(
              (feature: any) => feature.properties.layer === param
            );

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
          setDataLayers((prevLayers: any) => ({
            ...prevLayers,
            [param]: result,
          }));
          setZoomToData(result);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    if (lastParam) {
      fetchData(lastParam);
    }
  }, [lastParam]);

  const toggleSideBar = (param: string) => {
    setActiveParams((currentParams) =>
      currentParams.includes(param)
        ? currentParams.filter((p) => p !== param)
        : [...currentParams, param]
    );
    setLastParam(param);
  };

  const handleZoomToData = (param: string) => {
    if (param === lastParam) {
      setZoomToData(dataLayers[param]);
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
      <Basemap dataLayers={dataLayers} zoomToData={zoomToData} />
      <div className="fixed bottom-0 left-0 right-0 p-4 z-10 mb-2">
        <div className="flex space-x-4 overflow-x-auto">
          {parameters.map((param) => (
            <CardParameter
              key={param}
              title={param}
              isActive={activeParams.includes(param)}
              onToggle={toggleSideBar}
              onEyeClick={handleZoomToData}
            />
          ))}
        </div>
      </div>
      <CardBaseMap />
      <Sidebar activateParam={lastParam} />
    </div>
  );
};

export default Dashboard;
