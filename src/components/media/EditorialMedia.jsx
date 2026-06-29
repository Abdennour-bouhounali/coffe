import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/cn";

const toneClasses = {
  cream: "from-[#f4eadb] via-[#e4cdae] to-[#c88354] text-ink",
  coffee: "from-[#271a15] via-[#5b3627] to-[#b46f47] text-cream",
  terracotta: "from-[#7f2f22] via-[#d85c3d] to-[#ec9f66] text-cream",
  saffron: "from-[#f0aa22] via-[#f2c74f] to-[#f7e4a9] text-ink",
  pistachio: "from-[#71885f] via-[#a8b88d] to-[#e0e3c4] text-ink",
  apricot: "from-[#d87345] via-[#edaa73] to-[#f5d6b6] text-ink",
};

export function EditorialMedia({
  src,
  alt = "",
  label,
  tone = "terracotta",
  className,
  imageClassName,
  priority = false,
}) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src) && !hasError;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-linear-to-br",
        toneClasses[tone] || toneClasses.terracotta,
        className,
      )}
    >
      {showImage ? (
        <img
          alt={alt}
          className={cn("size-full object-cover", imageClassName)}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          onError={() => setHasError(true)}
          src={src}
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute -right-[10%] -top-[12%] size-[65%] rounded-full border border-current/15"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-[18%] -left-[8%] size-[60%] rounded-full bg-current/8 blur-sm"
          />
          <div
            aria-hidden="true"
            className="absolute left-[18%] top-[12%] h-[76%] w-[46%] rotate-8 rounded-[45%_45%_38%_38%] border border-current/15 bg-white/8"
          />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-xs font-semibold uppercase tracking-[0.12em] opacity-70">
            <span>{label || alt || "Maison Saha"}</span>
            <ImageIcon aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </div>
        </>
      )}
    </div>
  );
}
