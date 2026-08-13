import type { Translations } from "./types";
import { en } from "./en";
import { ro } from "./ro";

export const locales = ["en", "ro"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dict: Record<Locale, Translations> = { en, ro };

export function getTranslations(locale: string): Translations {
  return dict[locale as Locale] ?? dict.en;
}

export type { Translations } from "./types";
