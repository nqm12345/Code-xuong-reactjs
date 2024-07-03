import { useRef, useState, useEffect } from "react";
import "./Slideshow.scss";

const Slideshow = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    "https://s3-alpha.figma.com/hub/file/4538971541/bd959de8-533d-4dae-a0cd-e0adb471898a-cover.png",
    "https://public-files.gumroad.com/3zqgdvfy29ph4nlbse4zsloxyufm",
    "https://i.etsystatic.com/43367931/r/il/b85f0c/5314984349/il_fullxfull.5314984349_6k8u.jpg",
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollTo({
        left: slider.clientWidth * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <section className="container">
      <div className="slider-wrapper">
        <div
          className="slider"
          ref={sliderRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {slides.map((src, index) => (
            <img key={index} src={src} alt={`slide-${index + 1}`} />
          ))}
        </div>
        <div className="slider-nav">
          <button className="prev" onClick={handlePrev}>
            &#10094;
          </button>
          <button className="next" onClick={handleNext}>
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slideshow;
