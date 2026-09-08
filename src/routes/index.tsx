import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { MiniSite } from "@/components/MiniSite";
import { categories, designs } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Town Media | اختر موقع نشاطك وجرّبه قبل الطلب" },
      {
        name: "description",
        content:
          "تاون ميديا: اختر نوع نشاطك، جرّب تصميمات مواقع حقيقية على الجوال والتابلت والكمبيوتر، ثم اطلب موقعك في خطوات بسيطة.",
      },
      { property: "og:title", content: "Town Media | اختر موقع نشاطك وجرّبه قبل الطلب" },
      {
        property: "og:description",
        content: "تصميمات مواقع جاهزة لكل نشاط تجاري — تتصفحها وتتفاعل معها قبل الطلب.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = designs;

  return (
    <div className="min-h-screen bg-background pb-28 text-foreground">
      <BrandHeader />

      <section className="animate-entrance px-5 pt-8">
        <h1 className="text-2xl font-bold leading-snug text-silver">
          اختر شكل موقعك،
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            جرّبه قبل ما تطلبه.
          </span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          مش صور ولا كلام. تصميمات كاملة تتصفحها بنفسك، وتشوفها على الجوال والتابلت
          والكمبيوتر.
        </p>
      </section>

      <section className="animate-entrance px-5 pt-8">
        <h2 className="mb-3 text-base font-bold">١ — نوع نشاطك</h2>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/designs/$category"
              params={{ category: c.slug }}
              className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3 ring-1 ring-white/5 transition-transform active:scale-95"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-white/5 text-lg">
                {c.emoji}
              </span>
              <span className="text-center text-[11px] font-medium leading-tight">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="animate-entrance pt-10">
        <div className="mb-4 flex items-end justify-between px-5">
          <h2 className="text-base font-bold">٢ — تصميمات حية جاهزة</h2>
          <span className="text-xs text-muted-foreground">اسحب →</span>
        </div>
        <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-5 pb-2">
          {featured.map((d) => (
            <div key={d.id} className="min-w-[270px] snap-center">
              <div className="relative h-[440px] overflow-hidden rounded-[30px] border border-white/10 bg-black ring-8 ring-card">
                <MiniSite design={d} scale={0.95} />
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold">تصميم {d.name}</h3>
                  <p className="truncate text-[11px] text-muted-foreground">{d.desc}</p>
                </div>
                <Link
                  to="/design/$designId"
                  params={{ designId: d.id }}
                  className="shrink-0 rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-bold text-primary ring-1 ring-white/10"
                >
                  افتح
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="animate-entrance px-5 pt-12">
        <h2 className="mb-3 text-base font-bold">٣ — قارن واختر</h2>
        <Link
          to="/compare"
          search={{ a: designs[0].id, b: designs[1].id }}
          className="flex items-center justify-between rounded-2xl bg-card p-4 ring-1 ring-white/5"
        >
          <div className="min-w-0">
            <div className="text-sm font-bold">مقارنة تصميمين جانب بعض</div>
            <div className="text-[11px] text-muted-foreground">
              شوف الفرق في الشكل والأقسام والسعر
            </div>
          </div>
          <span className="shrink-0 text-primary">←</span>
        </Link>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/90 px-5 pb-7 pt-4 backdrop-blur-xl">
        <Link
          to="/request"
          search={{ design: "" }}
          className="btn-brand block w-full rounded-full py-3.5 text-center text-sm"
        >
          اطلب موقعك الآن
        </Link>
      </div>
    </div>
  );
}
