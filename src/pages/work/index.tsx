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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import CustomParameter from "@/components/CustomParameter";
import SearchData from "@/components/Search";
import { fromLonLat } from "ol/proj";
import axios from "axios";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";

const getRobTinggi = async () => {
  const apiUrlRobTinggi = "/sampel-data/Rob_Tinggi.geojson";

  try {
    const response = await axios.get(apiUrlRobTinggi);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("data:", error);
  }
};

const MapPlain = () => {
  const navigateToRobMonitor = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRobTinggi();

        // Create vector source
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(data) as Feature<Geometry>[],
        });

        // Create vector layer
        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        // Create map
        new Map({
          target: "map",
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            vectorLayer,
          ],
          view: new View({
            center: fromLonLat([111.372877, -0.996604]),
            zoom: 5,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

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
            <DropdownMenuItem>Satellite</DropdownMenuItem>
            <DropdownMenuItem>Street</DropdownMenuItem>
            <DropdownMenuItem>Light</DropdownMenuItem>
            <DropdownMenuItem>Dark</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div id="map" className="w-full h-screen z-0 absolute top-0" />
    </div>
  );
};

export default MapPlain;
