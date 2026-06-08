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

/** Inverted palette — light body on dark site background */
const C = {
  bodyTop: "#f8f8fa",
  bodyBottom: "#e8e8ee",
  outline: "#070708",
  outlineSoft: "rgba(7, 7, 8, 0.45)",
  face: "#121218",
  eyeSocket: "#2a2a34",
  pupil: "#ffffff",
  pupilAccent: "#6e8bff",
  arm: "#dcdce2",
  leg: "#d0d0d8",
  antenna: "#3a3a44",
  hover: "#22c55e",
  accent: "#4f6fff",
  shadow: "rgba(255,255,255,0.35)",
};

export function CursorCharacter({ mood, lookX, lookY, tilt }: CursorCharacterProps) {
  const isHover = mood === "hover";
  const isClick = mood === "click";
  const isMove = mood === "move";

  const pupilX = Math.max(-EYE_OFFSET, Math.min(EYE_OFFSET, lookX * 0.35));
  const pupilY = Math.max(-EYE_OFFSET, Math.min(EYE_OFFSET, lookY * 0.35));

  return (
    <motion.div
      className="pointer-events-none select-none drop-shadow-[0_0_6px_rgba(255,255,255,0.55)]"
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
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="body-grad" x1="26" y1="8" x2="26" y2="50">
            <stop offset="0%" stopColor={C.bodyTop} />
            <stop offset="100%" stopColor={C.bodyBottom} />
          </linearGradient>
        </defs>

        <motion.ellipse
          cx="26"
          cy="54"
          rx={isHover ? 11 : 9}
          ry="2.5"
          fill={C.shadow}
          animate={{ opacity: isMove ? 0.7 : 0.45 }}
        />

        <motion.g
          animate={{
            rotate: isHover ? -28 : isMove ? -8 : 0,
            x: isHover ? -2 : 0,
            y: isHover ? -1 : 0,
          }}
          style={{ originX: "14px", originY: "34px" }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
        >
          <rect x="6" y="32" width="8" height="4" rx="2" fill={C.arm} stroke={C.outline} strokeWidth="0.6" />
          <circle cx="8" cy="38" r="2.5" fill={C.accent} />
        </motion.g>

        <motion.g
          animate={{
            rotate: isHover ? 32 : isMove ? 10 : 0,
            x: isHover ? 2 : 0,
          }}
          style={{ originX: "38px", originY: "34px" }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
        >
          <rect x="38" y="32" width="8" height="4" rx="2" fill={C.arm} stroke={C.outline} strokeWidth="0.6" />
          <circle cx="44" cy="38" r="2.5" fill={C.accent} />
        </motion.g>

        <rect
          x="10"
          y="18"
          width="32"
          height="30"
          rx="9"
          fill="url(#body-grad)"
          stroke={isHover ? C.hover : C.outline}
          strokeWidth={isHover ? 1.5 : 1.2}
          filter={isHover ? "url(#cursor-glow)" : undefined}
        />

        <rect
          x="14"
          y="22"
          width="24"
          height="16"
          rx="4"
          fill={C.face}
          stroke={C.outlineSoft}
          strokeWidth="0.6"
        />

        {isClick ? (
          <>
            <text x="20" y="33" textAnchor="middle" fill={C.pupil} fontSize="8" fontFamily="monospace">
              ◠
            </text>
            <text x="32" y="33" textAnchor="middle" fill={C.pupil} fontSize="8" fontFamily="monospace">
              ◠
            </text>
          </>
        ) : isHover ? (
          <>
            <path d="M18 30 Q20 27 22 30" stroke={C.hover} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M30 30 Q32 27 34 30" stroke={C.hover} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="20" cy="30" r="3.5" fill={C.eyeSocket} stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            <circle cx="32" cy="30" r="3.5" fill={C.eyeSocket} stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            <circle cx={20 + pupilX} cy={30 + pupilY} r="1.8" fill={C.pupil} />
            <circle cx={32 + pupilX} cy={30 + pupilY} r="1.8" fill={C.pupilAccent} />
          </>
        )}

        <motion.rect
          x="19"
          y="36"
          height="1.5"
          rx="0.75"
          fill={isHover ? C.hover : C.accent}
          animate={{
            width: isClick ? 14 : isHover ? 12 : 8,
            x: isClick ? 19 : isHover ? 20 : 22,
            opacity: isMove ? [0.6, 1, 0.6] : 1,
          }}
          transition={
            isMove
              ? { duration: 0.6, repeat: Infinity }
              : { type: "spring", stiffness: 400, damping: 20 }
          }
        />

        <line x1="26" y1="18" x2="26" y2="10" stroke={C.antenna} strokeWidth="1.2" strokeLinecap="round" />
        <motion.circle
          cx="26"
          cy="8"
          r="3"
          fill={isHover ? C.hover : C.accent}
          stroke={C.outline}
          strokeWidth="0.5"
          animate={{
            opacity: isMove ? [0.7, 1, 0.7] : 1,
            scale: isClick ? 0.7 : isHover ? 1.2 : 1,
          }}
          transition={
            isMove
              ? { duration: 0.5, repeat: Infinity }
              : { type: "spring", stiffness: 400, damping: 15 }
          }
          style={{ transformOrigin: "26px 8px" }}
        />

        <motion.g
          animate={{ y: isMove ? [0, 1, 0] : 0 }}
          transition={{ duration: 0.35, repeat: isMove ? Infinity : 0 }}
        >
          <rect x="17" y="48" width="5" height="5" rx="1.5" fill={C.leg} stroke={C.outline} strokeWidth="0.5" />
          <rect x="30" y="48" width="5" height="5" rx="1.5" fill={C.leg} stroke={C.outline} strokeWidth="0.5" />
        </motion.g>

        {isHover && (
          <motion.path
            d="M44 30 L50 26 L48 32 Z"
            fill={C.hover}
            stroke={C.outline}
            strokeWidth="0.4"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          />
        )}
      </svg>
    </motion.div>
  );
}
