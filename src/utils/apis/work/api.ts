import axios from "axios";

export const getRobTinggi = async () => {
  const apiUrlRobTinggi = "/sampel-data/Rob_Tinggi.geojson";

  try {
    const response = await axios.get(apiUrlRobTinggi);
    console.log(response.data);
  } catch (error: any) {
    throw Error(error.response.data);
  }
};
