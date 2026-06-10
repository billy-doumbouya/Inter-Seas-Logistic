// components/ui/ISLLogo.jsx
"use client";

export default function ISLLogo({
  variant = "full", // "full" | "icon" | "compact"
  theme = "dark", // "dark" | "light"
  size = "md", // "sm" | "md" | "lg"
  className = "",
}) {
  const sizes = {
    sm: { icon: 28, full: { w: 160, h: 40 } },
    md: { icon: 40, full: { w: 220, h: 56 } },
    lg: { icon: 64, full: { w: 280, h: 70 } },
  };

  const colors = {
    dark: {
      bg: "#1A5FA8",
      hull: "#0D2B4E",
      deck: "#E63329",
      wave: "#7DB8E8",
      text1: "#FFFFFF",
      text2: "#7DB8E8",
      line: "#1A5FA8",
    },
    light: {
      bg: "#0D2B4E",
      hull: "#1A5FA8",
      deck: "#E63329",
      wave: "#7DB8E8",
      text1: "#0D2B4E",
      text2: "#1A5FA8",
      line: "#C8D8E8",
    },
  };

  const c = colors[theme];
  const s = sizes[size];

  const ShipIcon = ({ w = 56 }) => (
    <svg
      width={w}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="56" height="56" rx="12" fill={c.bg} />
      <path
        d="M6 42 Q13 35 20 42 Q27 49 34 42 Q41 35 48 42"
        stroke={c.wave}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M14 38 L14 24 L18 20 L22 18 L28 18 L34 18 L40 20 L40 38 Z"
        fill={c.hull}
      />
      <path d="M12 38 L44 38 L41 45 L15 45 Z" fill={c.deck} />
      <line
        x1="28"
        y1="18"
        x2="28"
        y2="11"
        stroke={c.wave}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M28 11 L37 14.5 L28 18 Z" fill={c.deck} />
    </svg>
  );

  if (variant === "icon") {
    return (
      <span className={className}>
        <ShipIcon w={s.icon} />
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <svg
        width={s.full.w}
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect x="0" y="2" width="36" height="36" rx="7" fill={c.bg} />
        <path
          d="M4 28 Q8 24 12 28 Q16 32 20 28 Q24 24 28 28 Q30 30 34 28"
          stroke={c.wave}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M8 26 L8 18 L11 15 L14 14 L18 14 L22 14 L26 15 L26 26 Z"
          fill={c.hull}
        />
        <path d="M7 26 L29 26 L27 30 L9 30 Z" fill={c.deck} />
        <line
          x1="18"
          y1="14"
          x2="18"
          y2="10"
          stroke={c.wave}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path d="M18 10 L23 12 L18 14 Z" fill={c.deck} />
        <text
          x="46"
          y="17"
          fontFamily="Georgia, serif"
          fontSize="13"
          fontWeight="700"
          fill={c.text1}
          letterSpacing="0.5"
        >
          INTER SEAS
        </text>
        <text
          x="46"
          y="30"
          fontFamily="Arial, sans-serif"
          fontSize="8.5"
          fill={c.text2}
          letterSpacing="3"
        >
          LOGISTIC
        </text>
        <line
          x1="46"
          y1="20"
          x2="196"
          y2="20"
          stroke={c.line}
          strokeWidth="0.5"
        />
      </svg>
    );
  }

  // variant === "full"
  return (
    <svg
      width={s.full.w}
      viewBox="0 0 220 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="4" y="4" width="48" height="48" rx="10" fill={c.bg} />
      <path
        d="M8 38 Q14 32 20 38 Q26 44 32 38 Q38 32 44 38 Q47 41 52 38"
        stroke={c.wave}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M14 34 L14 22 L18 18 L22 16 L26 16 L34 16 L38 18 L38 34 Z"
        fill={c.hull}
      />
      <path d="M12 34 L44 34 L41 40 L15 40 Z" fill={c.deck} />
      <line
        x1="26"
        y1="16"
        x2="26"
        y2="10"
        stroke={c.wave}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M26 10 L34 13 L26 16 Z" fill={c.deck} />
      <text
        x="68"
        y="26"
        fontFamily="Georgia, serif"
        fontSize="18"
        fontWeight="700"
        fill={c.text1}
        letterSpacing="1"
      >
        INTER SEAS
      </text>
      <text
        x="68"
        y="44"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fill={c.text2}
        letterSpacing="4"
      >
        LOGISTIC
      </text>
      <line
        x1="68"
        y1="30"
        x2="212"
        y2="30"
        stroke={c.line}
        strokeWidth="0.5"
      />
    </svg>
  );
}
