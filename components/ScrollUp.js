"use client";
import { useEffect, useState } from "react";
import { RiArrowUpFill } from "react-icons/ri";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed  bottom-4 right-4 lg:bottom-10 lg:right-10 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-button flex items-center justify-center h-12 w-12 bg-zinc-900 hover:bg-zinc-700 text-white"
        >
          <RiArrowUpFill style={{ width: "24px", height: "24px" }} />
        </button>
      )}
    </div>
  );
};

export default ScrollUp;
