import React, { createContext, useContext, useEffect, useState } from "react";
import { type Lang, type Translations, translations } from "@/i18n/index";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: "ar",
  setLang: () => {},
  t: translations.ar,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("nour_lang") as Lang | null;
      if (saved && (saved === "ar" || saved === "fr" || saved === "en")) return saved;
    } catch {}
    return "ar";
  });

  function setLang(newLang: Lang) {
    setLangState(newLang);
    try { localStorage.setItem("nour_lang", newLang); } catch {}
  }

  useEffect(() => {
    const t = translations[lang];
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
