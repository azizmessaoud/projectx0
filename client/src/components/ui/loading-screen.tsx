import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

interface NeuralNode {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");
  const logoText = "AzizM.";

  const neuralNodes = useMemo<NeuralNode[]>(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    const duration = 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(progressTimer);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    }, interval);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 400);

    return () => clearInterval(dotsInterval);
  }, []);

  useEffect(() => {
    if (!isLoading && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0a1929" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {neuralNodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute rounded-full"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: node.size,
                height: node.size,
                background: `radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(91, 33, 182, 0.3) 50%, transparent 70%)`,
              }}
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: node.duration,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {neuralNodes.slice(0, 5).map((node, i) => {
            const nextNode = neuralNodes[(i + 1) % neuralNodes.length];
            return (
              <motion.svg
                key={`line-${node.id}`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 3,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <line
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${nextNode.x}%`}
                  y2={`${nextNode.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#5b21b6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </motion.svg>
            );
          })}

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="flex items-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-5xl font-bold font-heading text-white">
                {logoText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className={index >= 4 ? "text-[#3b82f6]" : ""}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.15,
                      delay: index * 0.12,
                      ease: "easeOut",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.div>

            <div
              className="w-64 overflow-hidden"
              style={{
                height: "4px",
                borderRadius: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: "2px",
                  background: "linear-gradient(to right, #3b82f6, #5b21b6)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>

            <motion.p
              className="mt-6 font-mono text-sm"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Initializing{dots}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
