import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-studies/CaseStudyView";
import { CASE_STUDIES, getCaseStudyById, getSystemById } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ id: study.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const study = getCaseStudyById(id);
  if (!study) return { title: "Case study not found" };

  return {
    title: `${study.name} — Case Study · Vinay Vasamsetty`,
    description: study.tagline,
    openGraph: {
      title: `${study.name} — Case Study`,
      description: study.tagline,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const study = getCaseStudyById(id);
  if (!study) notFound();

  const system = getSystemById(id);

  return <CaseStudyView study={study} system={system} />;
}
