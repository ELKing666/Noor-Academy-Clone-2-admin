-- ============================================================
-- نور أكاديمي — Supabase Setup Script
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. CREATE TABLES

create table if not exists courses (
  id text primary key,
  title text not null,
  description text not null default '',
  price text not null default '',
  duration text not null default '',
  image_url text not null default '',
  icon text not null default '📚',
  category text not null default 'adults',
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists students (
  id serial primary key,
  name varchar(255) not null,
  phone varchar(50) not null,
  course varchar(255) not null,
  payment_method varchar(100) not null,
  status varchar(50) not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists course_pricing (
  course_slug text primary key,
  price text not null,
  price_note text not null,
  updated_at timestamptz not null default now()
);

create table if not exists faq_items (
  id text primary key,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists contact_info (
  id text primary key default 'main',
  phone text not null,
  email text not null,
  address text not null,
  updated_at timestamptz not null default now()
);

-- 2. DISABLE ROW LEVEL SECURITY (allow anonymous read/write via anon key)

alter table courses disable row level security;
alter table students disable row level security;
alter table course_pricing disable row level security;
alter table faq_items disable row level security;
alter table contact_info disable row level security;

-- 3. SEED DEFAULT DATA

insert into courses (id, title, description, price, duration, icon, category, is_featured, sort_order)
values
  ('bac', 'تحضير البكالوريا',
   'منهج شامل ودقيق في الرياضيات والفيزياء والعلوم الطبيعية، مع متابعة فردية لكل طالب لضمان أعلى نتيجة ممكنة في امتحان البكالوريا.',
   '6,000 د.ج / شهرياً', '6 ساعة/أسبوع', '📚', 'adults', false, 0),
  ('english', 'اللغة الإنجليزية',
   'برنامج متكامل لتعلم اللغة الإنجليزية من الصفر إلى الاحتراف — محادثة وكتابة وقراءة وقواعد، لجميع المستويات والأعمار.',
   '4,500 د.ج / شهرياً', '4 ساعة/أسبوع', '🌍', 'adults', true, 1),
  ('robotics', 'الروبوتيك للأطفال',
   'دورة ممتعة وتفاعلية في البرمجة والروبوتيك مصممة خصيصاً للأطفال — تبني التفكير المنطقي وتفتح أبواب المستقبل التكنولوجي.',
   '5,000 د.ج / شهرياً', '3 ساعات/أسبوع', '🤖', 'kids', false, 2)
on conflict (id) do nothing;

insert into course_pricing (course_slug, price, price_note)
values
  ('bac', '6,000 د.ج / شهرياً',
   'يشمل السعر جميع المواد الثلاث — 6 ساعات أسبوعياً لمدة شهر كامل.'),
  ('english', '4,500 د.ج / شهرياً',
   '4 ساعات أسبوعياً — يشمل المواد التعليمية ووصولاً لمكتبة رقمية.'),
  ('robotics', '5,000 د.ج / شهرياً',
   '3 ساعات أسبوعياً — يشمل جميع مواد ومكونات الروبوت.')
on conflict (course_slug) do nothing;

insert into faq_items (id, question, answer, sort_order)
values
  ('1', 'كيف يمكنني التسجيل في الدورات؟',
   'يمكنك التسجيل بسهولة عبر تعبئة النموذج الإلكتروني الموجود في أسفل الصفحة، وسيقوم فريقنا بالتواصل معك لتأكيد التسجيل.', 0),
  ('2', 'ما هي أوقات الدراسة؟',
   'نوفر جداول مرنة تناسب جميع الطلاب، بما في ذلك فترات مسائية وعطلات نهاية الأسبوع.', 1),
  ('3', 'ما هي الفئة العمرية لدورة الروبوتيك؟',
   'دورة الروبوتيك مصممة خصيصاً للأطفال واليافعين الذين تتراوح أعمارهم بين 8 و 14 سنة.', 2),
  ('4', 'ما هي طرق الدفع المتاحة؟',
   'نقبل الدفع نقداً في مقر الأكاديمية، أو عبر التحويل البريدي (CCP).', 3),
  ('5', 'هل تقدمون شهادات بعد إتمام الدورات؟',
   'نعم، نقدم شهادات مشاركة معتمدة من الأكاديمية بعد إتمام دورات اللغات والروبوتيك.', 4)
on conflict (id) do nothing;

insert into contact_info (id, phone, email, address)
values ('main', '0555 12 34 56', 'contact@nour-academy.dz', 'حي 500 مسكن، شلف، الجزائر')
on conflict (id) do nothing;
