import React, { useState, useEffect } from "react";
import { useAdminContent, useUpdateSiteContent, DEFAULT_CONTENT } from "@/hooks/use-site-content";
import type { SiteContent, FaqItem } from "@/hooks/use-site-content";
import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
} from "@/hooks/use-courses";
import type { Course, CourseInput } from "@/hooks/use-courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SESSION_KEY = "admin_password";

function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, password);
        onLogin(password);
      } else {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error || "كلمة المرور غير صحيحة");
      }
    } catch {
      setError("تعذّر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50"
      dir="rtl"
    >
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <div className="text-3xl font-bold mb-1">
            <span className="text-[#c0001a]">نور</span>{" "}
            <span className="text-amber-500">أكاديمي</span>
          </div>
          <CardTitle className="text-lg text-gray-700">لوحة التحكم</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة مرور المشرف"
                className="h-11"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#c0001a] hover:bg-[#a0001a] text-white font-bold h-11"
            >
              {loading ? "جارٍ التحقق..." : "دخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function PricingTab({
  content,
  onChange,
}: {
  content: SiteContent;
  onChange: (c: SiteContent) => void;
}) {
  const courses: { key: "bac" | "english" | "robotics"; label: string }[] = [
    { key: "bac", label: "تحضير البكالوريا" },
    { key: "english", label: "اللغة الإنجليزية" },
    { key: "robotics", label: "الروبوتيك للأطفال" },
  ];

  return (
    <div className="space-y-6">
      {courses.map(({ key, label }) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle className="text-base text-[#c0001a]">{label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السعر
              </label>
              <Input
                value={content.pricing[key].price}
                onChange={(e) =>
                  onChange({
                    ...content,
                    pricing: {
                      ...content.pricing,
                      [key]: { ...content.pricing[key], price: e.target.value },
                    },
                  })
                }
                placeholder="مثال: 6,000 د.ج / شهرياً"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ملاحظة السعر
              </label>
              <Input
                value={content.pricing[key].priceNote}
                onChange={(e) =>
                  onChange({
                    ...content,
                    pricing: {
                      ...content.pricing,
                      [key]: {
                        ...content.pricing[key],
                        priceNote: e.target.value,
                      },
                    },
                  })
                }
                placeholder="تفاصيل إضافية عن السعر"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FaqTab({
  content,
  onChange,
}: {
  content: SiteContent;
  onChange: (c: SiteContent) => void;
}) {
  function updateItem(index: number, field: keyof FaqItem, value: string) {
    const newFaq = content.faq.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange({ ...content, faq: newFaq });
  }

  function addItem() {
    const newId = String(Date.now());
    onChange({
      ...content,
      faq: [...content.faq, { id: newId, question: "", answer: "" }],
    });
  }

  function removeItem(index: number) {
    onChange({
      ...content,
      faq: content.faq.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-4">
      {content.faq.map((item, index) => (
        <Card key={item.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-500">
                سؤال {index + 1}
              </span>
              <button
                onClick={() => removeItem(index)}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                حذف
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السؤال
              </label>
              <Input
                value={item.question}
                onChange={(e) => updateItem(index, "question", e.target.value)}
                placeholder="أدخل السؤال"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الجواب
              </label>
              <textarea
                value={item.answer}
                onChange={(e) => updateItem(index, "answer", e.target.value)}
                placeholder="أدخل الجواب"
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addItem}
        className="w-full border-dashed border-2 border-gray-300 text-gray-600 hover:border-[#c0001a] hover:text-[#c0001a]"
      >
        + إضافة سؤال جديد
      </Button>
    </div>
  );
}

function ContactTab({
  content,
  onChange,
}: {
  content: SiteContent;
  onChange: (c: SiteContent) => void;
}) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            رقم الهاتف
          </label>
          <Input
            value={content.contact.phone}
            onChange={(e) =>
              onChange({
                ...content,
                contact: { ...content.contact, phone: e.target.value },
              })
            }
            placeholder="0555 12 34 56"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            البريد الإلكتروني
          </label>
          <Input
            value={content.contact.email}
            onChange={(e) =>
              onChange({
                ...content,
                contact: { ...content.contact, email: e.target.value },
              })
            }
            placeholder="contact@nour-academy.dz"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            العنوان
          </label>
          <Input
            value={content.contact.address}
            onChange={(e) =>
              onChange({
                ...content,
                contact: { ...content.contact, address: e.target.value },
              })
            }
            placeholder="حي 500 مسكن، شلف، الجزائر"
          />
        </div>
      </CardContent>
    </Card>
  );
}

type Tab = "messages" | "faq" | "contact" | "courses";

const TABS: { id: Tab; label: string }[] = [
  { id: "messages", label: "الرسائل" },
  { id: "faq", label: "الأسئلة الشائعة" },
  { id: "contact", label: "التواصل" },
  { id: "courses", label: "الدورات" },
];

interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  message: string;
  created_at: string;
}

function MessagesTab({ password }: { password: string }) {
  const [messages, setMessages] = React.useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
    fetch(`${base}/api/admin/messages`, {
      headers: { Authorization: `Bearer ${password}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("فشل تحميل الرسائل");
        return r.json();
      })
      .then((data) => setMessages(data as ContactMessage[]))
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [password]);

  if (isLoading) {
    return <p className="text-gray-400 text-center py-8">جارٍ التحميل...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center py-8">{error}</p>;
  }
  if (messages.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="text-5xl mb-3">📭</div>
        <p className="font-medium">لا توجد رسائل حتى الآن</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 mb-2">{messages.length} رسالة</p>
      {messages.map((msg) => (
        <Card key={msg.id}>
          <CardContent className="pt-4 pb-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-gray-900">{msg.name}</p>
                <p className="text-sm text-gray-500 dir-ltr" dir="ltr">{msg.phone}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0 mt-1">
                {new Date(msg.created_at).toLocaleDateString("ar-DZ", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-gray-700 text-sm bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">
              {msg.message}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const EMPTY_COURSE: CourseInput = {
  id: "",
  title: "",
  description: "",
  price: "",
  duration: "",
  image_url: "",
  icon: "📚",
  category: "adults",
  is_featured: false,
  sort_order: 0,
};

function CourseFormModal({
  initial,
  onSubmit,
  onClose,
  isPending,
  error,
}: {
  initial: CourseInput;
  onSubmit: (course: CourseInput) => void;
  onClose: () => void;
  isPending: boolean;
  error?: string;
}) {
  const [form, setForm] = useState<CourseInput>(initial);
  const isNew = !initial.id;

  function field<K extends keyof CourseInput>(key: K, val: CourseInput[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function generateId(title: string) {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")
      .slice(0, 40);
  }

  function handleTitleChange(val: string) {
    field("title", val);
    if (isNew) field("id", generateId(val));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">
            {isNew ? "إضافة دورة جديدة" : "تعديل الدورة"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="px-6 py-4 space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم الدورة *
              </label>
              <Input
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="مثال: اللغة الفرنسية"
              />
            </div>
            {isNew && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المعرف (رابط الدورة) *
                </label>
                <Input
                  required
                  value={form.id}
                  onChange={(e) => field("id", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  placeholder="مثال: french"
                  dir="ltr"
                />
              </div>
            )}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوصف
              </label>
              <textarea
                value={form.description}
                onChange={(e) => field("description", e.target.value)}
                rows={3}
                placeholder="وصف مختصر للدورة"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السعر
              </label>
              <Input
                value={form.price}
                onChange={(e) => field("price", e.target.value)}
                placeholder="5,000 د.ج / شهرياً"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المدة
              </label>
              <Input
                value={form.duration}
                onChange={(e) => field("duration", e.target.value)}
                placeholder="4 ساعة/أسبوع"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الرمز (Emoji)
              </label>
              <Input
                value={form.icon}
                onChange={(e) => field("icon", e.target.value)}
                placeholder="📚"
                className="text-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الفئة
              </label>
              <select
                value={form.category}
                onChange={(e) => field("category", e.target.value as "adults" | "kids")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-10"
              >
                <option value="adults">الكبار</option>
                <option value="kids">الأطفال</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الترتيب
              </label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => field("sort_order", Number(e.target.value))}
                min={0}
              />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="is_featured"
                checked={form.is_featured}
                onChange={(e) => field("is_featured", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#c0001a]"
              />
              <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
                الأكثر طلباً (مميزة)
              </label>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط الصورة (اختياري)
              </label>
              <Input
                value={form.image_url}
                onChange={(e) => field("image_url", e.target.value)}
                placeholder="https://..."
                dir="ltr"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-[#c0001a] hover:bg-[#a0001a] text-white font-bold"
            >
              {isPending ? "جارٍ الحفظ..." : isNew ? "إضافة الدورة" : "حفظ التغييرات"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              إلغاء
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CoursesTab({ password }: { password: string }) {
  const { data: courses, isLoading, isError } = useCourses();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const { toast } = useToast();

  const [modal, setModal] = useState<
    | { mode: "create" }
    | { mode: "edit"; course: Course }
    | null
  >(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [mutError, setMutError] = useState("");

  const isPending =
    createCourse.isPending || updateCourse.isPending || deleteCourse.isPending;

  function handleSubmit(course: CourseInput) {
    setMutError("");
    if (modal?.mode === "create") {
      createCourse.mutate(
        { password, course },
        {
          onSuccess: () => {
            setModal(null);
            toast({ title: "تمت إضافة الدورة" });
          },
          onError: (err) => setMutError(err.message),
        },
      );
    } else if (modal?.mode === "edit") {
      const editModal = modal as { mode: "edit"; course: Course };
      const { id: _id, ...rest } = course;
      updateCourse.mutate(
        { password, id: editModal.course.id, course: rest },
        {
          onSuccess: () => {
            setModal(null);
            toast({ title: "تم تحديث الدورة" });
          },
          onError: (err) => setMutError(err.message),
        },
      );
    }
  }

  function handleDelete(id: string) {
    deleteCourse.mutate(
      { password, id },
      {
        onSuccess: () => {
          setDeleteId(null);
          toast({ title: "تم حذف الدورة" });
        },
        onError: (err) => {
          toast({ title: "فشل الحذف", description: err.message, variant: "destructive" });
        },
      },
    );
  }

  if (isLoading) {
    return <p className="text-gray-400 text-center py-8">جارٍ التحميل...</p>;
  }
  if (isError) {
    return (
      <p className="text-red-500 text-center py-8">تعذّر تحميل الدورات</p>
    );
  }

  const adults = (courses ?? []).filter((c) => c.category === "adults");
  const kids = (courses ?? []).filter((c) => c.category === "kids");

  function CourseRow({ course }: { course: Course }) {
    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0">{course.icon}</span>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {course.title}
              {course.is_featured && (
                <span className="mr-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  الأكثر طلباً
                </span>
              )}
            </p>
            <p className="text-xs text-gray-400 truncate">{course.price}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => { setMutError(""); setModal({ mode: "edit", course }); }}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            تعديل
          </button>
          <button
            onClick={() => setDeleteId(course.id)}
            className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            حذف
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {(courses ?? []).length} دورة مسجّلة
        </p>
        <Button
          onClick={() => { setMutError(""); setModal({ mode: "create" }); }}
          className="bg-[#c0001a] hover:bg-[#a0001a] text-white text-sm font-bold"
        >
          + إضافة دورة
        </Button>
      </div>

      {adults.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#c0001a]">الكبار</CardTitle>
          </CardHeader>
          <CardContent>
            {adults.map((c) => (
              <CourseRow key={c.id} course={c} />
            ))}
          </CardContent>
        </Card>
      )}

      {kids.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#c0001a]">الأطفال</CardTitle>
          </CardHeader>
          <CardContent>
            {kids.map((c) => (
              <CourseRow key={c.id} course={c} />
            ))}
          </CardContent>
        </Card>
      )}

      {(courses ?? []).length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-5xl mb-3">📚</div>
          <p>لا توجد دورات بعد. أضف دورتك الأولى!</p>
        </div>
      )}

      {modal && (
        <CourseFormModal
          initial={modal.mode === "edit" ? modal.course : EMPTY_COURSE}
          onSubmit={handleSubmit}
          onClose={() => setModal(null)}
          isPending={isPending}
          error={mutError}
        />
      )}

      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          dir="rtl"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h2 className="font-bold text-gray-900 mb-2">حذف الدورة</h2>
            <p className="text-gray-500 text-sm mb-6">
              هل أنت متأكد أنك تريد حذف هذه الدورة؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => handleDelete(deleteId)}
                disabled={deleteCourse.isPending}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {deleteCourse.isPending ? "جارٍ الحذف..." : "حذف"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminPanel({ password, onLogout }: { password: string; onLogout: () => void }) {
  const { data: remoteContent, isLoading, isError } = useAdminContent(password);
  const updateMutation = useUpdateSiteContent();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("messages");
  const [localContent, setLocalContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    if (remoteContent && !localContent) {
      setLocalContent(remoteContent);
    }
  }, [remoteContent, localContent]);

  async function handleSave() {
    if (!localContent) return;
    updateMutation.mutate(
      { password, content: localContent },
      {
        onSuccess: () => {
          toast({
            title: "تم الحفظ بنجاح",
            description: "تم تحديث محتوى الموقع.",
          });
        },
        onError: (err) => {
          toast({
            title: "فشل الحفظ",
            description: err.message || "حدث خطأ أثناء الحفظ",
            variant: "destructive",
          });
        },
      },
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" dir="rtl">
        <p className="text-red-600 font-semibold">كلمة المرور غير صحيحة أو تعذّر الاتصال بالخادم</p>
        <button
          onClick={onLogout}
          className="bg-[#c0001a] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#a0001a] transition-colors"
        >
          العودة لصفحة الدخول
        </button>
      </div>
    );
  }

  if (isLoading || !localContent) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <p className="text-gray-500">جارٍ التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-[#c0001a] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="text-xl font-bold">
            <span>نور</span>{" "}
            <span className="text-amber-300">أكاديمي</span>
          </div>
          <span className="text-white/60 text-sm">— لوحة التحكم</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-sm underline"
          >
            عرض الموقع
          </a>
          <button
            onClick={onLogout}
            className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            خروج
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 mb-6 shadow-sm gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-[#c0001a] text-white shadow"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === "messages" && (
            <MessagesTab password={password} />
          )}
          {activeTab === "faq" && (
            <FaqTab content={localContent} onChange={setLocalContent} />
          )}
          {activeTab === "contact" && (
            <ContactTab content={localContent} onChange={setLocalContent} />
          )}
          {activeTab === "courses" && (
            <CoursesTab password={password} />
          )}
        </div>

        {/* Save Button — only for tabs that use localContent */}
        {activeTab !== "courses" && activeTab !== "messages" && (
          <Button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="w-full bg-[#c0001a] hover:bg-[#a0001a] text-white font-bold h-12 text-base shadow-lg"
          >
            {updateMutation.isPending ? "جارٍ الحفظ..." : "حفظ التغييرات"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [password, setPassword] = useState<string | null>(() =>
    sessionStorage.getItem(SESSION_KEY),
  );

  function handleLogin(pw: string) {
    setPassword(pw);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setPassword(null);
  }

  if (!password) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <AdminPanel password={password} onLogout={handleLogout} />;
}
