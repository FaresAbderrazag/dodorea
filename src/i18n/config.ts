export const locales = ["fr", "de", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

// Pilote parents en français (ADR-006).
export const defaultLocale: Locale = "fr";

const rtlLocales: ReadonlySet<Locale> = new Set(["ar"]);

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.has(locale) ? "rtl" : "ltr";
}

/** Choisit la langue à partir de l'en-tête Accept-Language (q-values respectées). */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return {
        base: tag.toLowerCase().split("-")[0] ?? "",
        q: q ? Number(q.slice(2)) : 1,
        index,
      };
    })
    .filter((r) => r.base && Number.isFinite(r.q) && r.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  return ranked.map((r) => r.base).find(hasLocale) ?? defaultLocale;
}
