import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Menu,
  Users,
  GraduationCap,
  Award,
  Target,
  BookOpen,
  Globe,
  Cpu,
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

function Courses() {
  return (
    <section id="courses" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">دوراتنا التعليمية</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-t-4 border-t-primary hover:shadow-xl transition-shadow relative overflow-hidden group">
            <CardContent className="pt-8 px-6 pb-8">
              <BookOpen className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">تحضير البكالوريا</h3>
              <p className="text-muted-foreground mb-6 h-20">
                رياضيات، فيزياء، علوم في شعبتَي العلوم والرياضيات. منهجية دقيقة للنجاح.
              </p>
              <div className="text-lg font-bold text-amber-500 bg-amber-50 inline-block px-4 py-2 rounded-full">
                6,000 د.ج / شهرياً
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-amber-400 hover:shadow-xl transition-shadow relative overflow-hidden group">
            <CardContent className="pt-8 px-6 pb-8">
              <Globe className="w-12 h-12 text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">اللغة الإنجليزية</h3>
              <p className="text-muted-foreground mb-6 h-20">
                من المستوى المبتدئ إلى المتقدم، محادثة وكتابة. نؤهلك للتواصل بطلاقة.
              </p>
              <div className="text-lg font-bold text-primary bg-red-50 inline-block px-4 py-2 rounded-full">
                4,500 د.ج / شهرياً
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-primary hover:shadow-xl transition-shadow relative overflow-hidden group">
            <CardContent className="pt-8 px-6 pb-8">
              <Cpu className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">الروبوتيك للأطفال</h3>
              <p className="text-muted-foreground mb-6 h-20">
                تعلم البرمجة والروبوتيك للأعمار 8-14 سنة. تنمية مهارات التفكير المنطقي.
              </p>
              <div className="text-lg font-bold text-amber-500 bg-amber-50 inline-block px-4 py-2 rounded-full">
                5,000 د.ج / شهرياً
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function CoursesGrid() {
  const courses = [
    {
      slug: "bac",
      img: `${import.meta.env.BASE_URL}course-bac.jpg`,
      title: "تحضير البكالوريا",
      desc: "منهج شامل في الرياضيات والفيزياء والعلوم لشعبتَي العلوم والتقني رياضي، مع متابعة فردية دقيقة.",
      price: "6,000 د.ج / شهرياً",
    },
    {
      slug: "english",
      img: `${import.meta.env.BASE_URL}course-english.jpg`,
      title: "اللغة الإنجليزية",
      desc: "دورات من المستوى المبتدئ إلى المتقدم في المحادثة والكتابة والقراءة، مع مدرسين متخصصين.",
      price: "4,500 د.ج / شهرياً",
    },
    {
      slug: "robotics",
      img: `${import.meta.env.BASE_URL}course-robotics.jpg`,
      title: "الروبوتيك للأطفال",
      desc: "تعلم البرمجة والروبوتيك للأعمار 8-14 سنة بأسلوب تفاعلي ممتع يطوّر التفكير المنطقي والإبداعي.",
      price: "5,000 د.ج / شهرياً",
    },
  ];

  return (
    <section id="courses-grid" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300 border-none shadow-md h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <CardContent className="pt-6 px-6 pb-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{course.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                      {course.price}
                    </span>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"
                    >
                      تعرف على المزيد ←
                    </Link>
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

function CurriculumSection() {
  const stats = [
    { value: "تدريب تفاعلي", label: "منهجية التعلم" },
    { value: "3 مواد رئيسية", label: "مواد البرنامج" },
    { value: "6 ساعة/أسبوع", label: "تدريب مكثف" },
    { value: "8–18 سنة", label: "الفئة العمرية" },
  ];

  const topics = [
    {
      num: "01",
      title: "الرياضيات والفيزياء",
      desc: "إتقان قوانين الرياضيات والفيزياء لتحضير البكالوريا، مع حل مسائل تطبيقية واختبارات تجريبية لقياس المستوى وتعزيز الفهم.",
      tags: ["الحساب والجبر", "الفيزياء التطبيقية", "تمارين البكالوريا"],
    },
    {
      num: "02",
      title: "اللغة الإنجليزية",
      desc: "تعلم الإنجليزية بأسلوب عصري يجمع بين المحادثة والكتابة والقراءة، مع تمارين يومية ومحاكاة مواقف حقيقية لاكتساب الطلاقة.",
      tags: ["محادثة يومية", "الكتابة الأكاديمية", "القراءة المعمّقة"],
    },
    {
      num: "03",
      title: "الروبوتيك والبرمجة",
      desc: "جلسات عملية مبتكرة للأطفال لبناء الروبوتات وتعلم مبادئ البرمجة، تنمّي الإبداع والتفكير المنطقي والحل الإبداعي للمشكلات.",
      tags: ["تجميع الروبوتات", "Scratch / Python", "مشاريع عملية"],
    },
    {
      num: "04",
      title: "مهارات التعلم والمذاكرة",
      desc: "تقنيات علمية لتحسين التركيز والاستيعاب وتنظيم وقت المذاكرة، مع أساليب للتخلص من التوتر وبناء ثقة الطالب بنفسه.",
      tags: ["إدارة الوقت", "تقنيات الحفظ", "التركيز العميق"],
    },
  ];

  return (
    <section id="curriculum" className="bg-slate-50">
      {/* Red header banner */}
      <div className="bg-primary py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              تعليم وتقنية
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              برنامجنا الدراسي
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              منهج تعليمي متكامل يجمع بين الأكاديمية والتطبيق العملي، مصمم لتحقيق أعلى مستويات التفوق لأبنائكم.
            </p>
          </motion.div>
        </div>

        {/* Stats cards — overlapping the white area below */}
        <div className="container mx-auto mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-xl px-5 py-5 text-center shadow-lg border border-slate-100">
                  <div className="text-lg md:text-xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Curriculum content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ماذا ستتعلم؟</h3>
          <p className="text-muted-foreground">تقنيات علمية مُثبتة لتحرير الطاقة الكاملة لعقلك</p>
        </motion.div>

        <div className="space-y-4">
          {topics.map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Number + Title side */}
                <div className="bg-primary/5 md:w-64 flex-shrink-0 px-8 py-6 flex flex-col justify-center border-b md:border-b-0 md:border-l border-primary/10">
                  <span className="text-4xl font-black text-primary/20 leading-none mb-1">{topic.num}</span>
                  <h4 className="text-lg font-bold text-primary">{topic.title}</h4>
                </div>
                {/* Description side */}
                <div className="px-8 py-6 flex-1">
                  <p className="text-muted-foreground mb-4 leading-relaxed">{topic.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {topic.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
      <Courses />
      <CoursesGrid />
      <CurriculumSection />
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
