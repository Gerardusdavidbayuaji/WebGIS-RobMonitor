import { useNavigate } from "react-router-dom";

import { TbBorderStyle2, TbHomeStats } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TiWavesOutline } from "react-icons/ti";
import { FaDigitalOcean } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { GiRiver } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { IoLayers } from "react-icons/io5";

import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import CustomParameter from "@/components/CustomParameter";
import SearchData from "@/components/Search";
import TileLayer from "ol/layer/Tile";
import { useEffect, useState } from "react";
import OSM from "ol/source/OSM";
import View from "ol/View";
import Map from "ol/Map";
import "ol/ol.css";

import { listMap } from "@/utils/apis/work/api";

const MapPlain = () => {
  const navigateToRobMonitor = useNavigate();
  const [baseMap, setBaseMap] = useState(listMap[1]);

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM({
            url: baseMap.url,
          }),
        }),
      ],
      view: new View({
        center: [1359476780351.952, -774048.7917302734],
        zoom: 7,
      }),
    });

    return () => {
      map.dispose();
    };
  }, [baseMap]);

  return (
    <div>
      <div className="w-60 h-screen bg-[#FAFAF9] font-poppins z-20 absolute">
        <h1 className="flex font-medium ml-5 py-5">Layers</h1>

        <Separator />
        <SearchData />
        <Separator />

        <div className="flex-grow mx-5 mt-3">
          <h1 className="font-medium">Data Layers</h1>
          <Separator className="mt-1 mb-3" />
          <CustomParameter
            logo={<TbBorderStyle2 />}
            parameter={"Batas Administrasi"}
            onClick={() => {
              // logika pemanggilan data penutupan lahan
              console.log("Batas Administrasi");
            }}
          />

          <CustomParameter
            logo={<FaMountainSun />}
            parameter={"Penutupan Lahan"}
            onClick={() => {
              // logika pemanggilan data penutupan lahan
              console.log("Penutupan Lahan");
            }}
          />

          <CustomParameter
            logo={<TbHomeStats />}
            parameter={"Persil Bangunan"}
            onClick={() => {
              // logika pemanggilan data persil bangunan
              console.log("Persil Bangunan");
            }}
          />

          <CustomParameter
            logo={<TiWavesOutline />}
            parameter={"Ketinggian Rob"}
            onClick={() => {
              // logika pemanggilan data ketinggian rob
              console.log("Ketinggian Rob");
            }}
          />

          <CustomParameter
            logo={<FaDigitalOcean />}
            parameter={"Garis Pantai"}
            onClick={() => {
              // logika pemanggilan data garis pantai
              console.log("Garis Pantai");
            }}
          />

          <CustomParameter
            logo={<GiRiver />}
            parameter={"Sungai"}
            onClick={() => {
              // logika pemanggilan data sungai
              console.log("sungai");
            }}
          />
        </div>

        <div className="mx-5 pt-20">
          <Button
            className="bg-[#1265AE] hover:bg-[#1265ae7e] w-full"
            onClick={() => navigateToRobMonitor("/")}
          >
            <div className="flex items-center justify-center w-full gap-3">
              <IoMdArrowRoundBack />
              <p className="font-bold">
                Rob<span className="font-extralight">Monitor</span>
              </p>
            </div>
          </Button>
        </div>
      </div>

      <div className="flex absolute top-0 right-0 m-5 z-40">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="bg-[#1265AE] text-white p-2 w-fit h-fit rounded-lg">
              <IoLayers />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-5 w-fit">
            <DropdownMenuLabel>Bisa Pilih Petamu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {listMap.map((map) => (
              <DropdownMenuItem key={map.id} onClick={() => setBaseMap(map)}>
                {map.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div id="map" className="w-full h-screen z-0 absolute top-0"></div>
    </div>
  );
};

export default MapPlain;
