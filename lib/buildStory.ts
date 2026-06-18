export function parseBuildStoryHash(hash = ""): string | null {
  const raw = hash.replace(/^#/, "");
  const match = raw.match(/^systems\/([a-z0-9-]+)$/i);
  return match?.[1]?.toLowerCase() ?? null;
}

export function buildStoryHash(systemId: string) {
  return `#systems/${systemId}`;
}

export function systemIndexFromHash(
  systemIds: readonly { id: string }[],
  hash?: string
): number | null {
  const id = parseBuildStoryHash(
    hash ?? (typeof window !== "undefined" ? window.location.hash : "")
  );
  if (!id) return null;
  const index = systemIds.findIndex((s) => s.id === id);
  return index >= 0 ? index : null;
}
