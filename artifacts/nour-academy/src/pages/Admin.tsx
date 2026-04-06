import React, { useState, useEffect } from "react";
import { useAdminContent, useUpdateSiteContent, DEFAULT_CONTENT } from "@/hooks/use-site-content";
import type { SiteContent, FaqItem } from "@/hooks/use-site-content";
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

type Tab = "pricing" | "faq" | "contact";

const TABS: { id: Tab; label: string }[] = [
  { id: "pricing", label: "الأسعار" },
  { id: "faq", label: "الأسئلة الشائعة" },
  { id: "contact", label: "معلومات التواصل" },
];

function AdminPanel({ password, onLogout }: { password: string; onLogout: () => void }) {
  const { data: remoteContent, isLoading, isError } = useAdminContent(password);
  const updateMutation = useUpdateSiteContent();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("pricing");
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

  if (isLoading || !localContent) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <p className="text-gray-500">{isError ? "تعذّر تحميل البيانات" : "جارٍ التحميل..."}</p>
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
          {activeTab === "pricing" && (
            <PricingTab content={localContent} onChange={setLocalContent} />
          )}
          {activeTab === "faq" && (
            <FaqTab content={localContent} onChange={setLocalContent} />
          )}
          {activeTab === "contact" && (
            <ContactTab content={localContent} onChange={setLocalContent} />
          )}
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="w-full bg-[#c0001a] hover:bg-[#a0001a] text-white font-bold h-12 text-base shadow-lg"
        >
          {updateMutation.isPending ? "جارٍ الحفظ..." : "حفظ التغييرات"}
        </Button>
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
