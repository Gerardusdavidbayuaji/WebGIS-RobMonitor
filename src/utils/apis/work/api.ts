import axios from "axios";

export const getGenanganRob = async () => {
  const apiUrlGenanganRob =
    "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Agenangan_rob_jatim&outputFormat=application%2Fjson";

  try {
    const response = await axios.get(apiUrlGenanganRob);
    return response.data;
  } catch (error: any) {
    console.log("Oops, somthing went wrong while fetching data", error);
    throw Error(error.response.data);
  }
};

// export const getBatasKecamatan = async () => {
//   const apiUrlGenanganRob = 'http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Abatas_kecamatan&outputFormat=application%2Fjson';

//   try {
//     const response = await axios.get(apiUrlGenanganRob);
//     return response.data
//   } catch (error: any) {
//     console.log('Oops, somthing went wrong while fetching data', error);
//     throw Error(error.response.data);
//   }
// };

// export const getGarisPantai = async () => {
//   const apiUrlGenanganRob = 'http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Agaris_pantai&outputFormat=application%2Fjson';

//   try {
//     const response = await axios.get(apiUrlGenanganRob);
//     return response.data
//   } catch (error: any) {
//     console.log('Oops, somthing went wrong while fetching data', error);
//     throw Error(error.response.data);
//   }
// };

// export const getPersilBangunan = async () => {
//   const apiUrlGenanganRob = 'http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Apersil_bangunan&outputFormat=application%2Fjson';

//   try {
//     const response = await axios.get(apiUrlGenanganRob);
//     return response.data
//   } catch (error: any) {
//     console.log('Oops, somthing went wrong while fetching data', error);
//     throw Error(error.response.data);
//   }
// };

// export const getSungai = async () => {
//   const apiUrlGenanganRob = 'http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Asungai&outputFormat=application%2Fjson';

//   try {
//     const response = await axios.get(apiUrlGenanganRob);
//     return response.data
//   } catch (error: any) {
//     console.log('Oops, somthing went wrong while fetching data', error);
//     throw Error(error.response.data);
//   }
// };

// export const getTitikValidasi = async () => {
//   const apiUrlGenanganRob = 'http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Atitik_validasi&outputFormat=application%2Fjson';

//   try {
//     const response = await axios.get(apiUrlGenanganRob);
//     return response.data
//   } catch (error: any) {
//     console.log('Oops, somthing went wrong while fetching data', error);
//     throw Error(error.response.data);
//   }
// };

// import { ListMap } from "./types";

// export const listMap: ListMap[] = [
//   {
//     id: 1,
//     title: "Satellite",
//     url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=AW8IuG306IIk8kNdxEw6",
//   },
//   {
//     id: 2,
//     title: "Streets",
//     url: "https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}@2x.jpg?key=AW8IuG306IIk8kNdxEw6",
//   },
//   {
//     id: 3,
//     title: "Topographic",
//     url: "https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}@2x.png?key=AW8IuG306IIk8kNdxEw6",
//   },
//   {
//     id: 4,
//     title: "Bright",
//     url: "https://api.maptiler.com/maps/backdrop/{z}/{x}/{y}@2x.png?key=AW8IuG306IIk8kNdxEw6",
//   },
//   // {
//   //   id: 5,
//   //   title: "dark",
//   //   url: "https://api.maptiler.com/maps/nl-cartiqo-dark/style.json?key=AW8IuG306IIk8kNdxEw6",
//   // },
// ];
