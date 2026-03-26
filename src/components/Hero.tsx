import { useState, useEffect } from 'react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Grace Encounter – Sept 2025',
    subtitle: 'REGISTER FOR GRACE ENCOUNTER',
    location: 'Grace Encounter – Nairobi, Kenya',
    description: 'Experience the move of God like never before! Join us for Grace Encounter, a life-changing gathering with anointed ministers from around the world. Free Entry!',
    date: 'Saturday, 27th September 2025',
    time: '11:00 AM Prompt',
    venue: 'ULINZI SPORTS COMPLEX, LANG\'ATA',
    image: '/hero.jpg'
  },
  {
    id: 2,
    title: 'Grace Encounter – Sept 2025',
    subtitle: 'REGISTER FOR GRACE ENCOUNTER',
    location: 'Grace Encounter – Nairobi, Kenya',
    description: 'Experience the move of God like never before! Join us for Grace Encounter, a life-changing gathering with anointed ministers from around the world. Free Entry!',
    date: 'Saturday, 27th September 2025',
    time: '11:00 AM Prompt',
    venue: 'ULINZI SPORTS COMPLEX, LANG\'ATA',
    image: '/hero.jpg'
  },
  {
    id: 3,
    title: 'Grace Encounter – Sept 2025',
    subtitle: 'REGISTER FOR GRACE ENCOUNTER',
    location: 'Grace Encounter – Nairobi, Kenya',
    description: 'Experience the move of God like never before! Join us for Grace Encounter, a life-changing gathering with anointed ministers from around the world. Free Entry!',
    date: 'Saturday, 27th September 2025',
    time: '11:00 AM Prompt',
    venue: 'ULINZI SPORTS COMPLEX, LANG\'ATA',
    image: '/hero.jpg'
  }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.changedTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const swipeDistance = touchStartX - touchEndX;
    const minimumSwipeDistance = 50;

    if (swipeDistance > minimumSwipeDistance) {
      nextSlide();
    } else if (swipeDistance < -minimumSwipeDistance) {
      prevSlide();
    }
  };

  return (
    <div className="relative w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative min-h-150 lg:min-h-125 flex items-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full touch-pan-y">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-opacity duration-500 h-full ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch py-12 lg:py-16">
                  <div className="order-2 lg:order-1 space-y-6 h-full flex flex-col justify-center">
                    <p className="text-[#B38E34] text-sm sm:text-base tracking-wider uppercase">
                      {slide.subtitle}
                    </p>

                    <div>
                      <h1 className="text-[#202163] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <div className="w-full h-1 bg-[#B38E34] mt-4"></div>
                    </div>

                    <p className="text-[#202163] text-lg sm:text-xl font-medium">
                      {slide.location}
                    </p>

                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      {slide.description}
                    </p>

                    <div className="space-y-3 text-[#202163]">
                      <p className="text-base sm:text-lg">
                        <span className="font-semibold">Date:</span> {slide.date}
                      </p>
                      <p className="text-base sm:text-lg">
                        <span className="font-semibold">Time:</span> {slide.time}
                      </p>
                      <p className="text-base sm:text-lg">
                        <span className="font-semibold">Venue:</span> {slide.venue}
                      </p>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 h-full">
                    <div className="relative w-full h-full min-h-105 max-w-md mx-auto lg:max-w-none">
                      <img
                        src={slide.image}
                        alt="Grace Encounter Poster"
                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 pb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[#B38E34] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
