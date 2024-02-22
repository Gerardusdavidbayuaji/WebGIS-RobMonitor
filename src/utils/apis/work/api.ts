import axios from "axios";
import { ListMap } from "./types";

export const listMap: ListMap[] = [
  {
    id: 1,
    title: "Satellite",
    url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=kLeqcgsjbKwXNhtnJ43J",
  },
  {
    id: 2,
    title: "Streets",
    url: "https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}@2x.jpg?key=kLeqcgsjbKwXNhtnJ43J",
  },
  {
    id: 3,
    title: "Topographic",
    url: "https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}@2x.png?key=kLeqcgsjbKwXNhtnJ43J",
  },
  // {
  //   id: 4,
  //   title: "Bright",
  //   url: "https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}@2x.png?key=kLeqcgsjbKwXNhtnJ43J",
  // },
];

export const getRobTinggi = async () => {
  const apiUrlRobTinggi = "/sampel-data/Rob_Tinggi.geojson";

  try {
    const response = await axios.get(apiUrlRobTinggi);
    console.log(response.data);
  } catch (error: any) {
    throw Error(error.response.data);
  }
};
