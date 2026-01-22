export function normalizeAccept(accept?: string): string[] {
  if (!accept) return [];
  return accept
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function fileMatchesAccept(file: File, acceptList: string[]): boolean {
  if (acceptList.length === 0) return true;

  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();

  return acceptList.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule);

    if (rule.endsWith("/*")) {
      const prefix = rule.replace("/*", "");
      return type.startsWith(prefix);
    }

    return type === rule;
  });
}
