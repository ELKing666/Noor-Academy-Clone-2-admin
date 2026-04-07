export type Lang = "ar" | "fr" | "en";

export interface Translations {
  dir: "rtl" | "ltr";
  nav: {
    home: string; about: string; courses: string; testimonials: string;
    faq: string; branches: string; contact: string;
  };
  hero: { title: string; subtitle: string; cta: string; };
  about: {
    heading: string; description: string;
    students: string; trainers: string; years: string; trainingCourses: string;
  };
  courses: {
    badge: string; heading: string; description: string;
    tabAdults: string; tabKids: string; mostPopular: string;
    subscribeNow: string; learnMore: string;
    features: { bac: string[]; english: string[]; robotics: string[]; };
    defaultFeature: string; defaultDuration: string;
  };
  testimonials: { heading: string; viewAll: string; };
  faq: { heading: string; };
  branches: {
    heading: string; description: string; viewMap: string;
    main: string; second: string; third: string;
  };
  contact: {
    heading: string; phone: string; email: string; address: string;
    followUs: string;
    nameLabel: string; namePlaceholder: string;
    phoneLabel: string; phonePlaceholder: string;
    messageLabel: string; messagePlaceholder: string;
    send: string; sending: string;
    successTitle: string; successMsg: string; sendAnother: string;
    errorNameRequired: string; errorPhoneRequired: string; errorMessageRequired: string;
    submitError: string;
  };
  footer: {
    tagline: string; quickLinks: string;
    home: string; about: string; courses: string; faq: string;
    contactUs: string; copyright: string;
  };
  course: {
    backHome: string; learnHeading: string; learnSubheading: string;
    whoHeading: string; pricingHeading: string; pricingEmpty: string;
    durationLabel: string; bookNow: string; footer: string;
    notFound: string; backToHome: string; defaultWho: string;
    kids: string; adults: string; featured: string; notFeatured: string;
    weeklyDuration: string;
  };
  langToggleLabel: string;
}

import { ar } from "./ar";
import { fr } from "./fr";
import { en } from "./en";

export const translations: Record<Lang, Translations> = { ar, fr, en };
