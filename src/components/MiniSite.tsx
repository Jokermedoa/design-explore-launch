import { useState } from "react";
import type { Design, Section } from "@/lib/catalog";

/**
 * Renders a browsable miniature website for a given design template.
 * Colors come from the template data (each template is its own brand),
 * not from the Town Media design system.
 */
export function MiniSite({ design, scale = 1 }: { design: Design; scale?: number }) {
  const [pageKey, setPageKey] = useState(design.pages[0].key);
  const page = design.pages.find((p) => p.key === pageKey) ?? design.pages[0];
  const dim = design.mode === "dark";

  return (
    <div
      dir="rtl"
      className="h-full w-full overflow-y-auto"
      style={{
        background: design.surface,
        color: design.text,
        fontSize: `${14 * scale}px`,
        lineHeight: 1.6,
      }}
    >
      {/* template nav */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between gap-2 px-3 py-2 backdrop-blur"
        style={{
          background: dim ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.8)",
          borderBottom: `1px solid ${design.muted}33`,
        }}
      >
        <span className="font-bold" style={{ fontSize: "0.95em", color: design.accent }}>
          {design.business}
        </span>
        <div className="flex gap-1">
          {design.pages.map((p) => (
            <button
              key={p.key}
              onClick={() => setPageKey(p.key)}
              className="px-2 py-1 transition-colors"
              style={{
                fontSize: "0.62em",
                borderRadius: design.radius,
                background: p.key === pageKey ? design.accent : "transparent",
                color: p.key === pageKey ? design.surface : design.muted,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-3 pb-8">
        {page.sections.map((s, i) => (
          <SectionView key={i} section={s} design={design} />
        ))}
        <div
          className="pt-3 text-center"
          style={{ fontSize: "0.6em", color: design.muted, borderTop: `1px solid ${design.muted}22` }}
        >
          © {design.business} — جميع الحقوق محفوظة
        </div>
      </div>
    </div>
  );
}

function SectionView({ section, design }: { section: Section; design: Design }) {
  const card = {
    borderRadius: design.radius,
    background: design.mode === "dark" ? "rgba(255,255,255,0.05)" : "#ffffff",
    border: `1px solid ${design.muted}2b`,
  };

  switch (section.type) {
    case "hero":
      return (
        <div className="overflow-hidden" style={{ borderRadius: design.radius }}>
          <div className="relative">
            <img
              src={design.image}
              alt={section.title}
              width={1024}
              height={768}
              className="h-32 w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${design.surface}, transparent)` }}
            />
          </div>
          <div className="-mt-6 relative px-1">
            <h1 className="font-bold" style={{ fontSize: "1.4em" }}>
              {section.title}
            </h1>
            <p className="mt-1" style={{ fontSize: "0.75em", color: design.muted }}>
              {section.sub}
            </p>
            <button
              className="mt-3 px-4 py-2 font-bold"
              style={{
                fontSize: "0.7em",
                borderRadius: design.radius,
                background: `linear-gradient(90deg, ${design.accent}, ${design.accent2})`,
                color: design.mode === "dark" ? "#fff" : "#fff",
              }}
            >
              {section.cta}
            </button>
          </div>
        </div>
      );
    case "features":
      return (
        <div>
          <h2 className="mb-2 font-bold" style={{ fontSize: "0.95em" }}>
            {section.title}
          </h2>
          <div className="grid gap-2">
            {section.items.map((it) => (
              <div key={it.title} className="p-3" style={card}>
                <div className="font-bold" style={{ fontSize: "0.78em", color: design.accent }}>
                  {it.title}
                </div>
                <div style={{ fontSize: "0.68em", color: design.muted }}>{it.text}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "list":
      return (
        <div>
          <h2 className="mb-2 font-bold" style={{ fontSize: "0.95em" }}>
            {section.title}
          </h2>
          <div style={card} className="divide-y">
            {section.items.map((it) => (
              <div
                key={it.name}
                className="flex items-center justify-between gap-2 p-2.5"
                style={{ borderColor: `${design.muted}22` }}
              >
                <div className="min-w-0">
                  <div className="truncate font-bold" style={{ fontSize: "0.75em" }}>
                    {it.name}
                  </div>
                  <div style={{ fontSize: "0.65em", color: design.muted }}>{it.note}</div>
                </div>
                <div className="shrink-0 font-bold" style={{ fontSize: "0.72em", color: design.accent }}>
                  {it.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "gallery":
      return (
        <div>
          <h2 className="mb-2 font-bold" style={{ fontSize: "0.95em" }}>
            {section.title}
          </h2>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <img
                key={n}
                src={design.image}
                alt={`${design.business} ${n + 1}`}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-square w-full object-cover"
                style={{ borderRadius: design.radius, opacity: 0.65 + (n % 3) * 0.15 }}
              />
            ))}
          </div>
        </div>
      );
    case "team":
      return (
        <div>
          <h2 className="mb-2 font-bold" style={{ fontSize: "0.95em" }}>
            {section.title}
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {section.items.map((m) => (
              <div key={m.name} className="p-2 text-center" style={card}>
                <div
                  className="mx-auto mb-1 grid size-8 place-items-center rounded-full font-bold"
                  style={{ background: `${design.accent}22`, color: design.accent, fontSize: "0.7em" }}
                >
                  {m.name.slice(3, 5)}
                </div>
                <div className="font-bold" style={{ fontSize: "0.62em" }}>
                  {m.name}
                </div>
                <div style={{ fontSize: "0.55em", color: design.muted }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "quote":
      return (
        <div className="p-3" style={card}>
          <p style={{ fontSize: "0.8em" }}>“{section.text}”</p>
          <div className="mt-1" style={{ fontSize: "0.62em", color: design.muted }}>
            {section.author}
          </div>
        </div>
      );
    case "contact":
      return (
        <div className="p-3" style={card}>
          <h2 className="mb-2 font-bold" style={{ fontSize: "0.9em" }}>
            {section.title}
          </h2>
          <div className="space-y-1" style={{ fontSize: "0.7em", color: design.muted }}>
            <div>هاتف: {section.phone}</div>
            <div>العنوان: {section.address}</div>
          </div>
          <div className="mt-3 space-y-2">
            <div
              className="px-2 py-2"
              style={{ fontSize: "0.65em", color: design.muted, borderRadius: design.radius, border: `1px solid ${design.muted}33` }}
            >
              اسمك
            </div>
            <div
              className="px-2 py-2"
              style={{ fontSize: "0.65em", color: design.muted, borderRadius: design.radius, border: `1px solid ${design.muted}33` }}
            >
              رسالتك
            </div>
            <button
              className="w-full py-2 font-bold text-white"
              style={{ fontSize: "0.7em", borderRadius: design.radius, background: design.accent }}
            >
              إرسال
            </button>
          </div>
        </div>
      );
  }
}
