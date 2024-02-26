import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { TbBorderStyle2, TbHomeStats } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TiWavesOutline } from "react-icons/ti";
import { FaDigitalOcean } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";

import { listMap } from "@/utils/apis/work/api";

import CustomParameter from "@/components/CustomParameter";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SearchData from "@/components/Search";
import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import { Fill, Stroke, Style } from "ol/style.js";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import Map from "ol/Map";
import "ol/ol.css";

const MapPlain = () => {
  const coordinateKraksaan = [1359477416282.8428, -863822.8494639626];
  const [garisPantaiVisible, setGarisPantaiVisible] = useState(false);
  const [bangunanVisible, setBangunanVisible] = useState(false);
  const [sungaiVisible, setSungaiVisible] = useState(false);
  const [batasVisible, setBatasVisible] = useState(false);
  const [robVisible, setRobVisible] = useState(true);
  const [baseMap, setBaseMap] = useState<any>(() => {
    const storeBaseMap = localStorage.getItem("selectedBaseMap");
    return storeBaseMap ? JSON.parse(storeBaseMap) : listMap[1];
  });
  const navigateToRobMonitor = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedBaseMap", JSON.stringify(baseMap));
  });

  useEffect(() => {
    const persilBangunan = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "src/utils/apis/work/sampel-data/Bangunan_Kraksaan.geojson",
      }),
      style: [
        new Style({
          fill: new Fill({
            color: "rgb(249, 148, 23)",
          }),
        }),
      ],
    });

    const luasRobRendah = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "src/utils/apis/work/sampel-data/Rob_Rendah.geojson",
      }),
      style: [
        new Style({
          fill: new Fill({
            color: "rgb(54, 174, 124, 0.5)",
          }),
        }),
      ],
    });

    const luasRobSedang = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "src/utils/apis/work/sampel-data/Rob_Sedang.geojson",
      }),
      style: [
        new Style({
          fill: new Fill({
            color: "rgb(249, 217, 35, 0.5)",
          }),
        }),
      ],
    });

    const luasRobTinggi = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "src/utils/apis/work/sampel-data/Rob_Tinggi.geojson",
      }),
      style: [
        new Style({
          fill: new Fill({
            color: "rgb(235, 83, 83, 0.5)",
          }),
        }),
      ],
    });

    const sungai = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "src/utils/apis/work/sampel-data/Sungai.geojson",
      }),
      style: [
        new Style({
          fill: new Fill({
            color: "rgb(49, 143, 181, 0.8)",
          }),
        }),
      ],
    });

    const batasAdministrasi = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "src/utils/apis/work/sampel-data/Batas_Kecamatan.geojson",
      }),
      style: [
        new Style({
          stroke: new Stroke({
            color: "#7D9D9C",
            width: 1.45,
          }),
        }),
      ],
    });

    const garisPantai = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "src/utils/apis/work/sampel-data/Garis_Pantai.geojson",
      }),
      style: [
        new Style({
          fill: new Fill({
            color: "rgb(49, 143, 181, 1)",
          }),
          stroke: new Stroke({
            color: "#EEEEEE",
            width: 1.25,
          }),
        }),
      ],
    });

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM({
            url: baseMap.url,
          }),
        }),
        ...(batasVisible ? [batasAdministrasi] : []),
        ...(bangunanVisible ? [persilBangunan] : []),
        ...(garisPantaiVisible ? [garisPantai] : []),
        ...(sungaiVisible ? [sungai] : []),
        ...(robVisible ? [luasRobRendah, luasRobSedang, luasRobTinggi] : []),
      ],
      view: new View({
        center: coordinateKraksaan,
        zoom: 14.4,
      }),
    });

    return () => {
      map.dispose();
    };
  }, [
    baseMap,
    sungaiVisible,
    batasVisible,
    bangunanVisible,
    garisPantaiVisible,
    robVisible,
  ]);

  const handleSungaiClick = () => {
    setSungaiVisible(!sungaiVisible);
  };

  const handleBatasClick = () => {
    setBatasVisible(!batasVisible);
  };

  const handleBangunanClick = () => {
    setBangunanVisible(!bangunanVisible);
  };

  const handleGarisPantaiClick = () => {
    setGarisPantaiVisible(!garisPantaiVisible);
  };

  const handleRobClick = () => {
    setRobVisible(!robVisible);
  };

  return (
    <>
      <div className="flex flex-col bg-[#FAFAF9] w-60 h-screen font-poppins z-20 absolute">
        <h1 className="flex font-medium ml-5 py-5">Layers</h1>

        <div className="flex-grow mx-5">
          <Separator className="mt-1 mb-3" />
          <h1 className="font-medium">Data Layers</h1>
          <Separator className="mt-1 mb-3" />
          <CustomParameter
            logo={<TbBorderStyle2 />}
            parameter={"Batas Administrasi"}
            onClick={handleBatasClick}
          />

          <CustomParameter
            logo={<TbHomeStats />}
            parameter={"Persil Bangunan"}
            onClick={handleBangunanClick}
          />

          <CustomParameter
            logo={<TiWavesOutline />}
            parameter={"Ketinggian Rob"}
            onClick={() => {
              handleRobClick;
            }}
          />

          <CustomParameter
            logo={<FaDigitalOcean />}
            parameter={"Garis Pantai"}
            onClick={handleGarisPantaiClick}
          />

          <CustomParameter
            logo={<TbBorderStyle2 />}
            parameter={"Sungai"}
            onClick={handleSungaiClick}
          />
        </div>

        <div className="mx-5 mb-2">
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

      <div className="flex absolute top-0 right-0 m-2 z-40 items-center justify-center gap-2">
        <SearchData />
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
    </>
  );
};

export default MapPlain;
