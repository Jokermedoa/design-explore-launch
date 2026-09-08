import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { MiniSite } from "@/components/MiniSite";
import { designsByCategory, getCategory, designs } from "@/lib/catalog";

export const Route = createFileRoute("/designs/$category")({
  head: () => ({
    meta: [
      { title: "تصميمات مناسبة لنشاطك | Town Media" },
      {
        name: "description",
        content:
          "استعرض التصميمات الجاهزة المناسبة لنوع نشاطك، وافتح أي تصميم لتجربته صفحة بصفحة قبل الطلب.",
      },
      { property: "og:title", content: "تصميمات مناسبة لنشاطك | Town Media" },
      {
        property: "og:description",
        content: "تصميمات حية قابلة للتصفح لكل نوع نشاط تجاري.",
      },
    ],
  }),
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const list = designsByCategory(category.slug);

  return (
    <div className="min-h-screen bg-background pb-28 text-foreground">
      <BrandHeader back={{ to: "/", label: "الأنشطة" }} />

      <section className="animate-entrance px-5 pt-6">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/5 text-xl">
            {category.emoji}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold">{category.name}</h1>
            <p className="truncate text-[11px] text-muted-foreground">{category.tagline}</p>
          </div>
        </div>
      </section>

      <section className="animate-entrance space-y-8 px-5 pt-8">
        {list.length === 0 && (
          <div className="rounded-2xl bg-card p-5 ring-1 ring-white/5">
            <p className="text-sm font-bold">التصميمات الخاصة بهذا النشاط تحت التحضير.</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              يمكنك تجربة التصميمات الجاهزة الحالية، أو إرسال طلبك ونجهز لك مقترحات مناسبة.
            </p>
            <Link
              to="/request"
              search={{ design: "" }}
              className="btn-brand mt-4 inline-block rounded-full px-5 py-2.5 text-xs"
            >
              أرسل طلبك
            </Link>
          </div>
        )}

        {list.map((d) => (
          <div key={d.id}>
            <div className="relative h-[430px] overflow-hidden rounded-[30px] border border-white/10 bg-black ring-8 ring-card">
              <MiniSite design={d} scale={0.95} />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-base font-bold">تصميم {d.name}</h3>
                <p className="text-[11px] text-muted-foreground">{d.desc}</p>
              </div>
              <span className="shrink-0 text-sm font-bold text-primary">
                {d.price.toLocaleString("ar-EG")} ج.م
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                to="/design/$designId"
                params={{ designId: d.id }}
                className="flex-1 rounded-xl bg-white/5 py-3 text-center text-xs font-bold ring-1 ring-white/10"
              >
                تجربة كاملة
              </Link>
              <Link
                to="/request"
                search={{ design: d.id }}
                className="btn-brand flex-1 rounded-xl py-3 text-center text-xs"
              >
                اطلب هذا التصميم
              </Link>
            </div>
          </div>
        ))}
      </section>

      {list.length > 1 && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/90 px-5 pb-7 pt-4 backdrop-blur-xl">
          <Link
            to="/compare"
            search={{ a: list[0].id, b: (list[1] ?? designs[1]).id }}
            className="block w-full rounded-full bg-card py-3.5 text-center text-sm font-bold ring-1 ring-white/10"
          >
            قارن بين تصميمين
          </Link>
        </div>
      )}
    </div>
  );
}
