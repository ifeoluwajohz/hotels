import * as React from "react"
import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"



export default function AmazonStyleCarousel({ room }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === room.room_img.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? room.room_img.length - 1 : prev - 1
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Main Image Section */}
      <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden rounded-xl shadow-lg bg-gray-100">
        <img
          src={room.room_img[selectedIndex]}
          alt={`Room ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Arrows */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-black z-10"
          aria-label="Previous Image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-black z-10"
          aria-label="Next Image"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnails */}
      <Carousel className="px-1">
        <CarouselContent className="-ml-1 flex">
          {room.room_img.map((img, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/5 sm:basis-1/6 cursor-pointer"
            >
              <div
                onClick={() => setSelectedIndex(index)}
                className={`rounded-md overflow-hidden border-2 transition duration-300 ${
                  index === selectedIndex
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
