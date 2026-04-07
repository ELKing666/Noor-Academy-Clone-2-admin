import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Menu,
  Users,
  GraduationCap,
  Award,
  Target,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent } from "@/hooks/use-site-content";
import { useCourses } from "@/hooks/use-courses";

// --- Contact Form Schema ---
const contactSchema = z.object({
  name: z.string().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  message: z.string().min(10, "الرسالة مطلوبة"),
});
type ContactFormValues = z.infer<typeof contactSchema>;

// --- Animation variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeUpDelay = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});


// --- Animated Counter ---
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// --- Components ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/80 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="نور أكاديمي"
            className="h-12 w-12 rounded-lg object-cover"
          />
          <span className="text-2xl font-bold font-sans">
            <span className="text-white">نور</span>{" "}
            <span className="text-amber-400">أكاديمي</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium">
          <a href="#hero" className="hover:text-amber-400 transition-colors">الرئيسية</a>
          <a href="#about" className="hover:text-amber-400 transition-colors">من نحن</a>
          <a href="#courses" className="hover:text-amber-400 transition-colors">الدورات</a>
          <a href="#testimonials" className="hover:text-amber-400 transition-colors">آراء الطلاب</a>
          <a href="#faq" className="hover:text-amber-400 transition-colors">الأسئلة الشائعة</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">تواصل معنا</a>
          <Button
            asChild
            className="bg-amber-400 text-primary hover:bg-amber-500 font-bold"
          >
            <a href="#contact">تواصل معنا</a>
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-md shadow-lg absolute top-20 left-0 right-0 p-4 flex flex-col gap-4 text-white text-center font-medium">
          <a href="#hero" onClick={() => setMobileOpen(false)}>الرئيسية</a>
          <a href="#about" onClick={() => setMobileOpen(false)}>من نحن</a>
          <a href="#courses" onClick={() => setMobileOpen(false)}>الدورات</a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)}>آراء الطلاب</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>الأسئلة الشائعة</a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>تواصل معنا</a>
          <Button
            asChild
            className="bg-amber-400 text-primary hover:bg-amber-500 font-bold w-full mt-4"
            onClick={() => setMobileOpen(false)}
          >
            <a href="#contact">تواصل معنا</a>
          </Button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-center pt-20 bg-primary overflow-hidden"
    >
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary pointer-events-none"></div>

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10 text-center text-white flex-1 flex flex-col items-center justify-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          أنر درب نجاحك مع <span className="text-amber-400">نور أكاديمي</span>
        </h1>
        <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-white/90">
          بيئة تعليمية حديثة، نخبة من خيرة الأساتذة، ومتابعة بيداغوجية دقيقة لضمان تفوق أبنائكم في مسارهم الدراسي.
        </p>

        {/* Stats strip inside hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full max-w-3xl"
        >
          {[
            { value: 500, suffix: "+", label: "طالب وطالبة" },
            { value: 95, suffix: "%", label: "نسبة النجاح" },
            { value: 10, suffix: "+", label: "سنوات خبرة" },
            { value: 20, suffix: "+", label: "دورة تدريبية" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-black text-amber-400">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/80 text-xs md:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <Button
          size="lg"
          asChild
          className="bg-amber-400 text-primary hover:bg-amber-500 font-bold text-xl px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <a href="#contact">تواصل معنا</a>
        </Button>
      </motion.div>

      {/* Wave divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full leading-none z-10">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}

function About() {
  const statCards = [
    {
      icon: <Users className="w-7 h-7 text-white" />,
      target: 500,
      suffix: "+",
      label: "طالب وطالبة",
      gradient: "from-blue-500 to-blue-700",
      glow: "shadow-blue-400/40",
    },
    {
      icon: <GraduationCap className="w-7 h-7 text-white" />,
      target: 95,
      suffix: "%",
      label: "نسبة النجاح",
      gradient: "from-emerald-500 to-emerald-700",
      glow: "shadow-emerald-400/40",
    },
    {
      icon: <Award className="w-7 h-7 text-white" />,
      target: 10,
      suffix: "+",
      label: "سنوات خبرة",
      gradient: "from-amber-500 to-orange-600",
      glow: "shadow-amber-400/40",
    },
    {
      icon: <Target className="w-7 h-7 text-white" />,
      target: 20,
      suffix: "+",
      label: "دورة تدريبية",
      gradient: "from-primary to-red-800",
      glow: "shadow-red-400/40",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">من نحن</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نور أكاديمي هي مؤسسة تعليمية رائدة في الجزائر، نهدف إلى بناء جيل متفوق علمياً وأخلاقياً من خلال توفير بيئة محفزة وأساليب تدريس حديثة.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUpDelay(i * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className={`text-center border-none shadow-xl ${card.glow} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
                <CardContent className="pt-6 pb-6 px-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg ${card.glow} shadow-md`}>
                    {card.icon}
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-1">
                    <AnimatedCounter target={card.target} suffix={card.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{card.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8">فريقنا التعليمي</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "أ. كريمة بن عمر", role: "مديرة الأكاديمية", subject: "أستاذة رياضيات", initials: "ك.ب", gradient: "from-blue-500 to-indigo-600" },
              { name: "أ. يوسف حداد", role: "أستاذ علوم", subject: "فيزياء وعلوم — بكالوريا", initials: "ي.ح", gradient: "from-emerald-500 to-teal-600" },
              { name: "أ. سارة مزياني", role: "أستاذة لغة إنجليزية", subject: "جميع المستويات", initials: "س.م", gradient: "from-amber-500 to-orange-500" },
              { name: "م. أمين بلقاسم", role: "مدرب تقني", subject: "روبوتيك وبرمجة للأطفال", initials: "أ.ب", gradient: "from-primary to-red-700" },
            ].map((teacher, i) => (
              <motion.div
                key={i}
                variants={fadeUpDelay(i * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center group"
              >
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${teacher.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300 ring-4 ring-white`}>
                  <span className="text-white text-xl font-black">{teacher.initials}</span>
                </div>
                <h4 className="text-xl font-bold text-primary">{teacher.name}</h4>
                <p className="text-sm font-semibold text-gray-600 mt-1">{teacher.role}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{teacher.subject}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


const COURSE_FEATURES: Record<string, string[]> = {
  bac: [
    "رياضيات وفيزياء وعلوم",
    "متابعة فردية دقيقة",
    "اختبارات تجريبية دورية",
    "تطبيق عملي 100%",
  ],
  english: [
    "محادثة وكتابة وقراءة",
    "مستويات متعددة",
    "مدرسون متخصصون",
    "تمارين يومية تفاعلية",
  ],
  robotics: [
    "برمجة وتجميع روبوتات",
    "Scratch والبرمجة المرئية",
    "مشاريع عملية كل وحدة",
    "للأعمار 8-14 سنة",
  ],
};

function CoursesGrid() {
  const [activeTab, setActiveTab] = useState("adults");
  const { data: courses, isLoading } = useCourses();

  const adultsCourses = (courses ?? []).filter((c) => c.category === "adults");
  const kidsCourses = (courses ?? []).filter((c) => c.category === "kids");

  const CATEGORY_TABS = [
    ...(adultsCourses.length > 0 ? [{ id: "adults", label: "دورات الكبار 👨" }] : []),
    ...(kidsCourses.length > 0 ? [{ id: "kids", label: "دورات الصغار 🧒" }] : []),
  ];

  const firstAvailable = CATEGORY_TABS[0]?.id ?? "adults";
  const resolvedTab = CATEGORY_TABS.some((t) => t.id === activeTab) ? activeTab : firstAvailable;

  const currentCourses = resolvedTab === "adults" ? adultsCourses : kidsCourses;

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            برامجنا الدراسية
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            اكتشف دوراتنا
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            برامج تعليمية مصممة بعناية لتلبية احتياجات كل طالب، بإشراف نخبة من الأساتذة المتخصصين.
          </p>
        </motion.div>

        {/* Toggle pills */}
        {CATEGORY_TABS.length > 1 && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm gap-1">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    resolvedTab === tab.id
                      ? "bg-gray-900 text-white shadow"
                      : "border border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        )}

        {/* Cards with animated tab switch */}
        {!isLoading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
            >
              {currentCourses.map((course) => {
                const features = COURSE_FEATURES[course.id] ?? [
                  course.description || "محتوى تعليمي متميز",
                  `المدة: ${course.duration || "حسب الجدول"}`,
                ];
                const parts = course.price.split(" / ");
                return (
                  <div
                    key={course.id}
                    className={`relative bg-white rounded-2xl flex flex-col transition-all duration-300 ${
                      course.is_featured
                        ? "border-2 border-primary shadow-2xl scale-105 z-10"
                        : "border border-gray-100 shadow-md"
                    }`}
                  >
                    {/* Most popular badge */}
                    {course.is_featured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
                          الأكثر طلباً
                        </span>
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-1">
                      {/* Icon */}
                      <div className="text-5xl text-center mb-4">{course.icon}</div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-center text-gray-900 mb-3">
                        {course.title}
                      </h3>

                      {/* Price */}
                      <div className="text-center mb-6">
                        <span className="text-3xl font-black text-primary">
                          {parts[0]}
                        </span>
                        <span className="text-gray-400 text-sm mr-1">
                          {parts[1] ? ` / ${parts[1]}` : ""}
                        </span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-8 flex-1">
                        {features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-primary font-bold text-base leading-none">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA button */}
                      <a
                        href="#contact"
                        className={`block w-full text-center py-3 rounded-xl font-bold text-sm transition-all ${
                          course.is_featured
                            ? "bg-primary text-white hover:bg-primary/90 shadow-lg"
                            : "border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                        }`}
                      >
                        اشترك الآن
                      </a>

                      {/* Learn more link */}
                      <Link
                        href={`/courses/${course.id}`}
                        className="block text-center text-primary text-xs font-semibold mt-3 hover:underline"
                      >
                        تعرف على المزيد ←
                      </Link>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}


function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      {/* Wave top */}
      <div className="w-full overflow-hidden leading-none mb-0 -mt-1">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,0 L0,0 Z" fill="#f8fafc" />
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">آراء الطلاب وأولياء الأمور</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "أحمد بن علي", role: "ولي أمر طالب", quote: "بفضل الله ثم جهود أساتذة نور أكاديمي، تمكن ابني من الحصول على معدل ممتاز في البكالوريا." },
            { name: "سعاد م.", role: "طالبة لغة إنجليزية", quote: "دورة الإنجليزية كانت رائعة، تحسن مستواي بشكل ملحوظ خلال أشهر قليلة والأساتذة متعاونون جداً." },
            { name: "عمر خ.", role: "طالب بكالوريا", quote: "المتابعة اليومية والتمارين المكثفة هنا كانت السر وراء نجاحي. أنصح الجميع بالتسجيل." }
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUpDelay(i * 0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="relative border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white">
                {/* Gradient left accent */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-primary rounded-r-full" />
                {/* Big decorative quotation mark */}
                <div className="absolute top-3 left-4 text-7xl font-serif text-primary/10 leading-none select-none pointer-events-none">"</div>
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="flex text-amber-400 mb-4 gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white font-bold text-sm shadow">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-primary">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { data, isLoadingContent: isLoading } = useSiteContent();
  const faqItems = data?.faq ?? [];

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">الأسئلة الشائعة</h2>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white px-6 py-4 rounded-lg border shadow-sm">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="bg-white px-6 rounded-lg mb-4 border shadow-sm">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary py-4">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const { data, isLoadingContent: isLoading } = useSiteContent();
  const contact = data?.contact;
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "فشل الإرسال");
      }
      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "حدث خطأ، حاول مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactItems = [
    {
      icon: <Phone size={26} className="text-white" />,
      title: "الهاتف",
      info: contact?.phone ?? "0555 12 34 56",
      dir: "ltr" as const,
      gradient: "from-blue-500 to-blue-700",
      glow: "hover:shadow-blue-400/30",
    },
    {
      icon: <Mail size={26} className="text-white" />,
      title: "البريد الإلكتروني",
      info: contact?.email ?? "contact@nour-academy.dz",
      dir: undefined,
      gradient: "from-primary to-red-700",
      glow: "hover:shadow-red-400/30",
    },
    {
      icon: <MapPin size={26} className="text-white" />,
      title: "العنوان",
      info: contact?.address ?? "حي 500 مسكن، شلف، الجزائر",
      dir: undefined,
      gradient: "from-emerald-500 to-emerald-700",
      glow: "hover:shadow-emerald-400/30",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white border-t">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">تواصل معنا</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center p-6 rounded-2xl border border-gray-100 shadow-md bg-white">
                  <Skeleton className="w-16 h-16 rounded-2xl mb-4" />
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-4 w-36" />
                </div>
              ))
            : contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpDelay(i * 0.15)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`flex flex-col items-center p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white ${item.glow}`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-muted-foreground" dir={item.dir}>{item.info}</p>
                </motion.div>
              ))}
        </div>

        {/* Contact Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-lg mx-auto bg-gray-50 rounded-2xl p-8 shadow-md border border-gray-100 text-right"
        >
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">تم إرسال رسالتك!</h3>
              <p className="text-muted-foreground mb-6">سنتواصل معك في أقرب وقت ممكن.</p>
              <Button
                onClick={() => setIsSuccess(false)}
                variant="outline"
                className="font-bold border-primary text-primary hover:bg-primary hover:text-white"
              >
                إرسال رسالة أخرى
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل اسمك الكامل"
                          {...field}
                          className="focus-visible:ring-primary focus-visible:border-primary h-11 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="0555 XX XX XX"
                          dir="ltr"
                          className="text-right focus-visible:ring-primary focus-visible:border-primary h-11 bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">الرسالة</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="أدخل رسالتك"
                          rows={5}
                          {...field}
                          className="focus-visible:ring-primary focus-visible:border-primary bg-white resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {submitError && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg text-center">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base h-12 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? "جارٍ الإرسال..." : "إرسال الرسالة"}
                </Button>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const { data } = useSiteContent();
  const contact = data?.contact;

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-2xl font-bold font-sans mb-4">
              <span className="text-white">نور</span>{" "}
              <span className="text-amber-400">أكاديمي</span>
            </div>
            <p className="text-white/80 max-w-sm">
              مؤسسة تعليمية رائدة تهدف إلى تقديم تعليم متميز وبناء جيل ناجح علمياً وأخلاقياً.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-amber-400">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><a href="#hero" className="text-white/80 hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors">من نحن</a></li>
              <li><a href="#courses" className="text-white/80 hover:text-white transition-colors">دوراتنا</a></li>
              <li><a href="#faq" className="text-white/80 hover:text-white transition-colors">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-amber-400">اتصل بنا</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-2"><MapPin size={18} className="text-amber-400" /> {contact?.address ?? "شلف، الجزائر"}</li>
              <li className="flex items-center gap-2"><Phone size={18} className="text-amber-400" /> <span dir="ltr">{contact?.phone ?? "0555 12 34 56"}</span></li>
              <li className="flex items-center gap-2"><Mail size={18} className="text-amber-400" /> {contact?.email ?? "contact@nour-academy.dz"}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          © 2026 نور أكاديمي — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden" dir="rtl">
      <Navbar />
      <Hero />
      <About />
      {/* Wave divider: About → Courses */}
      <div className="bg-gray-50 -mt-1">
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 block" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,0 720,60 1080,30 C1260,15 1380,45 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>
      <CoursesGrid />
      {/* Wave divider: Courses → Testimonials */}
      <div className="bg-white -mt-1">
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 block" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/213555123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all z-50"
      >
        <MessageCircle size={30} />
      </a>
    </div>
  );
}
