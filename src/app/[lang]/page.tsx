import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const languageNames = {
  fr: "Français",
  de: "Deutsch",
  en: "English",
  ar: "العربية",
} as const;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 p-6">
      <h1 className="text-4xl font-bold">{dict.meta.title}</h1>
      <p className="text-xl">{dict.home.tagline}</p>
      <p className="opacity-70">{dict.home.status}</p>
      <nav aria-label={dict.home.languages}>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={`/${l}`}
                lang={l}
                hrefLang={l}
                aria-current={l === lang ? "page" : undefined}
                className="underline underline-offset-4 aria-[current=page]:font-bold aria-[current=page]:no-underline"
              >
                {languageNames[l]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
