interface carouselImages {
  id: number;
  image: string;
}

interface listMap {
  id: number;
  title: string;
  cover_image: string;
}

export const carouselImages = [
  { id: 1, image: "public/assets/image-1.jpg" },
  { id: 2, image: "public/assets/image-2.jpg" },
  { id: 3, image: "public/assets/image-3.jpg" },
  { id: 4, image: "public/assets/image-4.jpg" },
  { id: 5, image: "public/assets/image-5.jpg" },
];

export const listMap = [
  {
    id: 1,
    title: "satellite",
    cover_image: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  },
  {
    id: 2,
    title: "street",
    cover_image: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  },
  {
    id: 3,
    title: "light",
    cover_image:
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  },
  {
    id: 4,
    title: "dark",
    cover_image:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  },
];
