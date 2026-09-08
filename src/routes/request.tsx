import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { designs, getDesign } from "@/lib/catalog";

export const Route = createFileRoute("/request")({
  validateSearch: (search: Record<string, unknown>) => ({
    design: typeof search.design === "string" ? search.design : "",
  }),
  head: () => ({
    meta: [
      { title: "تخصيص وطلب موقعك | Town Media" },
      {
        name: "description",
        content:
          "أرسل بيانات نشاطك وألوانك المفضلة، واطلب تنفيذ التصميم الذي اخترته في خطوة واحدة.",
      },
      { property: "og:title", content: "تخصيص وطلب موقعك | Town Media" },
      {
        property: "og:description",
        content: "خطوة واحدة بسيطة لطلب تنفيذ موقعك بعد اختيار التصميم.",
      },
    ],
  }),
  component: RequestPage,
});

function RequestPage() {
  const { design: designId } = Route.useSearch();
  const selected = getDesign(designId);
  const [chosen, setChosen] = useState(selected?.id ?? "");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    business: "",
    field: "",
    phone: "",
    notes: "",
  });

  const active = getDesign(chosen);
  const ready = form.business.trim() !== "" && form.phone.trim().length >= 8 && chosen !== "";

  if (sent) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <BrandHeader back={{ to: "/", label: "الرئيسية" }} />
        <div className="animate-entrance px-5 pt-16 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-2xl text-primary ring-1 ring-primary/30">
            ✓
          </div>
          <h1 className="mt-6 text-xl font-bold">تم استلام طلبك</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            سنتواصل معك على {form.phone} لتأكيد التفاصيل وبدء تنفيذ تصميم{" "}
            {active?.name}.
          </p>
          <Link
            to="/"
            className="btn-brand mt-8 inline-block rounded-full px-6 py-3 text-sm"
          >
            استعرض تصميمات أخرى
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 text-foreground">
      <BrandHeader back={{ to: "/", label: "الرئيسية" }} />

      <section className="animate-entrance px-5 pt-6">
        <h1 className="text-lg font-bold">تخصيص وطلب</h1>
        <p className="mt-1 text-[12px] text-muted-foreground">
          خطوة واحدة فقط: أكّد التصميم وأرسل بيانات نشاطك.
        </p>
      </section>

      <section className="animate-entrance px-5 pt-6">
        <h2 className="mb-2 text-xs font-bold text-muted-foreground">التصميم المختار</h2>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {designs.map((d) => (
            <button
              key={d.id}
              onClick={() => setChosen(d.id)}
              className={
                "shrink-0 rounded-2xl px-4 py-3 text-right ring-1 transition-transform active:scale-95 " +
                (d.id === chosen
                  ? "bg-primary/10 ring-primary"
                  : "bg-card ring-white/10")
              }
            >
              <div className="text-xs font-bold">{d.name}</div>
              <div className="text-[10px] text-muted-foreground">{d.business}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="animate-entrance px-5 pt-8">
        <div className="rounded-3xl bg-card p-5 ring-1 ring-white/10">
          <div className="space-y-4">
            <Field
              label="اسم النشاط"
              placeholder="مثلاً: مطعم أورا"
              value={form.business}
              onChange={(v) => setForm({ ...form, business: v })}
            />
            <Field
              label="مجال النشاط"
              placeholder="مثلاً: مطعم مأكولات بحرية"
              value={form.field}
              onChange={(v) => setForm({ ...form, field: v })}
            />
            <Field
              label="رقم التواصل (واتساب)"
              placeholder="01xxxxxxxxx"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              type="tel"
            />
            <div>
              <label className="mb-1.5 block text-[10px] tracking-wider text-muted-foreground">
                ملاحظات أو تعديلات تحبها
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="مثلاً: عايز ألوان أفتح وقسم للعروض"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-white/10 bg-background/90 px-5 pb-7 pt-4 backdrop-blur-xl">
        <div className="min-w-0">
          <div className="text-[10px] leading-none text-muted-foreground">
            التكلفة التقديرية
          </div>
          <div className="text-lg font-bold">
            {active ? `${active.price.toLocaleString("ar-EG")} ج.م` : "—"}
          </div>
        </div>
        <button
          disabled={!ready}
          onClick={() => setSent(true)}
          className="btn-brand shrink-0 rounded-full px-6 py-3 text-sm disabled:opacity-40"
        >
          إرسال الطلب
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
      />
    </div>
  );
}
