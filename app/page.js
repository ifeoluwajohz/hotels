'use client';

import { Button } from '@/components/ui/button';
import {ArrowLeftCircleIcon, ArrowRightCircleIcon} from 'lucide-react';
import { useState, useEffect } from 'react';

const images = [
  {
    src: 'https://plus.unsplash.com/premium_photo-1717529136642-269beec93a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D',
    alt: 'City skyline at night',
    title: 'Explore the City',
    link: '/route1',
  },
  {
    src: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW58ZW58MHx8MHx8fDA%3D',
    alt: 'Mountain view',
    title: 'Escape to the Mountains',
    link: '/route2',
  },
  {
    src: 'https://images.unsplash.com/photo-1745953707460-959b97dfa42d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NXx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Beach in summer',
    title: 'Relax by the Beach',
    link: '/route3',
  },
  {
    src: 'https://images.unsplash.com/photo-1726137569906-14f8079861fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Forest path',
    title: 'Walk Through Nature',
    link: '/route4',
  },
];

export default function FullscreenCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div>
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
          <div className="absolute inset-0">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {images[currentIndex].title}
              </h2>
              <Button
                // href={images[currentIndex].link}
                className="bg-white text-black font-semibold px-4 sm:px-6 py-1 sm:py-3 hover:bg-yellow-200 transition ease-in-out w-fit"
              >
                Discover More
              </Button>
            </div>
          </div>
        </div>

        {/* Previous and Next Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full p-4 sm:p-6"
        >
        <ArrowLeftCircleIcon />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full p-4 sm:p-6"
        >
          <ArrowRightCircleIcon />
        </button>
      </section>
      
    </div>
  );
}
