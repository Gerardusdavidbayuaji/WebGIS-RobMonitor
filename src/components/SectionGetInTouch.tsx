import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SectionGetInTouch = () => {
  return (
    <div>
      <section className="grid grid-cols-12 pt-6 text-gray-600 z-30">
        <div className="col-start-2 col-span-3">
          <p className="font-poppins text-lg font-medium mb-6">
            Access Anywhere, Anytime.
          </p>
          <p className="font-poppins text-4xl font-semibold leading-normal">
            Start Mapping Your <br /> Future, Today.
          </p>
        </div>
        <div className="col-start-9 col-span-3 flex justify-end">
          <p className="font-poppins text-sm font-semibold mt-24">
            Discover ways to optimize the value derived <br /> from data and
            enhance your decision <br /> making capabilities.
          </p>
        </div>
        <div className="col-start-2 col-span-10 mt-10">
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <img
                    src="/assets/image-1.jpg"
                    alt="image-home"
                    className="w-full h-80 object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <div className="h-52 bg-[#FAFAF9] z-20 -mt-60"></div>
    </div>
  );
};

export default SectionGetInTouch;
