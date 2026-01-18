import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function useCountUp(end: number, duration: number = 2, delay: number = 0) {
  const [value, setValue] = useState(0);
  const springValue = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const displayValue = useTransform(springValue, (current) => Math.round(current));

  useEffect(() => {
    const timeout = setTimeout(() => {
      springValue.set(end);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [end, delay, duration, springValue]);

  useEffect(() => {
    return displayValue.on("change", (latest) => {
      setValue(latest);
    });
  }, [displayValue]);

  return value;
}
