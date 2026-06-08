"use client";

import { motion } from "framer-motion";

export type CursorMood = "idle" | "move" | "hover" | "click";

type CursorCharacterProps = {
  mood: CursorMood;
  lookX: number;
  lookY: number;
  tilt: number;
};

const EYE_OFFSET = 3.2;

export function CursorCharacter({ mood, lookX, lookY, tilt }: CursorCharacterProps) {
  const isHover = mood === "hover";
  const isClick = mood === "click";
  const isMove = mood === "move";

  const pupilX = Math.max(-EYE_OFFSET, Math.min(EYE_OFFSET, lookX * 0.35));
  const pupilY = Math.max(-EYE_OFFSET, Math.min(EYE_OFFSET, lookY * 0.35));

  return (
    <motion.div
      className="pointer-events-none select-none"
      animate={{
        scale: isClick ? 0.9 : isHover ? 1.12 : 1,
        rotate: tilt,
      }}
      transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.3 }}
    >
      <svg
        width="52"
        height="58"
        viewBox="0 0 52 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <filter id="cursor-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="body-grad" x1="26" y1="8" x2="26" y2="50">
            <stop offset="0%" stopColor="#1c1c22" />
            <stop offset="100%" stopColor="#111116" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <motion.ellipse
          cx="26"
          cy="54"
          rx={isHover ? 11 : 9}
          ry="2.5"
          fill="rgba(110,139,255,0.12)"
          animate={{ opacity: isMove ? 0.5 : 0.25 }}
        />

        {/* Left arm */}
        <motion.g
          animate={{
            rotate: isHover ? -28 : isMove ? -8 : 0,
            x: isHover ? -2 : 0,
            y: isHover ? -1 : 0,
          }}
          style={{ originX: "14px", originY: "34px" }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
        >
          <rect x="6" y="32" width="8" height="4" rx="2" fill="#2a2a32" stroke="rgba(110,139,255,0.35)" strokeWidth="0.5" />
          <circle cx="8" cy="38" r="2.5" fill="#6e8bff" opacity="0.7" />
        </motion.g>

        {/* Right arm */}
        <motion.g
          animate={{
            rotate: isHover ? 32 : isMove ? 10 : 0,
            x: isHover ? 2 : 0,
          }}
          style={{ originX: "38px", originY: "34px" }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
        >
          <rect x="38" y="32" width="8" height="4" rx="2" fill="#2a2a32" stroke="rgba(110,139,255,0.35)" strokeWidth="0.5" />
          <circle cx="44" cy="38" r="2.5" fill="#9b7bff" opacity="0.7" />
        </motion.g>

        {/* Body */}
        <rect
          x="10"
          y="18"
          width="32"
          height="30"
          rx="9"
          fill="url(#body-grad)"
          stroke={isHover ? "rgba(110,139,255,0.65)" : "rgba(110,139,255,0.28)"}
          strokeWidth="1"
          filter={isHover ? "url(#cursor-glow)" : undefined}
        />

        {/* Face screen */}
        <rect x="14" y="22" width="24" height="16" rx="4" fill="#09090b" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

        {/* Eyes */}
        {isClick ? (
          <>
            <text x="20" y="33" textAnchor="middle" fill="#6e8bff" fontSize="8" fontFamily="monospace">
              ◠
            </text>
            <text x="32" y="33" textAnchor="middle" fill="#6e8bff" fontSize="8" fontFamily="monospace">
              ◠
            </text>
          </>
        ) : isHover ? (
          <>
            <path d="M18 30 Q20 27 22 30" stroke="#74d3ae" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M30 30 Q32 27 34 30" stroke="#74d3ae" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="20" cy="30" r="3.5" fill="#1a1a22" stroke="rgba(110,139,255,0.4)" strokeWidth="0.5" />
            <circle cx="32" cy="30" r="3.5" fill="#1a1a22" stroke="rgba(110,139,255,0.4)" strokeWidth="0.5" />
            <circle cx={20 + pupilX} cy={30 + pupilY} r="1.6" fill="#6e8bff" />
            <circle cx={32 + pupilX} cy={30 + pupilY} r="1.6" fill="#9b7bff" />
          </>
        )}

        {/* Mouth / status line */}
        <motion.rect
          x="19"
          y="36"
          height="1.5"
          rx="0.75"
          fill={isHover ? "#74d3ae" : "#6e8bff"}
          animate={{
            width: isClick ? 14 : isHover ? 12 : 8,
            x: isClick ? 19 : isHover ? 20 : 22,
            opacity: isMove ? [0.5, 1, 0.5] : 0.8,
          }}
          transition={
            isMove
              ? { duration: 0.6, repeat: Infinity }
              : { type: "spring", stiffness: 400, damping: 20 }
          }
        />

        {/* Antenna */}
        <line x1="26" y1="18" x2="26" y2="10" stroke="rgba(184,192,204,0.5)" strokeWidth="1" strokeLinecap="round" />
        <motion.circle
          cx="26"
          cy="8"
          r="3"
          fill={isHover ? "#74d3ae" : "#6e8bff"}
          animate={{
            opacity: isMove ? [0.6, 1, 0.6] : 1,
            scale: isClick ? 0.7 : isHover ? 1.2 : 1,
          }}
          transition={
            isMove
              ? { duration: 0.5, repeat: Infinity }
              : { type: "spring", stiffness: 400, damping: 15 }
          }
          style={{ transformOrigin: "26px 8px" }}
        />

        {/* Legs */}
        <motion.g
          animate={{ y: isMove ? [0, 1, 0] : 0 }}
          transition={{ duration: 0.35, repeat: isMove ? Infinity : 0 }}
        >
          <rect x="17" y="48" width="5" height="5" rx="1.5" fill="#2a2a32" />
          <rect x="30" y="48" width="5" height="5" rx="1.5" fill="#2a2a32" />
        </motion.g>

        {/* Hover pointer finger */}
        {isHover && (
          <motion.path
            d="M44 30 L50 26 L48 32 Z"
            fill="#74d3ae"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          />
        )}
      </svg>

    </motion.div>
  );
}
