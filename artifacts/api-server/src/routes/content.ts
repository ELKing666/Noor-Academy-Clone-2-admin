import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, siteSettingsTable } from "@workspace/db";

const router = Router();

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CoursePricing {
  price: string;
  priceNote: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface SiteContent {
  faq: FaqItem[];
  contact: ContactInfo;
  pricing: {
    bac: CoursePricing;
    english: CoursePricing;
    robotics: CoursePricing;
  };
}

export const DEFAULT_CONTENT: SiteContent = {
  faq: [
    {
      id: "1",
      question: "كيف يمكنني التسجيل في الدورات؟",
      answer:
        "يمكنك التسجيل بسهولة عبر تعبئة النموذج الإلكتروني الموجود في أسفل الصفحة، وسيقوم فريقنا بالتواصل معك لتأكيد التسجيل.",
    },
    {
      id: "2",
      question: "ما هي أوقات الدراسة؟",
      answer:
        "نوفر جداول مرنة تناسب جميع الطلاب، بما في ذلك فترات مسائية وعطلات نهاية الأسبوع.",
    },
    {
      id: "3",
      question: "ما هي الفئة العمرية لدورة الروبوتيك؟",
      answer:
        "دورة الروبوتيك مصممة خصيصاً للأطفال واليافعين الذين تتراوح أعمارهم بين 8 و 14 سنة.",
    },
    {
      id: "4",
      question: "ما هي طرق الدفع المتاحة؟",
      answer: "نقبل الدفع نقداً في مقر الأكاديمية، أو عبر التحويل البريدي (CCP).",
    },
    {
      id: "5",
      question: "هل تقدمون شهادات بعد إتمام الدورات؟",
      answer:
        "نعم، نقدم شهادات مشاركة معتمدة من الأكاديمية بعد إتمام دورات اللغات والروبوتيك.",
    },
  ],
  contact: {
    phone: "0555 12 34 56",
    email: "contact@nour-academy.dz",
    address: "حي 500 مسكن، شلف، الجزائر",
  },
  pricing: {
    bac: {
      price: "6,000 د.ج / شهرياً",
      priceNote: "يشمل السعر جميع المواد الثلاث — 6 ساعات أسبوعياً لمدة شهر كامل.",
    },
    english: {
      price: "4,500 د.ج / شهرياً",
      priceNote: "4 ساعات أسبوعياً — يشمل المواد التعليمية ووصولاً لمكتبة رقمية.",
    },
    robotics: {
      price: "5,000 د.ج / شهرياً",
      priceNote: "3 ساعات أسبوعياً — يشمل جميع مواد ومكونات الروبوت.",
    },
  },
};

const CONTENT_KEY = "site_content";

async function getContent(): Promise<SiteContent> {
  const [row] = await db
    .select()
    .from(siteSettingsTable)
    .where(eq(siteSettingsTable.key, CONTENT_KEY));

  if (!row) {
    return DEFAULT_CONTENT;
  }

  try {
    return JSON.parse(row.value) as SiteContent;
  } catch {
    return DEFAULT_CONTENT;
  }
}

router.get("/content", async (_req, res) => {
  const content = await getContent();
  res.json(content);
});

export { getContent, router as contentRouter };
