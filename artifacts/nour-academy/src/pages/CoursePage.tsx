import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/use-site-content";
import { Skeleton } from "@/components/ui/skeleton";

interface Topic {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

interface Stat {
  value: string;
  label: string;
}

interface CourseData {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  img: string;
  stats: Stat[];
  topics: Topic[];
  forWhom: string[];
  defaultPrice: string;
  defaultPriceNote: string;
}

const COURSES: Record<string, CourseData> = {
  bac: {
    slug: "bac",
    badge: "شعبة العلوم والتقني رياضي",
    title: "تحضير البكالوريا",
    subtitle:
      "منهج شامل ودقيق في الرياضيات والفيزياء والعلوم الطبيعية، مع متابعة فردية لكل طالب لضمان أعلى نتيجة ممكنة في امتحان البكالوريا.",
    img: "course-bac.jpg",
    stats: [
      { value: "السنة النهائية", label: "الصف الدراسي" },
      { value: "3 مواد رئيسية", label: "مواد البرنامج" },
      { value: "6 ساعة/أسبوع", label: "تدريب مكثف" },
      { value: "تدريب تفاعلي", label: "منهجية التعلم" },
    ],
    topics: [
      {
        num: "01",
        title: "الرياضيات",
        desc: "تغطية كاملة لمنهج الرياضيات بشعبتيه — من التحليل والجبر إلى الإحصاء والهندسة — مع حل مستفيض لامتحانات السنوات السابقة.",
        tags: ["التحليل", "الجبر", "الهندسة", "الإحصاء"],
      },
      {
        num: "02",
        title: "الفيزياء والكيمياء",
        desc: "فهم عميق للمفاهيم الفيزيائية والكيميائية مع تمارين تطبيقية وتجارب عملية تساعد الطالب على استيعاب الدرس بسهولة.",
        tags: ["الميكانيك", "الكهرباء", "الكيمياء العضوية", "الضوء"],
      },
      {
        num: "03",
        title: "العلوم الطبيعية",
        desc: "شرح وافٍ لمحاور بيولوجيا وجيولوجيا البكالوريا، مع مراجعة شاملة للوحدات الأكثر تكراراً في الامتحانات الرسمية.",
        tags: ["البيولوجيا", "الجيولوجيا", "التشريح", "الخلية"],
      },
      {
        num: "04",
        title: "منهجية الامتحان",
        desc: "تدريب مكثف على إدارة الوقت، وتقنيات الإجابة الصحيحة، ومحاكاة ظروف الامتحان الحقيقي لتعزيز الثقة بالنفس.",
        tags: ["إدارة الوقت", "نمذجة الامتحانات", "ثقة بالنفس"],
      },
    ],
    forWhom: [
      "طلاب السنة النهائية ثانوي (شعبة العلوم أو التقني رياضي).",
      "من يريد تعزيز نتيجته ورفع معدله في البكالوريا.",
      "من يعاني من ثغرات في مادة الرياضيات أو الفيزياء.",
      "الطلاب الراغبون في تكملة دراستهم في كليات العلوم أو الهندسة.",
    ],
    defaultPrice: "6,000 د.ج / شهرياً",
    defaultPriceNote: "يشمل السعر جميع المواد الثلاث — 6 ساعات أسبوعياً لمدة شهر كامل.",
  },

  english: {
    slug: "english",
    badge: "من مبتدئ إلى متقدم",
    title: "اللغة الإنجليزية",
    subtitle:
      "دورات مدروسة بعناية لتطوير مهارات المحادثة والكتابة والقراءة، مع مدرسين متخصصين ومحتوى حديث مناسب لجميع المستويات والأعمار.",
    img: "course-english.jpg",
    stats: [
      { value: "جميع الأعمار", label: "الفئة المستهدفة" },
      { value: "4 مستويات", label: "مسارات التعلم" },
      { value: "4 ساعة/أسبوع", label: "تدريب منتظم" },
      { value: "محادثة + كتابة", label: "منهجية التعلم" },
    ],
    topics: [
      {
        num: "01",
        title: "المحادثة والاستماع",
        desc: "تطوير مهارة الكلام بثقة والفهم الجيد للأصوات الإنجليزية، من خلال حوارات حية وتمثيل أدوار وتسجيلات صوتية أصيلة.",
        tags: ["المحادثة", "النطق", "الاستماع", "الحوار"],
      },
      {
        num: "02",
        title: "القراءة والكتابة",
        desc: "توسيع المخزون اللغوي وتحسين أسلوب الكتابة، بدءاً من الجملة البسيطة وصولاً إلى كتابة مقالات ورسائل احترافية.",
        tags: ["الكتابة الإبداعية", "القراءة الموسعة", "المفردات"],
      },
      {
        num: "03",
        title: "القواعد اللغوية",
        desc: "تغطية شاملة لقواعد اللغة الإنجليزية (Grammar) بأسلوب مبسط وعملي، مع تطبيقات يومية تثبّت المعلومة.",
        tags: ["الأزمنة", "الأفعال", "الجملة المركبة", "التراكيب"],
      },
      {
        num: "04",
        title: "الإعداد للشهادات",
        desc: "تحضير للطلاب الراغبين في اجتياز اختبارات الكفاءة كـ IELTS وDELF، مع تقييم دوري وخطة شخصية مخصصة لكل طالب.",
        tags: ["IELTS", "محاكاة اختبارات", "تحليل الأداء"],
      },
    ],
    forWhom: [
      "الطلاب من جميع المراحل الذين يريدون تحسين نتائجهم المدرسية.",
      "المهنيون الراغبون في اللغة الإنجليزية للعمل أو السفر.",
      "من يريد الاستعداد لاختبارات الكفاءة الدولية.",
      "الأطفال والمبتدئون الذين يبدأون من الصفر.",
    ],
    defaultPrice: "4,500 د.ج / شهرياً",
    defaultPriceNote: "4 ساعات أسبوعياً — يشمل المواد التعليمية ووصولاً لمكتبة رقمية.",
  },

  robotics: {
    slug: "robotics",
    badge: "للأعمار 8-14 سنة",
    title: "الروبوتيك للأطفال",
    subtitle:
      "برنامج تفاعلي وممتع يُعلّم الأطفال أساسيات البرمجة وتجميع الروبوتات بأسلوب لعبي، ينمّي التفكير المنطقي والإبداعي ويؤسس لمستقبل تقني مشرق.",
    img: "course-robotics.jpg",
    stats: [
      { value: "8-14 سنة", label: "الفئة العمرية" },
      { value: "4 وحدات", label: "وحدات البرنامج" },
      { value: "3 ساعة/أسبوع", label: "جلسات عملية" },
      { value: "تعلم بالممارسة", label: "منهجية التعلم" },
    ],
    topics: [
      {
        num: "01",
        title: "أساسيات البرمجة",
        desc: "تعلّم مبادئ البرمجة بطريقة بصرية وممتعة باستخدام Scratch وبيئات بصرية مناسبة للأعمار الصغيرة، دون الحاجة لخبرة سابقة.",
        tags: ["Scratch", "المنطق البرمجي", "التسلسل", "الشرط"],
      },
      {
        num: "02",
        title: "تجميع الروبوت",
        desc: "اكتشاف كيفية عمل الروبوتات من الداخل — تجميع القطع، توصيل الأسلاك، وفهم دور كل مكوّن في جعل الروبوت يتحرك ويستجيب.",
        tags: ["المحركات", "الحساسات", "الهيكل", "الدوائر الكهربائية"],
      },
      {
        num: "03",
        title: "التفكير الإبداعي وحل المشكلات",
        desc: "تحديات أسبوعية تُشجع الطفل على التفكير خارج الصندوق، العمل الجماعي، وإيجاد حلول إبداعية لمهام واقعية ومسلية.",
        tags: ["حل المشكلات", "التفكير النقدي", "العمل الجماعي"],
      },
      {
        num: "04",
        title: "مشاريع عملية",
        desc: "في نهاية كل وحدة يصمّم الطفل ويُنفّذ مشروعاً كاملاً بنفسه، ويُقدّمه أمام زملائه، لبناء الثقة بالنفس وحب الابتكار.",
        tags: ["مشروع نهائي", "العرض التقديمي", "الإبداع"],
      },
    ],
    forWhom: [
      "الأطفال المهتمون بالتكنولوجيا والاكتشاف.",
      "من يريد تنمية التفكير المنطقي لدى أبنائه منذ الصغر.",
      "الأطفال الراغبون في تطوير مهارات القرن الـ21.",
      "من يبحث عن نشاط تعليمي ممتع ومفيد في وقت الفراغ.",
    ],
    defaultPrice: "5,000 د.ج / شهرياً",
    defaultPriceNote: "3 ساعات أسبوعياً — يشمل جميع مواد ومكونات الروبوت.",
  },
};

export default function CoursePage() {
  const params = useParams<{ slug: string }>();
  const course = COURSES[params.slug ?? ""];
  const { data: siteContent, isLoading: isPricingLoading } = useSiteContent();

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4 p-8">
        <p className="text-2xl font-bold text-gray-700">الدورة غير موجودة</p>
        <Link href="/" className="text-primary underline font-semibold">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  const slug = course.slug as "bac" | "english" | "robotics";
  const pricingData = siteContent?.pricing?.[slug];
  const price = pricingData?.price ?? course.defaultPrice;
  const priceNote = pricingData?.priceNote ?? course.defaultPriceNote;

  const imgSrc = `${import.meta.env.BASE_URL}${course.img}`;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Back button */}
      <Link
        href="/#courses"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white text-primary font-bold px-4 py-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all text-sm"
      >
        → الرئيسية
      </Link>

