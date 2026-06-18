"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText, GitBranch } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  BUILD_STORY_INTRO,
  CASE_STUDY_IDS,
  SYSTEMS,
  type SystemCard,
} from "@/lib/data";
import { Button3D } from "@/components/ui/Button3D";
import { useInView, useReducedMotion, useBuildStoryChapterFromHash, syncBuildStoryHash } from "@/lib/hooks";
import { WorldSection } from "./WorldSection";

const ProjectObjectPreview = dynamic(
  () => import("./ProjectObjectPreview").then((m) => m.ProjectObjectPreview),
  {
    ssr: false,
    loading: () => <div className="tile-preview-skeleton h-full w-full" />,
  }
);

const EASE = [0.22, 1, 0.36, 1] as const;

type TileMetrics = {
  tileW: number;
  tileH: number;
  gap: number;
  stageH: number;
};

function useTileMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<TileMetrics>({
    tileW: 300,
    tileH: 400,
    gap: 40,
    stageH: 480,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      const isNarrow = w < 480;
      const isMid = w < 768;
      const tileW = isNarrow
        ? Math.min(272, w - 56)
        : isMid
          ? Math.min(304, w * 0.42)
          : Math.min(360, Math.max(288, w * 0.3));
      const gap = isNarrow ? 18 : isMid ? 30 : Math.min(56, w * 0.036);
      const tileH = Math.round(tileW * 1.42);
      const stageH = tileH + (isNarrow ? 56 : 80);
      setMetrics({ tileW, tileH, gap, stageH });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, metrics };
}

function tileMotion(
  offset: number,
  metrics: TileMetrics,
  reduced: boolean,
  hovered: boolean
): Record<string, number> {
  const step = metrics.tileW + metrics.gap;
  const abs = Math.abs(offset);

  if (reduced) {
    return {
      x: offset * step,
      scale: offset === 0 ? 1 : 0.9,
      opacity: abs > 1 ? 0.2 : 0.5 + (offset === 0 ? 0.5 : 0),
      zIndex: 20 - abs,
    };
  }

  const lift = hovered && offset !== 0 ? 8 : 0;

  return {
    x: offset * step,
    y: -lift,
    z: -abs * 120 + (offset === 0 ? 20 : 0),
    rotateY: offset * -26,
    scale: (offset === 0 ? 1.02 : 1 - abs * 0.08),
    opacity: abs > 2 ? 0 : 1 - abs * 0.16,
    zIndex: 20 - abs,
  };
}

function ChapterLinks({ system }: { system: SystemCard }) {
  const hasCaseStudy = CASE_STUDY_IDS.has(system.id);

  return (
    <div className="flex flex-wrap gap-2">
      {system.links.github && (
        <Button3D href={system.links.github} variant="ghost" size="sm" external>
          <GitBranch size={13} />
          GitHub
        </Button3D>
      )}
      {hasCaseStudy && system.links.caseStudy && (
        <Button3D href={system.links.caseStudy} variant="ghost" size="sm">
          <FileText size={13} />
          Case study
        </Button3D>
      )}
    </div>
  );
}

function NavButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="tile-nav-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-surface-elevated/95 text-text-secondary shadow-lg backdrop-blur-xl transition-all hover:border-accent/40 hover:text-text-primary hover:shadow-[0_0_24px_rgba(110,139,255,0.2)] disabled:pointer-events-none disabled:opacity-20 sm:h-12 sm:w-12"
    >
      {children}
    </button>
  );
}

