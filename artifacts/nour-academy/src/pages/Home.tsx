import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRegisterStudent } from "@workspace/api-client-react";

// --- Form Schema ---
const registerSchema = z.object({
  name: z.string().min(2, "الاسم الكامل مطلوب"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  course: z.enum(["bac", "english", "robotics"]),
  payment_method: z.enum(["cash", "ccp"]),
});
type RegisterFormValues = z.infer<typeof registerSchema>;

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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-primary shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#hero" className="text-2xl font-bold font-sans">
          <span className="text-white">نور</span>{" "}
          <span className="text-amber-400">أكاديمي</span>
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
            <a href="#registration">سجّل الآن</a>
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
        <div className="md:hidden bg-primary/95 backdrop-blur-sm shadow-lg absolute top-20 left-0 right-0 p-4 flex flex-col gap-4 text-white text-center font-medium">
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
            <a href="#registration">سجّل الآن</a>
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
      className="min-h-screen relative flex items-center justify-center pt-20 bg-primary"
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10 text-center text-white"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          أنر درب نجاحك مع <span className="text-amber-400">نور أكاديمي</span>
        </h1>
        <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-white/90">
          بيئة تعليمية حديثة، نخبة من خيرة الأساتذة، ومتابعة بيداغوجية دقيقة لضمان تفوق أبنائكم في مسارهم الدراسي.
        </p>
        <Button
          size="lg"
          asChild
          className="bg-amber-400 text-primary hover:bg-amber-500 font-bold text-xl px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <a href="#registration">سجّل الآن</a>
        </Button>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">من نحن</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نور أكاديمي هي مؤسسة تعليمية رائدة في الجزائر، نهدف إلى بناء جيل متفوق علمياً وأخلاقياً من خلال توفير بيئة محفزة وأساليب تدريس حديثة.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <Card className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 mx-auto text-amber-400 mb-4" />
              <div className="text-2xl font-bold text-primary">+500 طالب وطالبة</div>
            </CardContent>
          </Card>
          <Card className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <GraduationCap className="w-12 h-12 mx-auto text-amber-400 mb-4" />
              <div className="text-2xl font-bold text-primary">%95 نسبة النجاح</div>
            </CardContent>
          </Card>
          <Card className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Award className="w-12 h-12 mx-auto text-amber-400 mb-4" />
              <div className="text-2xl font-bold text-primary">+10 سنوات خبرة</div>
            </CardContent>
          </Card>
          <Card className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Target className="w-12 h-12 mx-auto text-amber-400 mb-4" />
              <div className="text-2xl font-bold text-primary">+20 دورة تدريبية</div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8">فريقنا التعليمي</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "أ. كريمة بن عمر", role: "مديرة الأكاديمية / أستاذة رياضيات", initials: "ك.ب" },
              { name: "أ. يوسف حداد", role: "أستاذ فيزياء وعلوم / تحضير بكالوريا", initials: "ي.ح" },
              { name: "أ. سارة مزياني", role: "أستاذة لغة إنجليزية / جميع المستويات", initials: "س.م" },
              { name: "م. أمين بلقاسم", role: "مدرب روبوتيك وبرمجة للأطفال", initials: "أ.ب" },
            ].map((teacher, i) => (
              <div key={i} className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-amber-400">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    {teacher.initials}
                  </AvatarFallback>
                </Avatar>
                <h4 className="text-xl font-bold text-primary">{teacher.name}</h4>
                <p className="text-muted-foreground text-sm mt-1">{teacher.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


interface CourseCard {
  slug: string;
  icon: string;
  title: string;
  price: string;
  img?: string;
  features: string[];
  featured?: boolean;
}

const TABS: { id: string; label: string; courses: CourseCard[] }[] = [
  {
    id: "adults",
    label: "دورات الكبار 👨",
    courses: [
      {
        slug: "bac",
        icon: "📚",
        title: "تحضير البكالوريا",
        price: "6,000 د.ج / شهر",
        img: "course-bac.jpg",
        features: [
          "رياضيات وفيزياء وعلوم",
          "متابعة فردية دقيقة",
          "اختبارات تجريبية دورية",
          "تطبيق عملي 100%",
        ],
      },
      {
        slug: "english",
        icon: "🌍",
        title: "اللغة الإنجليزية",
        price: "4,500 د.ج / شهر",
        img: "course-english.jpg",
        features: [
          "محادثة وكتابة وقراءة",
          "مستويات متعددة",
          "مدرسون متخصصون",
          "تمارين يومية تفاعلية",
        ],
        featured: true,
      },
      {
        slug: "bac",
        icon: "🎯",
        title: "منهجية البكالوريا",
        price: "3,500 د.ج / شهر",
        features: [
          "تقنيات الحفظ للامتحانات",
          "إدارة الوقت خلال الامتحان",
          "تحليل أسئلة السنوات السابقة",
          "بناء الثقة بالنفس",
        ],
      },
    ],
  },
  {
    id: "kids",
    label: "دورات الصغار 🧒",
    courses: [
      {
        slug: "robotics",
        icon: "🤖",
        title: "روبوتيك المبتدئين",
        price: "3,500 د.ج / شهر",
        img: "course-robotics.jpg",
        features: [
          "مقدمة في الروبوتيك",
          "تجميع نماذج بسيطة",
          "أساسيات البرمجة المرئية",
          "للأعمار 6-9 سنة",
        ],
      },
      {
        slug: "robotics",
        icon: "🏆",
        title: "الروبوتيك للأطفال",
        price: "5,000 د.ج / شهر",
        img: "course-robotics.jpg",
        features: [
          "برمجة وتجميع روبوتات",
          "Scratch والبرمجة المرئية",
          "مشاريع عملية كل وحدة",
          "للأعمار 8-14 سنة",
        ],
        featured: true,
      },
      {
        slug: "robotics",
        icon: "💡",
        title: "روبوتيك متقدم",
        price: "6,000 د.ج / شهر",
        img: "course-robotics.jpg",
        features: [
          "برمجة Python وArduino",
          "تصميم وطباعة 3D",
          "مشاريع مسابقات دولية",
          "للأعمار 12-16 سنة",
        ],
      },
    ],
  },
];

function CoursesGrid() {
  const [activeTab, setActiveTab] = useState("adults");
  const currentTab = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="courses-grid" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white shadow"
                    : "border border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards with animated tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {currentTab.courses.map((course, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-2xl flex flex-col transition-all duration-300 ${
                  course.featured
                    ? "border-2 border-primary shadow-2xl scale-105 z-10"
                    : "border border-gray-100 shadow-md"
                }`}
              >
                {/* Most popular badge */}
                {course.featured && (
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
                      {course.price.split(" / ")[0]}
                    </span>
                    <span className="text-gray-400 text-sm mr-1">
                      {" "}/ {course.price.split(" / ")[1]}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {course.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-primary font-bold text-base leading-none">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <a
                    href="#registration"
                    className={`block w-full text-center py-3 rounded-xl font-bold text-sm transition-all ${
                      course.featured
                        ? "bg-primary text-white hover:bg-primary/90 shadow-lg"
                        : "border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                    }`}
                  >
                    اشترك الآن
                  </a>

                  {/* Learn more link */}
                  <Link
                    href={`/courses/${course.slug}`}
                    className="block text-center text-primary text-xs font-semibold mt-3 hover:underline"
                  >
                    تعرف على المزيد ←
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}


function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">آراء الطلاب وأولياء الأمور</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "أحمد بن علي", role: "ولي أمر طالب", quote: "بفضل الله ثم جهود أساتذة نور أكاديمي، تمكن ابني من الحصول على معدل ممتاز في البكالوريا." },
            { name: "سعاد م.", role: "طالبة لغة إنجليزية", quote: "دورة الإنجليزية كانت رائعة، تحسن مستواي بشكل ملحوظ خلال أشهر قليلة والأساتذة متعاونون جداً." },
            { name: "عمر خ.", role: "طالب بكالوريا", quote: "المتابعة اليومية والتمارين المكثفة هنا كانت السر وراء نجاحي. أنصح الجميع بالتسجيل." }
          ].map((t, i) => (
            <Card key={i} className="bg-slate-50 border-none">
              <CardContent className="pt-8">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => <Award key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary">{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-primary">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">الأسئلة الشائعة</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="bg-white px-6 rounded-lg mb-4 border shadow-sm">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary py-4">كيف يمكنني التسجيل في الدورات؟</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              يمكنك التسجيل بسهولة عبر تعبئة النموذج الإلكتروني الموجود في أسفل الصفحة، وسيقوم فريقنا بالتواصل معك لتأكيد التسجيل.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-white px-6 rounded-lg mb-4 border shadow-sm">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary py-4">ما هي أوقات الدراسة؟</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              نوفر جداول مرنة تناسب جميع الطلاب، بما في ذلك فترات مسائية وعطلات نهاية الأسبوع.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-white px-6 rounded-lg mb-4 border shadow-sm">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary py-4">ما هي الفئة العمرية لدورة الروبوتيك؟</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              دورة الروبوتيك مصممة خصيصاً للأطفال واليافعين الذين تتراوح أعمارهم بين 8 و 14 سنة.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="bg-white px-6 rounded-lg mb-4 border shadow-sm">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary py-4">ما هي طرق الدفع المتاحة؟</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              نقبل الدفع نقداً في مقر الأكاديمية، أو عبر التحويل البريدي (CCP).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="bg-white px-6 rounded-lg mb-4 border shadow-sm">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary py-4">هل تقدمون شهادات بعد إتمام الدورات؟</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              نعم، نقدم شهادات مشاركة معتمدة من الأكاديمية بعد إتمام دورات اللغات والروبوتيك.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

function Registration() {
  const [isSuccess, setIsSuccess] = useState(false);
  const registerMutation = useRegisterStudent();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      course: "bac",
      payment_method: "cash",
    },
  });

  function onSubmit(values: RegisterFormValues) {
    registerMutation.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  }

  return (
    <section id="registration" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">نموذج التسجيل</h2>
          <p className="text-muted-foreground">سجّل الآن واحجز مقعدك</p>
        </div>

        <Card className="shadow-xl border-t-4 border-t-primary">
          <CardContent className="pt-8">
            {isSuccess ? (
              <div className="text-center py-10">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary mb-4">تم التسجيل بنجاح!</h3>
                <p className="text-muted-foreground mb-8">شكراً لك! تم حفظ بياناتك بنجاح. سنتواصل معك قريباً.</p>
                <Button 
                  onClick={() => {
                    setIsSuccess(false);
                    form.reset();
                  }}
                  variant="outline"
                  className="font-bold border-primary text-primary hover:bg-primary hover:text-white"
                >
                  تسجيل طالب آخر
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسم الطالب" {...field} data-testid="input-name" />
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
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input placeholder="0555 XX XX XX" dir="ltr" className="text-right" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الدورة المطلوبة</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-course">
                              <SelectValue placeholder="اختر الدورة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bac">تحضير البكالوريا</SelectItem>
                            <SelectItem value="english">اللغة الإنجليزية</SelectItem>
                            <SelectItem value="robotics">الروبوتيك للأطفال</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>طريقة الدفع</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6"
                          >
                            <FormItem className="flex items-center space-x-3 space-x-reverse space-y-0">
                              <FormControl>
                                <RadioGroupItem value="cash" />
                              </FormControl>
                              <FormLabel className="font-normal">نقداً</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-x-reverse space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ccp" />
                              </FormControl>
                              <FormLabel className="font-normal">CCP</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg h-12"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "جارٍ الإرسال..." : "إرسال التسجيل"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 bg-white border-t">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">تواصل معنا</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Phone size={28} />
            </div>
            <h3 className="font-bold text-xl mb-2">الهاتف</h3>
            <p className="text-muted-foreground" dir="ltr">0555 12 34 56</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Mail size={28} />
            </div>
            <h3 className="font-bold text-xl mb-2">البريد الإلكتروني</h3>
            <p className="text-muted-foreground">contact@nour-academy.dz</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <MapPin size={28} />
            </div>
            <h3 className="font-bold text-xl mb-2">العنوان</h3>
            <p className="text-muted-foreground">حي 500 مسكن، المسيلة، الجزائر</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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
              <li className="flex items-center gap-2"><MapPin size={18} className="text-amber-400" /> المسيلة، الجزائر</li>
              <li className="flex items-center gap-2"><Phone size={18} className="text-amber-400" /> <span dir="ltr">0555 12 34 56</span></li>
              <li className="flex items-center gap-2"><Mail size={18} className="text-amber-400" /> contact@nour-academy.dz</li>
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
      <CoursesGrid />
      <Testimonials />
      <FAQ />
      <Registration />
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
