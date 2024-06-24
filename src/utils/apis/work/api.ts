import axios from "axios";

export const getGenanganRob = async () => {
  const urlGenangan =
    "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Agenangan_rob_jatim&outputFormat=application%2Fjson";

  try {
    const response = await axios.get(urlGenangan);
    return response.data;
  } catch (error: any) {
    console.log("Oops, somthing went wrong while fetching data", error);
    throw Error(error.response.data);
  }
};

export const getPersilBangunan = async () => {
  const urlBangunan =
    "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Abangunan&outputFormat=application%2Fjson";
  try {
    const response = await axios.get(urlBangunan);
    return response.data;
  } catch (error: any) {
    console.log("Oops, somthing went wrong while fetching data", error);
    throw Error(error.response.data);
  }
};

export const getSungai = async () => {
  const urlSungai =
    "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Asungai&outputFormat=application%2Fjson";

  try {
    const response = await axios.get(urlSungai);
    return response.data;
  } catch (error: any) {
    console.log("Oops, somthing went wrong while fetching data", error);
    throw Error(error.response.data);
  }
};

export const getTitikValdasi = async () => {
  const urlTitikValdasi =
    "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Atitik_validasi&outputFormat=application%2Fjson";

  try {
    const response = await axios.get(urlTitikValdasi);
    return response.data;
  } catch (error: any) {
    console.log("Oops, somthing went wrong while fetching data", error);
    throw Error(error.response.data);
  }
};

export const getGarisPantai = async () => {
  const urlGarisPantai =
    "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Agaris_pantai&outputFormat=application%2Fjson";

  try {
    const response = await axios.get(urlGarisPantai);
    return response.data;
  } catch (error: any) {
    console.log("Oops, somthing went wrong while fetching data", error);
    throw Error(error.response.data);
  }
};

export const getBatasKecamatan = async () => {
  const urlBatasKecamatan =
    "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Abatas_kecamatan&outputFormat=application%2Fjson";

  try {
    const response = await axios.get(urlBatasKecamatan);
    return response.data;
  } catch (error: any) {
    console.log("Oops, somthing went wrong while fetching data", error);
    throw Error(error.response.data);
  }
};
