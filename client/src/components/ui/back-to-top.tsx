import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;

      if (scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (maxScroll > 0) {
        const percentage = Math.round((scrollY / maxScroll) * 100);
        setScrollPercentage(percentage);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          data-testid="button-back-to-top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed z-50 flex flex-col items-center justify-center rounded-full cursor-pointer border border-white/20 backdrop-blur-md w-14 h-14 bottom-10 right-10 md:w-14 md:h-14 md:bottom-10 md:right-10 max-[768px]:w-12 max-[768px]:h-12 max-[768px]:bottom-6 max-[768px]:right-6"
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8), rgba(91, 33, 182, 0.8))",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          <ArrowUp className="w-5 h-5 text-white mb-0.5" />
          <span className="text-[10px] font-semibold text-white leading-none">
            {scrollPercentage}%
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
