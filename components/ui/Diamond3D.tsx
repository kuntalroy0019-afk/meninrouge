"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import RotatingDiamond from "./RotatingDiamond";

// The whole Three.js scene is code-split and never loaded on the server, so it
// adds nothing to the initial bundle / SSR. Falls back to the SVG while loading.
const Scene = dynamic(() => import("./Diamond3DScene"), {
  ssr: false,
  loading: () => <RotatingDiamond size={150} className="opacity-80" />,
});

function canRun3D() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Skip only genuinely weak devices (very low RAM) — phones now run the
  // lighter "lite" pipeline instead of falling back to the SVG.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mem = (navigator as any).deviceMemory;
  if (typeof mem === "number" && mem < 3) return false;
  // WebGL must actually be available
  try {
    const c = document.createElement("canvas");
    const gl =
      c.getContext("webgl2") ||
      c.getContext("webgl") ||
      c.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

// Mobile / touch / lower-RAM → run the gem at reduced quality for smoothness.
function isLiteDevice() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mem = (navigator as any).deviceMemory;
  if (typeof mem === "number" && mem < 6) return true;
  return false;
}

export default function Diamond3D({
  className = "",
  fallbackSize = 150,
}: {
  className?: string;
  fallbackSize?: number;
}) {
  const [use3D, setUse3D] = useState(false);
  const [lite, setLite] = useState(true);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUse3D(canRun3D());
    setLite(isLiteDevice());
  }, []);

  useEffect(() => {
    if (!use3D) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);

    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [use3D]);

  return (
    <div ref={ref} className={`grid place-items-center ${className}`}>
      {use3D ? (
        <Scene paused={!visible} lite={lite} />
      ) : (
        <RotatingDiamond size={fallbackSize} className="animate-floaty" />
      )}
    </div>
  );
}
