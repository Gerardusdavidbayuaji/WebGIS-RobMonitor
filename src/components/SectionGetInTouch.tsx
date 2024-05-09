import { useState } from "react";

import { carouselImages } from "@/utils/apis/company/sampel-data";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SectionGetInTouch = () => {
  const [, setCurrentImage] = useState(carouselImages[0].image);

  const changeImage = (newImage: string) => {
    setCurrentImage(newImage);
  };

  return (
    <div>
      <section className="grid grid-cols-12 pt-6 z-30">
        <div className="col-start-2 col-span-3 text-white">
          <p className="font-poppins text-lg font-medium mb-6">
            Access Anywhere, Anytime.
          </p>
          <p className="font-poppins text-4xl font-semibold leading-normal">
            Start Mapping Your <br /> Future, Today.
          </p>
        </div>
        <div className="col-start-9 col-span-3 flex justify-end text-white">
          <p className="font-poppins text-sm font-semibold mt-16">
            MapRob is a platform designed for interacting with spatial data visualizing geographical patterns and<br /> analyzing spatial relationships.
          </p>
        </div>
        <div className="col-start-2 col-span-10 mt-10 text-[#292929]">
          <Carousel>
            <CarouselContent>
              {carouselImages.map((item) => (
                <CarouselItem key={item.id}>
                  <img
                    src={item.image}
                    alt="carousel-image"
                    className="w-full h-80 object-cover"
                    onClick={() => changeImage(item.image)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <div className="h-52 bg-[#292929] z-20 -mt-60"></div>
    </div>
  );
};

export default SectionGetInTouch;