export function BuildStoryExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const skipDetailScrollRef = useRef(true);
  const reducedMotion = useReducedMotion();
  const { ref: stageRef, metrics } = useTileMetrics();
  const { ref: viewRef, inView } = useInView<HTMLDivElement>("80px", 0.05);
  const system = SYSTEMS[activeIndex];

  useBuildStoryChapterFromHash(SYSTEMS, setActiveIndex);

  const selectChapter = useCallback((index: number) => {
    setActiveIndex(index);
    syncBuildStoryHash(SYSTEMS[index].id);
  }, []);

  const go = useCallback((dir: -1 | 1) => {
    setActiveIndex((i) => {
      const next = Math.max(0, Math.min(SYSTEMS.length - 1, i + dir));
      syncBuildStoryHash(SYSTEMS[next].id);
      return next;
    });
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = Math.min(48, metrics.tileW * 0.14);
    const velocity = info.velocity.x;
    if (info.offset.x < -threshold || velocity < -520) go(1);
    else if (info.offset.x > threshold || velocity > 520) go(-1);
  };

  useEffect(() => {
    if (skipDetailScrollRef.current) {
      skipDetailScrollRef.current = false;
      return;
    }
    detailRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement) && document.activeElement !== document.body) {
        const sectionInView = sectionRef.current?.getBoundingClientRect();
        if (!sectionInView || sectionInView.bottom < 0 || sectionInView.top > window.innerHeight) return;
      }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const progressPct = (activeIndex / (SYSTEMS.length - 1)) * 100;

  return (
    <WorldSection id="systems" className="overflow-hidden">
      <div ref={sectionRef} className="section-container">
        <header className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-secondary">
              Build story
            </p>
            <h2 className="mt-4 text-3xl text-text-primary sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {BUILD_STORY_INTRO.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-text-secondary lg:text-right lg:text-base">
            {BUILD_STORY_INTRO.body}
          </p>
        </header>

        <div
          ref={stageRef}
          className={`tile-stage-shell relative ${reducedMotion ? "" : "tile-stage--3d"}`}
        >
          <div className="tile-stage-frame overflow-hidden rounded-2xl border border-border sm:rounded-3xl">
            {/* Stage chrome */}
            <div className="relative z-20 flex items-center justify-between border-b border-border/80 bg-surface/70 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
              <div className="flex items-center gap-3">
                <span className="tile-live-dot h-2 w-2 rounded-full bg-accent-green" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                  Now viewing
                </p>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={system.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-[55%] truncate text-right text-sm text-text-primary sm:max-w-none sm:text-base"
                >
                  {system.name}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="tile-stage-spotlight pointer-events-none absolute inset-0" />
            <div className="tile-stage-grid pointer-events-none absolute inset-0 opacity-35" />

            <p
              className="tile-watermark pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-1/2 -translate-y-1/2 font-mono select-none"
              aria-hidden
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </p>

            <div
              className="relative z-10 flex items-center justify-center px-2 sm:px-6"
              style={{ height: metrics.stageH }}
            >
              <NavButton onClick={() => go(-1)} disabled={activeIndex === 0} label="Previous project">
                <ChevronLeft size={22} strokeWidth={1.5} />
              </NavButton>

              <motion.div
                ref={viewRef}
                className="relative mx-3 flex-1 sm:mx-8"
                style={{ height: metrics.tileH, perspective: reducedMotion ? undefined : 1400 }}
                drag={reducedMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={onDragEnd}
              >
                {/* Center reflection */}
                {!reducedMotion && (
                  <div
                    className="tile-reflection pointer-events-none absolute left-1/2 top-full z-0"
                    style={{ width: metrics.tileW * 0.92, marginLeft: -(metrics.tileW * 0.92) / 2 }}
                  />
                )}

                {SYSTEMS.map((s, index) => {
                  const offset = index - activeIndex;
                  if (Math.abs(offset) > 2) return null;
                  const isActive = offset === 0;
                  const isHovered = hoveredIndex === index;

                  return (
                    <motion.button
                      key={s.id}
                      type="button"
                      onClick={() => selectChapter(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(index)}
                      onBlur={() => setHoveredIndex(null)}
                      data-magnetic
                      className={`tile-card magnetic-target absolute left-1/2 top-0 cursor-pointer overflow-hidden rounded-xl text-left sm:rounded-2xl ${
                        isActive ? "tile-card--active-ring" : "border border-border"
                      }`}
                      style={{
                        width: metrics.tileW,
                        height: metrics.tileH,
                        marginLeft: -metrics.tileW / 2,
                        transformStyle: reducedMotion ? undefined : "preserve-3d",
                      }}
                      initial={false}
                      animate={tileMotion(offset, metrics, reducedMotion, isHovered)}
                      transition={{ type: "spring", stiffness: 200, damping: 24, mass: 0.8 }}
                    >
                      <div
                        className={`relative flex h-full flex-col bg-surface ${
                          isActive ? "tile-card--active" : "tile-card--idle"
                        }`}
                      >
                        {isActive && <div className="tile-card-shine pointer-events-none absolute inset-0 z-30" />}

                        <div className="relative shrink-0 overflow-hidden" style={{ height: "56%" }}>
                          <div className="tile-preview-vignette pointer-events-none absolute inset-0 z-10" />
                          {inView && Math.abs(offset) <= 1 && !reducedMotion ? (
                            <ProjectObjectPreview
                              systemId={s.id}
                              active={isActive}
                              size={isActive ? "lg" : "sm"}
                              className="h-full w-full rounded-none border-0"
                            />
                          ) : (
                            <div className="tile-preview-skeleton flex h-full items-center justify-center">
                              <span className="font-mono text-xs text-text-secondary/50">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>
                          )}
                          <div className="absolute right-3 top-3 z-20 rounded-md border border-border/60 bg-bg/70 px-2 py-0.5 font-mono text-[9px] text-text-secondary backdrop-blur-sm">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                              {s.story.era}
                            </p>
                            <h3 className="mt-2 line-clamp-2 text-base leading-snug text-text-primary sm:text-lg">
                              {s.name}
                            </h3>
                          </div>
                          <div>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {s.stack.slice(0, 3).map((t) => (
                                <span
                                  key={t}
                                  className="rounded border border-border/70 bg-bg/40 px-1.5 py-0.5 font-mono text-[8px] text-text-secondary sm:text-[9px]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-text-secondary sm:text-xs">
                              {s.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              <NavButton
                onClick={() => go(1)}
                disabled={activeIndex === SYSTEMS.length - 1}
                label="Next project"
              >
                <ChevronRight size={22} strokeWidth={1.5} />
              </NavButton>
            </div>

            <div className="tile-stage-floor pointer-events-none" />

            <div className="relative border-t border-border bg-surface/80 px-4 py-5 backdrop-blur-md sm:px-8">
              <div className="tile-timeline relative mb-4 h-px w-full bg-border">
                <motion.div
                  className="tile-timeline-fill absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-accent-violet to-accent"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                />
                {SYSTEMS.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectChapter(i)}
                    aria-label={`Chapter ${i + 1}: ${s.name}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                    className="tile-timeline-node absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${(i / (SYSTEMS.length - 1)) * 100}%` }}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "h-3 w-3 -translate-x-1/2 bg-accent shadow-[0_0_16px_rgba(110,139,255,0.55)]"
                          : i < activeIndex
                            ? "h-2 w-2 -translate-x-1/2 bg-accent/60"
                            : "h-2 w-2 -translate-x-1/2 bg-border hover:bg-text-secondary/40"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary">
                  <span className="text-text-primary">{system.story.era}</span>
                </p>
                <p className="font-mono text-[10px] text-text-secondary/70">
                  Arrow keys · Swipe · Click a tile
                </p>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={system.id}
            ref={detailRef}
            id={`story-${system.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="tile-detail mx-auto mt-12 max-w-4xl lg:mt-14"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,280px)] lg:gap-10">
              <div className="tile-detail-card rounded-2xl border border-border bg-surface/95 p-6 sm:p-8 lg:rounded-3xl lg:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                  Chapter story
                </p>
                <h3 className="mt-4 text-2xl text-text-primary sm:text-3xl">{system.name}</h3>
                <p className="mt-6 text-base leading-[1.8] text-text-secondary">{system.story.opener}</p>
                <p className="mt-5 text-base leading-[1.8] text-text-primary">{system.story.lesson}</p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {system.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-bg/60 px-2.5 py-1 font-mono text-[10px] text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 font-mono text-[10px] text-text-secondary">
                  {system.previewNodes.map((node, i) => (
                    <span key={node} className="flex items-center gap-2">
                      <span className="text-accent">●</span>
                      {node}
                      {i < system.previewNodes.length - 1 && <span className="text-border">→</span>}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <ChapterLinks system={system} />
                </div>

                {system.story.bridge && activeIndex < SYSTEMS.length - 1 && (
                  <p className="mt-8 border-t border-border pt-6 font-mono text-xs leading-relaxed text-text-secondary">
                    <span className="text-accent">Next →</span> {system.story.bridge}
                  </p>
                )}
              </div>

              <aside className="flex flex-col gap-3">
                {system.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="rounded-xl border border-border bg-surface-elevated/90 px-5 py-4 backdrop-blur-sm"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                      {m.label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-snug text-text-primary">{m.value}</p>
                  </motion.div>
                ))}
              </aside>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </WorldSection>
  );
}
