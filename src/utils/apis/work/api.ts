import axios from "axios";
import { ListMap } from "./types";

export const listMap: ListMap[] = [
  {
    id: 1,
    title: "Satellite",
    cover_image:
      "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=kLeqcgsjbKwXNhtnJ43J",
  },
  {
    id: 2,
    title: "Streets",
    cover_image:
      "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}@2x.png?key=kLeqcgsjbKwXNhtnJ43J",
  },
  {
    id: 3,
    title: "Light",
    cover_image:
      "https://api.maptiler.com/maps/nl-cartiqo-light/{z}/{x}/{y}@2x.png?key=kLeqcgsjbKwXNhtnJ43J",
  },
  {
    id: 4,
    title: "Dark",
    cover_image:
      "https://api.maptiler.com/maps/nl-cartiqo-dark/{z}/{x}/{y}@2x.png?key=kLeqcgsjbKwXNhtnJ43J",
  },
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
