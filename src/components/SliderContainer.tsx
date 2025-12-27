import { ReactNode, useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderContainerProps {
  children: ReactNode;
  itemsPerPage?: number;
  totalItems: number;
  showIndicators?: boolean;
  ariaLabel?: string;
  onSlideChange?: (slideIndex: number) => void;
}

export function SliderContainer({
  children,
  itemsPerPage = 4,
  totalItems,
  showIndicators = true,
  ariaLabel = 'Content slider',
  onSlideChange,
}: SliderContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalSlides = Math.ceil(totalItems / itemsPerPage);

  const nextSlide = () => {
    const newSlide = Math.min(currentSlide + 1, totalSlides - 1);
    setCurrentSlide(newSlide);
    onSlideChange?.(newSlide);
    announceSlideChange(newSlide);
  };

  const prevSlide = () => {
    const newSlide = Math.max(currentSlide - 1, 0);
    setCurrentSlide(newSlide);
    onSlideChange?.(newSlide);
    announceSlideChange(newSlide);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    onSlideChange?.(index);
    announceSlideChange(index);
  };

  // Accessibility: Announce slide changes to screen readers
  const announceSlideChange = (slideIndex: number) => {
    const announcement = `Showing slide ${slideIndex + 1} of ${totalSlides}`;
    const liveRegion = document.getElementById('slider-live-region');
    if (liveRegion) {
      liveRegion.textContent = announcement;
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sliderRef.current?.contains(document.activeElement)) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides]);

  return (
    <div
      ref={sliderRef}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className="relative"
      tabIndex={0}
    >
      {/* Screen reader live region for announcements */}
      <div
        id="slider-live-region"
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Navigation Arrows - Always visible, use disabled state */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl border-2 border-gray-200 flex items-center justify-center hover:bg-purple-50 hover:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        disabled={currentSlide === totalSlides - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl border-2 border-gray-200 flex items-center justify-center hover:bg-purple-50 hover:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Slider Content */}
      <div className="overflow-hidden">
        {children}
      </div>

      {/* Slide Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Slide navigation">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={currentSlide === index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${
                currentSlide === index
                  ? 'w-8 bg-gradient-to-r from-[#EA7F4F] via-[#765B8E] to-[#4A7BA7]'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Helper text for keyboard users */}
      <div className="sr-only">
        Use arrow keys to navigate slides. Press Home to go to first slide, End to go to last slide.
      </div>
    </div>
  );
}
