import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, negotiateLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (hasLocale(first)) return;

  request.nextUrl.pathname = `/${negotiateLocale(request.headers.get("accept-language"))}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Exclut les fichiers internes de Next et tout chemin contenant un point (favicon, images…).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
