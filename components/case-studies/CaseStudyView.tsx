import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, GitBranch } from "lucide-react";
import { Button3D } from "@/components/ui/Button3D";
import {
  CONTACT_LINKS,
  SITE,
  type CaseStudy,
  type SystemCard,
} from "@/lib/data";

type CaseStudyViewProps = {
  study: CaseStudy;
  system?: SystemCard;
};

export function CaseStudyView({ study, system }: CaseStudyViewProps) {
  return (
    <article className="relative min-h-screen pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(110,139,255,0.12),transparent_60%)]" />

      <header className="section-container relative z-10 border-b border-border pt-24 pb-10 sm:pt-28">
        <Link
          href={`/#systems/${study.id}`}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to build story
        </Link>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          Case study
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl text-text-primary sm:text-5xl">{study.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {study.tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {study.stack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-surface-elevated/80 px-2.5 py-1 font-mono text-[10px] text-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="section-container relative z-10 mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(0,300px)] lg:gap-14">
        <div className="flex flex-col gap-8">
          {(
            [
              ["Problem", study.problem],
              ["Solution", study.solution],
              ["Tradeoff", study.tradeoff],
            ] as const
          ).map(([label, body]) => (
            <section
              key={label}
              className="rounded-2xl border border-border bg-surface/90 p-6 sm:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                {label}
              </p>
              <p className="mt-4 text-base leading-[1.8] text-text-secondary">{body}</p>
            </section>
          ))}

          <section className="rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Outcome
            </p>
            <p className="mt-4 text-base leading-[1.8] text-text-primary">{study.outcome}</p>
          </section>

          <section className="case-study-retrospective rounded-2xl border border-border bg-surface-elevated/60 p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              What I&apos;d do differently
            </p>
            <p className="mt-4 text-base leading-[1.8] text-text-secondary">
              {study.retrospective}
            </p>
          </section>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
            Key decisions
          </p>
          {study.highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface-elevated/90 px-5 py-4"
            >
              <p className="text-sm font-medium text-text-primary">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
            </div>
          ))}

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-6">
            {system?.links.github && (
              <Button3D href={system.links.github} variant="secondary" external>
                <GitBranch size={14} />
                View on GitHub
              </Button3D>
            )}
            <Button3D href={CONTACT_LINKS.schedule} variant="accent" external>
              <Calendar size={14} />
              Book a call
            </Button3D>
          </div>
        </aside>
      </div>

      <footer className="section-container relative z-10 mt-16 border-t border-border pt-10">
        <p className="font-mono text-[11px] text-text-secondary">
          {SITE.name} · {SITE.role}
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-sm text-text-primary transition-colors hover:text-accent"
        >
          Return to portfolio
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </footer>
    </article>
  );
}
