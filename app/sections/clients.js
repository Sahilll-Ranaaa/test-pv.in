import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

const ourClients = [
  {
    id: 1,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2020/07/Ernst-Young-1.png",
  },
  {
    id: 2,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2020/07/HealthMap-Diagnostics-1.png",
  },
  {
    id: 3,
    imageUrl: "https://pvadvisory.in/wp-content/uploads/2020/07/Kajrari-1.png",
  },
  {
    id: 4,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2020/07/Manipal-Hospitals-1.png",
  },
  {
    id: 5,
    imageUrl: "https://pvadvisory.in/wp-content/uploads/2020/07/max-1.png",
  },
  {
    id: 6,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2020/07/Ramit-Pal-Singh-and-Associates-1.png",
  },
  {
    id: 7,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2020/07/Alpha-Square-Partners-Singapore-1.png",
  },
  {
    id: 8,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2020/07/Aten-Capital-Private-Limited-1.png",
  },
  {
    id: 9,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2020/03/custom-%E2%80%93-9.jpg",
  },
  {
    id: 10,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2020/07/Dr.-Jaikaran-1.png",
  },
  {
    id: 11,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2022/12/43e94984-karma-group-logo.png",
  },
  {
    id: 12,
    imageUrl: "https://pvadvisory.in/wp-content/uploads/2021/02/bitopi.jpg",
  },
  {
    id: 13,
    imageUrl:
      "https://pvadvisory.in/wp-content/uploads/2021/02/alpha-square.jpg",
  },
  {
    id: 14,
    imageUrl: "https://pvadvisory.in/wp-content/uploads/2021/02/hspp.jpg",
  },
  {
    id: 15,
    imageUrl: "https://pvadvisory.in/wp-content/uploads/2021/02/antra.jpg",
  },
];

export default function ClientsSection() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto py-3 max-w-screen-lg">
        {/* <h1 className="text-app text-4xl font-bold text-center">
        Our Clients
      </h1> */}
        {/* <h3 className="text-center text-gray-500">TRUSTED BY</h3> */}
        <div className="relative">
          <div class="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none z-10"></div>
          <div class="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none z-10"></div>

          <Carousel
            opts={{
              loop: true,
              slidesToScroll: "auto",
              align: "center",
            }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
                speed: 0.8,
              }),
            ]}
            className="mx-auto"
          >
            <CarouselContent>
              {ourClients.map((client) => (
                <CarouselItem key={client.id} className="basis-[14%]">
                  <div className="relative w-24 h-24 hover:scale-125 transition-all">
                    <Image
                      src={client.imageUrl}
                      alt="logo"
                      objectFit="contain"
                      className="hover:grayscale-0 mix-blend-normal"
                      fill
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
