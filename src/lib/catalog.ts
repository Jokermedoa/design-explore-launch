import restaurantImg from "@/assets/tpl-restaurant.jpg";
import clinicImg from "@/assets/tpl-clinic.jpg";
import barberImg from "@/assets/tpl-barber.jpg";
import realestateImg from "@/assets/tpl-realestate.jpg";

export type Category = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
};

export const categories: Category[] = [
  { slug: "restaurants", name: "مطاعم وكافيهات", emoji: "🍽️", tagline: "منيو، حجز طاولة، فروع" },
  { slug: "clinics", name: "عيادات ومراكز طبية", emoji: "🏥", tagline: "حجز مواعيد وتخصصات" },
  { slug: "salons", name: "صالونات وباربر", emoji: "💅", tagline: "خدمات وأسعار وحجز" },
  { slug: "gyms", name: "جيم ولياقة", emoji: "🏋️", tagline: "باقات ومدربين وجدول" },
  { slug: "realestate", name: "عقارات", emoji: "🏠", tagline: "وحدات، مشروعات، استفسار" },
  { slug: "law", name: "محاماة واستشارات", emoji: "⚖️", tagline: "خدمات قانونية وحجز جلسة" },
  { slug: "tourism", name: "سياحة ورحلات", emoji: "✈️", tagline: "برامج رحلات وحجز" },
  { slug: "stores", name: "متاجر ومشاريع محلية", emoji: "🛍️", tagline: "منتجات وطلب واتساب" },
  { slug: "coaches", name: "مدربين وكوتشز", emoji: "🎯", tagline: "برامج تدريب وشهادات" },
  { slug: "photographers", name: "مصورين ومبدعين", emoji: "📸", tagline: "أعمال، معرض صور، طلب" },
];

export type Section =
  | { type: "hero"; title: string; sub: string; cta: string }
  | { type: "features"; title: string; items: { title: string; text: string }[] }
  | { type: "list"; title: string; items: { name: string; note: string; price: string }[] }
  | { type: "gallery"; title: string }
  | { type: "team"; title: string; items: { name: string; role: string }[] }
  | { type: "quote"; text: string; author: string }
  | { type: "contact"; title: string; phone: string; address: string };

export type Page = { key: string; label: string; sections: Section[] };

export type Design = {
  id: string;
  name: string;
  category: string;
  business: string;
  desc: string;
  price: number;
  accent: string;
  accent2: string;
  surface: string;
  text: string;
  muted: string;
  radius: string;
  mode: "light" | "dark";
  image: string;
  features: string[];
  pages: Page[];
};

const contact = (phone: string, address: string): Section => ({
  type: "contact",
  title: "تواصل معنا",
  phone,
  address,
});

