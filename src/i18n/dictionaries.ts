import type { Locale } from "./config";
import type fr from "./dictionaries/fr.json";

// Le français est la référence : chaque langue doit fournir exactement les mêmes clés.
export type Dictionary = typeof fr;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
