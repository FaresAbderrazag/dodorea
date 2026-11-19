import { describe, expect, it } from "vitest";
import { defaultLocale, dirOf, hasLocale, locales, negotiateLocale } from "./config";

describe("langues", () => {
  it("prend en charge FR, DE, EN et AR, pilote en français", () => {
    expect(locales).toEqual(["fr", "de", "en", "ar"]);
    expect(defaultLocale).toBe("fr");
  });

  it("seul l'arabe s'écrit de droite à gauche", () => {
    expect(dirOf("ar")).toBe("rtl");
    for (const l of ["fr", "de", "en"] as const) expect(dirOf(l)).toBe("ltr");
  });

  it("rejette une langue non prise en charge", () => {
    expect(hasLocale("es")).toBe(false);
    expect(hasLocale("fr")).toBe(true);
  });
});

describe("négociation Accept-Language", () => {
  it.each([
    [null, "fr"],
    ["", "fr"],
    ["de-DE,de;q=0.9,en;q=0.8", "de"],
    ["es-ES,ar;q=0.7", "ar"],
    ["en;q=0.5,fr;q=0.9", "fr"],
    ["es,it", "fr"],
    ["ar-MA", "ar"],
    ["en;q=0", "fr"],
  ])("%s → %s", (header, expected) => {
    expect(negotiateLocale(header)).toBe(expected);
  });
});