export const designs: Design[] = [
  {
    id: "aura-resto",
    name: "أورا",
    category: "restaurants",
    business: "مطعم راقٍ",
    desc: "تصميم داكن فخم للمطاعم والكافيهات مع منيو تفاعلي",
    price: 4500,
    accent: "#c9a227",
    accent2: "#8d6b12",
    surface: "#12100c",
    text: "#f6f1e7",
    muted: "#b8ae9c",
    radius: "4px",
    mode: "dark",
    image: restaurantImg,
    features: ["منيو بالأسعار", "حجز طاولة", "معرض صور", "خرائط الفروع"],
    pages: [
      {
        key: "home",
        label: "الرئيسية",
        sections: [
          { type: "hero", title: "مطعم أورا", sub: "مأكولات عالمية بلمسة مصرية في قلب المعادي", cta: "احجز طاولتك" },
          {
            type: "features",
            title: "لماذا أورا؟",
            items: [
              { title: "مكونات طازجة", text: "نختار موردينا بعناية كل صباح" },
              { title: "شيف تنفيذي", text: "خبرة 15 عامًا في مطاعم عالمية" },
              { title: "جلسات خارجية", text: "تراس مفتوح يتسع لـ 40 ضيفًا" },
            ],
          },
          { type: "quote", text: "أفضل ستيك جربته في القاهرة.", author: "منى ع." },
        ],
      },
      {
        key: "menu",
        label: "المنيو",
        sections: [
          {
            type: "list",
            title: "الأطباق الرئيسية",
            items: [
              { name: "ستيك فيليه", note: "مع صوص الفطر", price: "٤٩٠ ج.م" },
              { name: "سلمون مشوي", note: "خضار موسمية", price: "٤٢٠ ج.م" },
              { name: "باستا ترافل", note: "كريمة وجبن بارميزان", price: "٣١٠ ج.م" },
              { name: "ريزوتو دجاج", note: "أرز إيطالي", price: "٢٨٠ ج.م" },
            ],
          },
          { type: "gallery", title: "من مطبخنا" },
        ],
      },
      {
        key: "book",
        label: "الحجز",
        sections: [
          { type: "hero", title: "احجز طاولتك", sub: "نستقبل الحجوزات يوميًا من ١٢ ظهرًا حتى ١٢ منتصف الليل", cta: "تأكيد الحجز" },
          contact("0100 000 0000", "١٥ شارع النصر، المعادي، القاهرة"),
        ],
      },
    ],
  },
  {
    id: "elite-clinic",
    name: "النخبة",
    category: "clinics",
    business: "عيادة تخصصية",
    desc: "تصميم فاتح هادئ للعيادات مع نظام حجز مواعيد",
    price: 5200,
    accent: "#1d7dd6",
    accent2: "#0b4f8a",
    surface: "#f6fafd",
    text: "#0d1b2a",
    muted: "#5c6b7a",
    radius: "16px",
    mode: "light",
    image: clinicImg,
    features: ["حجز مواعيد", "التخصصات", "فريق الأطباء", "أسئلة شائعة"],
    pages: [
      {
        key: "home",
        label: "الرئيسية",
        sections: [
          { type: "hero", title: "عيادة النخبة", sub: "رعاية طبية دقيقة بأحدث الأجهزة وفريق استشاري", cta: "احجز موعدك" },
          {
            type: "features",
            title: "تخصصاتنا",
            items: [
              { title: "الباطنة", text: "تشخيص وعلاج شامل" },
              { title: "الجلدية", text: "علاج وتجميل بالليزر" },
              { title: "الأطفال", text: "متابعة نمو وتطعيمات" },
            ],
          },
        ],
      },
      {
        key: "doctors",
        label: "الأطباء",
        sections: [
          {
            type: "team",
            title: "فريق العيادة",
            items: [
              { name: "د. أحمد فؤاد", role: "استشاري باطنة" },
              { name: "د. سارة منير", role: "أخصائية جلدية" },
              { name: "د. كريم لطفي", role: "استشاري أطفال" },
            ],
          },
          { type: "quote", text: "تعامل محترم ومواعيد دقيقة بدون انتظار.", author: "هدى ص." },
        ],
      },
      {
        key: "book",
        label: "المواعيد",
        sections: [
          {
            type: "list",
            title: "أسعار الاستشارات",
            items: [
              { name: "استشارة باطنة", note: "٣٠ دقيقة", price: "٣٠٠ ج.م" },
              { name: "استشارة جلدية", note: "٢٠ دقيقة", price: "٣٥٠ ج.م" },
              { name: "متابعة", note: "خلال أسبوعين", price: "١٥٠ ج.م" },
            ],
          },
          contact("0122 000 0000", "برج الأطباء، شارع الجامعة، الجيزة"),
        ],
      },
    ],
  },
  {
    id: "fade-barber",
    name: "فيد",
    category: "salons",
    business: "باربر شوب",
    desc: "تصميم جرافيك جسور للباربر والصالونات مع حجز سريع",
    price: 3800,
    accent: "#e0762c",
    accent2: "#7a3b12",
    surface: "#1a1512",
    text: "#fdf6ef",
    muted: "#c3ae9b",
    radius: "2px",
    mode: "dark",
    image: barberImg,
    features: ["قائمة خدمات", "حجز دور", "قبل وبعد", "مواعيد العمل"],
    pages: [
      {
        key: "home",
        label: "الرئيسية",
        sections: [
          { type: "hero", title: "FADE باربر", sum: "", sub: "حلاقة كلاسيك وحديثة على إيد محترفين", cta: "احجز دورك" } as Section,
          { type: "gallery", title: "شغلنا" },
        ],
      },
      {
        key: "services",
        label: "الخدمات",
        sections: [
          {
            type: "list",
            title: "الخدمات والأسعار",
            items: [
              { name: "حلاقة شعر", note: "٣٠ دقيقة", price: "١٢٠ ج.م" },
              { name: "تحديد ذقن", note: "١٥ دقيقة", price: "٧٠ ج.م" },
              { name: "حلاقة + ذقن", note: "٤٥ دقيقة", price: "١٧٠ ج.م" },
              { name: "عناية بالبشرة", note: "٣٠ دقيقة", price: "٢٠٠ ج.م" },
            ],
          },
        ],
      },
      {
        key: "contact",
        label: "الفرع",
        sections: [contact("0111 000 0000", "شارع ٩، المعادي، القاهرة")],
      },
    ],
  },
  {
    id: "estate-pro",
    name: "إستيت برو",
    category: "realestate",
    business: "مكتب عقاري",
    desc: "تصميم عملي لعرض الوحدات والمشروعات مع نموذج استفسار",
    price: 6400,
    accent: "#0f766e",
    accent2: "#0b4f4a",
    surface: "#f4f7f6",
    text: "#10201f",
    muted: "#5a6b69",
    radius: "10px",
    mode: "light",
    image: realestateImg,
    features: ["وحدات متاحة", "بحث وفلترة", "تفاصيل المشروع", "طلب معاينة"],
    pages: [
      {
        key: "home",
        label: "الرئيسية",
        sections: [
          { type: "hero", title: "إستيت برو", sub: "وحدات سكنية وإدارية في أفضل مواقع القاهرة الجديدة", cta: "اطلب معاينة" },
          {
            type: "features",
            title: "خدماتنا",
            items: [
              { title: "بيع وشراء", text: "وحدات موثقة بالكامل" },
              { title: "تقسيط", text: "أنظمة سداد حتى ٨ سنوات" },
              { title: "إدارة إيجارات", text: "متابعة شهرية للمالك" },
            ],
          },
        ],
      },
      {
        key: "units",
        label: "الوحدات",
        sections: [
          {
            type: "list",
            title: "متاح الآن",
            items: [
              { name: "شقة ١٤٠م", note: "التجمع الخامس - ٣ غرف", price: "٣.٢ مليون" },
              { name: "دوبلكس ٢٢٠م", note: "الشروق - حديقة خاصة", price: "٤.٨ مليون" },
              { name: "مكتب إداري ٩٠م", note: "العاصمة الإدارية", price: "٢.١ مليون" },
            ],
          },
          { type: "gallery", title: "صور المشروعات" },
        ],
      },
      {
        key: "contact",
        label: "تواصل",
        sections: [contact("0155 000 0000", "التجمع الخامس، القاهرة الجديدة")],
      },
    ],
  },
];

export const getDesign = (id: string) => designs.find((d) => d.id === id);
export const designsByCategory = (slug: string) =>
  designs.filter((d) => d.category === slug);
export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
