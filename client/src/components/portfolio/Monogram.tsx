/* The AM monogram: the one place the violet-to-blue gradient is used. */
export default function Monogram({ size = 36 }: { size?: number }) {
  return (
    <svg className="monogram" width={size} height={size} viewBox="0 0 36 36" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="am-gradient" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#42B7FF" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="35" height="35" rx="2" fill="#0B1A29" stroke="url(#am-gradient)" />
      <text x="18" y="23.5" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="15" fontWeight="700" fill="url(#am-gradient)">
        AM
      </text>
    </svg>
  );
}
