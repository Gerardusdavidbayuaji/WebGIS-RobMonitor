import { useEffect } from "react";

// import { TbBorderStyle2, TbHomeStats } from "react-icons/tb";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { TiWavesOutline } from "react-icons/ti";
// import { FaDigitalOcean } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";

// import { listMap } from "@/utils/apis/work/api";

// import CustomParameter from "@/components/CustomParameter";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
import SearchData from "@/components/Search";
import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  // DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import Map from "ol/Map";
import "ol/ol.css";
import axios from "axios";
import { Coordinate } from "ol/coordinate";

const MapPlain = () => {
  useEffect(() => {
    // Inisialisasi peta OpenLayers
    // const map = new Map({
    //   target: "map",
    //   layers: [
    //     new TileLayer({
    //       source: new OSM(),
    //     }),
    //   ],
    //   view: new View({
    //     center: [0, 0],
    //     zoom: 2,
    //   }),
    // });

    // // Definisikan layer WMS
    // const wmsLayer = new TileLayer({
    //   source: new TileWMS({
    //     url: "http://localhost:8080/geoserver/gsdb_simadu/wms",
    //     params: {
    //       layers: "gsdb_simadu:provinsi_jateng",
    //       format: "image/png",
    //       transparent: true,
    //     },
    //   }),
    // });

    // const wfsLayer = new TileLayer({
    //   source: new TileWMS({
    //     url: "http://localhost:8080/geoserver/gsdb_simadu/ows",
    //     params: {
    //       service: "WFS",
    //       version: "1.0.0",
    //       request: "GetFeature",
    //       typeName: "gsdb_simadu:provinsi_jateng",
    //       maxFeatures: 50,
    //       outputFormat: "application/json",
    //     },
    //   }),
    // })

    

    // Tambahkan layer WMS ke peta
    // map.addLayer(wmsLayer);

  //   wfsLayer.getSource().on("tileloadend", function (event) {
  //   const xhr = event.tile.getImage().src;
  //   fetch(xhr)
  //     .then(response => response.json())
  //     .then(data => console.log(data)) // Tampilkan respons JSON di console
  //     .catch(error => console.error('Error fetching JSON:', error));
  // });

  const getCoordinate = async (): Promise<Coordinate> => {
    const apiUrl = 'http://localhost:8080/geoserver/gsdb_simadu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gsdb_simadu%3Aprovinsi_jateng&maxFeatures=50&outputFormat=application%2Fjson';

    try {
      const response = await axios.get(apiUrl)
      return response.data;
    } catch (error: any) {
      throw Error(error.response.data)
    }
  };
  

  }, []);

  return (
    <>
    {/* sidebar */}
      {/* <div className="flex flex-col bg-[#FAFAF9] w-60 h-screen font-poppins z-20 absolute">
        <h1 className="flex font-medium ml-5 py-5">Layers</h1>

        <div className="flex-grow mx-5">
          <Separator className="mt-1 mb-3" />
          <h1 className="font-medium">Data Layers</h1>
          <Separator className="mt-1 mb-3" />
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
            className="bg-[#1265AE] hover:bg-[#1265ae7e] w-full"
            // onClick={() => navigateToRobMonitor("/")}
          >
            <div className="flex items-center justify-center w-full gap-3">
              <IoMdArrowRoundBack />
              <p className="font-bold">
                Rob<span className="font-extralight">Monitor</span>
              </p>
            </div>
          </Button>
        </div>
      </div> */}

      {/* dropdown */}
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
            {/* {listMap.map((map) => (
              <DropdownMenuItem key={map.id} onClick={() => setBaseMap(map)}>
                {map.title}
              </DropdownMenuItem>
            ))} */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div id="map" className="w-full h-screen z-0 absolute top-0"></div>
    </>
  );
};

export default MapPlain;
