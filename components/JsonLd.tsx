import { CONTACT_LINKS } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Vinay Vasamsetty",
        jobTitle: "AI Product Engineer",
        description:
          "Technical founder building AI-powered operational systems, agentic platforms, and production SaaS.",
        url: siteUrl,
        email: "vasamsettyvinay.01@gmail.com",
        sameAs: [
          CONTACT_LINKS.linkedin,
          CONTACT_LINKS.github,
          CONTACT_LINKS.schedule,
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Houston",
          addressRegion: "TX",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "vinay.systems",
        description: "AI Operational Systems portfolio",
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
