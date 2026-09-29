"use client";

import { useEffect, useState } from "react";

type LogoImageProps = {
  label: string;
  src: string;
  className?: string;
  fallbackClassName?: string;
};

// Shows the logo file, or the platform name when the file is missing.
export function LogoImage({ label, src, className = "", fallbackClassName = "" }: LogoImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    const probe = new window.Image();
    probe.onerror = () => setFailed(true);
    probe.src = src;
  }, [src]);

  if (failed) return <span className={fallbackClassName}>{label}</span>;

  return <img src={src} alt="" className={className} />;
}
