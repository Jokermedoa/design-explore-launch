import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { MiniSite } from "@/components/MiniSite";
import { DeviceFrame, DeviceSwitch, type DeviceKind } from "@/components/DeviceFrame";
import { designs, getDesign } from "@/lib/catalog";

export const Route = createFileRoute("/design/$designId")({
  head: () => ({
    meta: [
      { title: "تجربة التصميم مباشرة | Town Media" },
      {
        name: "description",
        content:
          "تصفح صفحات التصميم، بدّل بين شكل الجوال والتابلت والكمبيوتر، وشاهد أقسام الموقع قبل أن تطلبه.",
      },
      { property: "og:title", content: "تجربة التصميم مباشرة | Town Media" },
      {
        property: "og:description",
        content: "افتح التصميم وتنقّل بين صفحاته كأنه موقعك المنشور.",
      },
    ],
  }),
  loader: ({ params }) => {
    const design = getDesign(params.designId);
    if (!design) throw notFound();
    return { design };
  },
  component: DesignPage,
});

function DesignPage() {
  const { design } = Route.useLoaderData();
  const [device, setDevice] = useState<DeviceKind>("phone");
  const other = designs.find((d) => d.id !== design.id) ?? designs[0];

  return (
    <div className="min-h-screen bg-background pb-32 text-foreground">
      <BrandHeader
        back={{ to: "/designs/" + design.category, label: "التصميمات" }}
      />

      <section className="animate-entrance px-5 pt-6">
        <h1 className="text-xl font-bold">تصميم {design.name}</h1>
        <p className="mt-1 text-[12px] text-muted-foreground">{design.desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {design.features.map((f) => (
            <span
              key={f}
              className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-muted-foreground ring-1 ring-white/10"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      <section className="animate-entrance mt-6 px-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-muted-foreground">شاهده على</span>
          <DeviceSwitch value={device} onChange={setDevice} />
        </div>

        <div className="mt-5 flex justify-center">
          <DeviceFrame device={device}>
            <MiniSite design={design} scale={device === "desktop" ? 0.7 : 1} />
          </DeviceFrame>
        </div>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          تنقّل بين صفحات الموقع من داخل الشاشة نفسها
        </p>
      </section>

      <section className="animate-entrance mt-10 px-5">
        <div className="rounded-2xl bg-card p-4 ring-1 ring-white/5">
          <h2 className="text-sm font-bold">صفحات هذا التصميم</h2>
          <div className="mt-3 space-y-2">
            {design.pages.map((p, i) => (
              <div
                key={p.key}
                className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5"
              >
                <span className="text-xs font-medium">
                  {i + 1}. {p.label}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {p.sections.length} أقسام
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link
          to="/compare"
          search={{ a: design.id, b: other.id }}
          className="mt-4 flex items-center justify-between rounded-2xl bg-card p-4 ring-1 ring-white/5"
        >
          <span className="text-sm font-bold">قارنه بتصميم آخر</span>
          <span className="text-primary">←</span>
        </Link>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-white/10 bg-background/90 px-5 pb-7 pt-4 backdrop-blur-xl">
        <div className="min-w-0">
          <div className="text-[10px] leading-none text-muted-foreground">
            التكلفة التقديرية
          </div>
          <div className="text-lg font-bold">
            {design.price.toLocaleString("ar-EG")} ج.م
          </div>
        </div>
        <Link
          to="/request"
          search={{ design: design.id }}
          className="btn-brand shrink-0 rounded-full px-6 py-3 text-sm"
        >
          اطلب هذا التصميم
        </Link>
      </div>
    </div>
  );
}
