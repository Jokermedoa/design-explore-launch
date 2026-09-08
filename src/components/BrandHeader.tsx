import { Link } from "@tanstack/react-router";

export function BrandHeader({ back }: { back?: { to: string; label: string } }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-white/5 bg-background/80 px-5 py-4 backdrop-blur-md">
      <Link to="/" className="min-w-0">
        <span className="bg-gradient-to-r from-silver via-primary to-accent bg-clip-text text-lg font-bold tracking-wide text-transparent">
          TOWN MEDIA
        </span>
      </Link>
      {back ? (
        <Link
          to={back.to}
          className="shrink-0 rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-medium text-muted-foreground ring-1 ring-white/10"
        >
          {back.label} ←
        </Link>
      ) : (
        <span className="shrink-0 rounded-full bg-white/5 px-3 py-1.5 text-[11px] text-muted-foreground ring-1 ring-white/10">
          وكيل تصميم المواقع
        </span>
      )}
    </header>
  );
}
