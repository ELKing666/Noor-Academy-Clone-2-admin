import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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
      answer:
        "نقبل الدفع نقداً في مقر الأكاديمية، أو عبر التحويل البريدي (CCP).",
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
      priceNote:
        "يشمل السعر جميع المواد الثلاث — 6 ساعات أسبوعياً لمدة شهر كامل.",
    },
    english: {
      price: "4,500 د.ج / شهرياً",
      priceNote:
        "4 ساعات أسبوعياً — يشمل المواد التعليمية ووصولاً لمكتبة رقمية.",
    },
    robotics: {
      price: "5,000 د.ج / شهرياً",
      priceNote: "3 ساعات أسبوعياً — يشمل جميع مواد ومكونات الروبوت.",
    },
  },
};

async function fetchContent(): Promise<SiteContent> {
  const [faqResult, contactResult, pricingResult] = await Promise.all([
    supabase
      .from("faq_items")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase.from("contact_info").select("*").eq("id", "main").single(),
    supabase.from("course_pricing").select("*"),
  ]);

  if (faqResult.error) throw new Error(faqResult.error.message);
  if (contactResult.error) throw new Error(contactResult.error.message);
  if (pricingResult.error) throw new Error(pricingResult.error.message);

  const pricingMap: Record<string, CoursePricing> = {};
  for (const row of pricingResult.data ?? []) {
    pricingMap[row.course_slug] = {
      price: row.price,
      priceNote: row.price_note,
    };
  }

  return {
    faq: (faqResult.data ?? []).map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
    })),
    contact: {
      phone: contactResult.data.phone,
      email: contactResult.data.email,
      address: contactResult.data.address,
    },
    pricing: {
      bac: pricingMap["bac"] ?? DEFAULT_CONTENT.pricing.bac,
      english: pricingMap["english"] ?? DEFAULT_CONTENT.pricing.english,
      robotics: pricingMap["robotics"] ?? DEFAULT_CONTENT.pricing.robotics,
    },
  };
}

export function useSiteContent() {
  const result = useQuery<SiteContent>({
    queryKey: ["site-content"],
    queryFn: fetchContent,
    staleTime: 5 * 60 * 1000,
    placeholderData: DEFAULT_CONTENT,
  });
  return {
    ...result,
    isLoadingContent: result.isPlaceholderData || result.isLoading,
  };
}

export function useAdminContent(_password: string) {
  return useQuery<SiteContent>({
    queryKey: ["site-content"],
    queryFn: fetchContent,
    staleTime: 0,
    retry: false,
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { content: SiteContent }>({
    mutationFn: async ({ content }) => {
      const now = new Date().toISOString();

      const { error: contactError } = await supabase
        .from("contact_info")
        .upsert({
          id: "main",
          phone: content.contact.phone,
          email: content.contact.email,
          address: content.contact.address,
          updated_at: now,
        });
      if (contactError) throw new Error(contactError.message);

      const pricingRows = Object.entries(content.pricing).map(([slug, p]) => ({
        course_slug: slug,
        price: p.price,
        price_note: p.priceNote,
        updated_at: now,
      }));
      const { error: pricingError } = await supabase
        .from("course_pricing")
        .upsert(pricingRows);
      if (pricingError) throw new Error(pricingError.message);

      const { error: deleteError } = await supabase
        .from("faq_items")
        .delete()
        .neq("id", "___never___");
      if (deleteError) throw new Error(deleteError.message);

      if (content.faq.length > 0) {
        const faqRows = content.faq.map((item, i) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
          sort_order: i,
          updated_at: now,
        }));
        const { error: faqError } = await supabase
          .from("faq_items")
          .insert(faqRows);
        if (faqError) throw new Error(faqError.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
    },
  });
}