      {/* Hero */}
      <header
        className="relative text-white py-28 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #6b0010 0%, #a0001a 100%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${imgSrc}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
          }}
        />
        {/* Strong overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-amber-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-5 tracking-wide"
          >
            {course.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-5"
          >
            {course.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg opacity-90 leading-relaxed"
          >
            {course.subtitle}
          </motion.p>
        </div>
      </header>

      {/* Floating stats */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {course.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="bg-white p-5 rounded-2xl shadow-xl text-center"
            >
              <div className="text-primary font-bold text-lg">{s.value}</div>
              <div className="text-gray-400 text-xs mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">ماذا ستتعلم؟</h2>
          <p className="text-gray-500 mt-2">محاور البرنامج التعليمي بالتفصيل</p>
        </div>

        <div className="space-y-6">
          {course.topics.map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="md:w-1/3 bg-red-50 p-8 flex items-center gap-4">
                <span className="text-5xl font-black text-primary/20 leading-none">
                  {topic.num}
                </span>
                <h3 className="text-xl font-bold text-primary">{topic.title}</h3>
              </div>
              <div className="md:w-2/3 p-8">
                <p className="text-gray-600 leading-relaxed mb-5">{topic.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* For whom + pricing */}
      <section
        className="py-20 px-4 text-white"
        style={{ background: "linear-gradient(135deg, #8b0012 0%, #c0001a 100%)" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">من يستفيد من هذا البرنامج؟</h2>
            <ul className="space-y-4">
              {course.forWhom.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-white/30 h-6 w-6 flex items-center justify-center rounded-full text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 p-8 rounded-[2rem] border border-white/20">
            <h3 className="text-2xl font-bold mb-4">التسجيل والأسعار</h3>
            {isPricingLoading ? (
              <>
                <Skeleton className="h-10 w-48 mb-2 bg-white/20" />
                <Skeleton className="h-4 w-64 mb-8 bg-white/10" />
              </>
            ) : (
              <>
                <div className="text-4xl font-bold text-amber-400 mb-2">{price}</div>
                <p className="text-white/60 mb-8 text-sm italic">{priceNote}</p>
              </>
            )}
            <a
              href={`${base}/#registration`}
              className="block w-full bg-amber-400 text-gray-900 text-center py-4 rounded-2xl font-bold text-lg hover:bg-amber-300 transition-all"
            >
              احجز مقعدك الآن
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm bg-white border-t border-gray-100">
        <p>© 2026 نور أكاديمي. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
