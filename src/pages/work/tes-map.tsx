import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Separator } from "@/components/ui/separator";
import CustomParameter from "@/components/CustomParameter";
import { TbBorderStyle2, TbHomeStats } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TiWavesOutline } from "react-icons/ti";
import { FaDigitalOcean } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const tesMapPlain = () => {
  const [, setMapInstance] = useState<L.Map | null>(null);

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

  return (
    <section>
      {/* sidebar kiri */}
      <div className="flex flex-col bg-[#FAFAF9] w-60 h-full font-poppins z-20 absolute">
        <div className="flex-grow mx-5">
          <h1 className="font-medium mt-3 mb-1">Data Layers</h1>
          <Separator className="mb-2" />
          <CustomParameter
            logo={<TbBorderStyle2 />}
            parameter={"Batas Administrasi"}
            // onClick={handleBatasClick}
          />

          <CustomParameter
            logo={<TbHomeStats />}
            parameter={"Persil Bangunan"}
            // onClick={handleBangunanClick}
          />

          <CustomParameter
            logo={<TiWavesOutline />}
            parameter={"Ketinggian Rob"}
            onClick={() => {
              // handleRobClick;
            }}
          />

          <CustomParameter
            logo={<FaDigitalOcean />}
            parameter={"Garis Pantai"}
            // onClick={handleGarisPantaiClick}
          />

          <CustomParameter
            logo={<TbBorderStyle2 />}
            parameter={"Sungai"}
            // onClick={handleSungaiClick}
          />
        </div>

        <div className="mx-5 mb-2">
          <Button
            className="bg-[#007afc] hover:bg-[#1265ae] w-full"
            // onClick={() => navigateToRobMonitor("/")}
          >
            <div className="flex items-center justify-center w-full gap-3">
              <IoMdArrowRoundBack />
              <p className="font-bold">
                map<span className="font-extralight">rob</span>
              </p>
            </div>
          </Button>
        </div>
      </div>

      {/* sidebar kanan */}
      <div className="flex flex-col bg-[#FAFAF9] w-60 h-full font-poppins z-20 absolute right-0">
        <div className="flex-grow mx-5">
          <h1 className="font-medium mt-3 mb-1 flex justify-center items-center">
            Legends
          </h1>
          <Separator className="mb-2" />
          <p>tes legend</p>
        </div>
      </div>
      <div className="w-full h-screen z-0 absolute top-0">
        <div id="map"></div>
      </div>
    </section>
  );
};

export default tesMapPlain;
