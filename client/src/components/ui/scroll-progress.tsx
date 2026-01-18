import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const motionPercentage = useMotionValue(0);
  const smoothPercentage = useSpring(motionPercentage, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      
      if (maxScroll > 0) {
        const percentage = (scrollY / maxScroll) * 100;
        setScrollPercentage(percentage);
        motionPercentage.set(percentage);
      }
    };

    calculateScrollProgress();
    window.addEventListener("scroll", calculateScrollProgress);
    window.addEventListener("resize", calculateScrollProgress);

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
      window.removeEventListener("resize", calculateScrollProgress);
    };
  }, [motionPercentage]);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999]"
      style={{ background: "transparent" }}
    >
      <motion.div
        className="h-full origin-left"
        style={{ 
          width: smoothPercentage.get() + "%",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #5b21b6)"
        }}
        animate={{ width: `${scrollPercentage}%` }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />
    </div>
  );
}
