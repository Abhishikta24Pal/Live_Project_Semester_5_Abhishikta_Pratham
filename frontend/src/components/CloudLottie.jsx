import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import cloudAnim from "../assets/lottie/cloud.json";

export default function CloudLottie({ size = 200, speed = 0.7 }) {
  const lottieRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    lottieRef.current?.setSpeed(speed);
  }, [speed]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={cloudAnim}
      loop={!prefersReducedMotion}
      autoplay={!prefersReducedMotion}
      style={{ height: size, width: size }}
    />
  );
}
