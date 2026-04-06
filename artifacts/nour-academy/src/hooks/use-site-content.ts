import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

const DEFAULT_CONTENT: SiteContent = {
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
  const res = await fetch("/api/content");
  if (!res.ok) return DEFAULT_CONTENT;
  return res.json();
}

export function useSiteContent() {
  return useQuery<SiteContent>({
    queryKey: ["site-content"],
    queryFn: fetchContent,
    staleTime: 5 * 60 * 1000,
    placeholderData: DEFAULT_CONTENT,
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { password: string; content: SiteContent }>({
    mutationFn: async ({ password, content }) => {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error || "فشل الحفظ",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
    },
  });
}

export { DEFAULT_CONTENT };
