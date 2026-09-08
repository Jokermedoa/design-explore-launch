import type { ReactNode } from "react";

export type DeviceKind = "phone" | "tablet" | "desktop";

const sizes: Record<DeviceKind, { w: number; h: number; radius: string; scale: number }> = {
  phone: { w: 300, h: 600, radius: "34px", scale: 1 },
  tablet: { w: 330, h: 460, radius: "20px", scale: 1.05 },
  desktop: { w: 340, h: 220, radius: "10px", scale: 0.85 },
};

export function DeviceFrame({
  device,
  children,
}: {
  device: DeviceKind;
  children: ReactNode;
}) {
  const s = sizes[device];
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative bg-black shadow-2xl transition-all duration-500 ease-out"
        style={{
          width: s.w,
          height: s.h,
          borderRadius: s.radius,
          padding: device === "desktop" ? 8 : 10,
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="h-full w-full overflow-hidden bg-card"
          style={{ borderRadius: device === "desktop" ? "6px" : "26px" }}
        >
          {children}
        </div>
        {device === "phone" && (
          <div className="absolute left-1/2 top-3 h-1 w-16 -translate-x-1/2 rounded-full bg-white/20" />
        )}
      </div>
      {device === "desktop" && (
        <div className="mt-0 h-3 w-24 rounded-b-xl bg-black/80 ring-1 ring-white/10" />
      )}
    </div>
  );
}

export function DeviceSwitch({
  value,
  onChange,
}: {
  value: DeviceKind;
  onChange: (d: DeviceKind) => void;
}) {
  const items: { k: DeviceKind; label: string }[] = [
    { k: "phone", label: "جوال" },
    { k: "tablet", label: "تابلت" },
    { k: "desktop", label: "كمبيوتر" },
  ];
  return (
    <div className="flex rounded-xl bg-black/40 p-1 ring-1 ring-white/10">
      {items.map((it) => (
        <button
          key={it.k}
          onClick={() => onChange(it.k)}
          className={
            "rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors " +
            (value === it.k
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground")
          }
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
