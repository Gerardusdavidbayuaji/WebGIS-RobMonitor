import axios from "axios";
import { ListMap } from "./types";

export const listMap: ListMap[] = [
  {
    id: 1,
    title: "Satellite",
    url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=AW8IuG306IIk8kNdxEw6",
  },
  {
    id: 2,
    title: "Streets",
    url: "https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}@2x.jpg?key=AW8IuG306IIk8kNdxEw6",
  },
  {
    id: 3,
    title: "Topographic",
    url: "https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}@2x.png?key=AW8IuG306IIk8kNdxEw6",
  },
  {
    id: 4,
    title: "Bright",
    url: "https://api.maptiler.com/maps/backdrop/{z}/{x}/{y}@2x.png?key=AW8IuG306IIk8kNdxEw6",
  },
  // {
  //   id: 5,
  //   title: "dark",
  //   url: "https://api.maptiler.com/maps/nl-cartiqo-dark/style.json?key=AW8IuG306IIk8kNdxEw6",
  // },
];

export const getRobTinggi = async () => {
  const apiUrlRobTinggi = "/sampel-data/Rob_Tinggi.geojson";

  try {
    const response = await axios.get(apiUrlRobTinggi);
    console.log("data rob", response.data);
  } catch (error: any) {
    console.log("data rob error", error);
    throw Error(error.response.data);
  }
};
