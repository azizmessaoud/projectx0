import { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"
        style={{
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 0 20px rgba(59,130,246,0.5)' : 'none',
        }}
      />
    </div>
  );
}
