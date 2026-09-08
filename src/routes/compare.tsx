import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { MiniSite } from "@/components/MiniSite";
import { designs, getDesign } from "@/lib/catalog";

export const Route = createFileRoute("/compare")({
  validateSearch: (search: Record<string, unknown>) => ({
    a: typeof search.a === "string" ? search.a : designs[0].id,
    b: typeof search.b === "string" ? search.b : designs[1].id,
  }),
  head: () => ({
    meta: [
      { title: "قارن بين التصميمات | Town Media" },
      {
        name: "description",
        content:
          "ضع تصميمين جانب بعض، قارن الشكل والأقسام والتكلفة، واختر الأنسب لنشاطك.",
      },
      { property: "og:title", content: "قارن بين التصميمات | Town Media" },
      {
        property: "og:description",
        content: "مقارنة مباشرة بين تصميمين لاتخاذ القرار بسرعة.",
      },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { a, b } = Route.useSearch();
  const A = getDesign(a) ?? designs[0];
  const B = getDesign(b) ?? designs[1];

  return (
    <div className="min-h-screen bg-background pb-28 text-foreground">
      <BrandHeader back={{ to: "/", label: "الرئيسية" }} />

      <section className="animate-entrance px-5 pt-6">
        <h1 className="text-lg font-bold">قارن واختر</h1>
        <p className="mt-1 text-[12px] text-muted-foreground">
          اختر تصميمين من القائمة وشاهدهما جانب بعض.
        </p>
      </section>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {designs.map((d) => (
          <Link
            key={d.id}
            to="/compare"
            search={{ a: d.id, b: d.id === B.id ? A.id : B.id }}
            className={
              "shrink-0 rounded-full px-4 py-1.5 text-[11px] font-medium ring-1 " +
              (d.id === A.id
                ? "bg-primary text-primary-foreground ring-primary"
                : "bg-white/5 text-muted-foreground ring-white/10")
            }
          >
            {d.name}
          </Link>
        ))}
      </div>

      <section className="animate-entrance px-5 pt-5">
        <div className="flex gap-3">
          {[A, B].map((d, i) => (
            <div key={d.id + i} className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={
                    "grid size-5 place-items-center rounded-full text-[9px] font-bold " +
                    (i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground")
                  }
                >
                  {i === 0 ? "أ" : "ب"}
                </span>
                <span className="truncate text-xs font-bold">{d.name}</span>
              </div>
              <div className="h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-black ring-4 ring-card">
                <MiniSite design={d} scale={0.72} />
              </div>
              <div className="mt-3 space-y-1.5 text-[11px]">
                <div className="text-muted-foreground">{d.business}</div>
                <div className="font-bold text-primary">
                  {d.price.toLocaleString("ar-EG")} ج.م
                </div>
                <div className="text-muted-foreground">
                  {d.pages.length} صفحات
                </div>
                <ul className="space-y-1 pt-1">
                  {d.features.map((f) => (
                    <li key={f} className="text-muted-foreground">
                      • {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/request"
                search={{ design: d.id }}
                className="btn-brand mt-3 block rounded-xl py-2.5 text-center text-[11px]"
              >
                اختر هذا
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/90 px-5 pb-7 pt-4 backdrop-blur-xl">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {designs.map((d) => (
            <Link
              key={d.id}
              to="/compare"
              search={{ a: A.id, b: d.id }}
              className={
                "shrink-0 rounded-full px-4 py-2 text-[11px] font-medium ring-1 " +
                (d.id === B.id
                  ? "bg-accent text-accent-foreground ring-accent"
                  : "bg-white/5 text-muted-foreground ring-white/10")
              }
            >
              ب: {d.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
