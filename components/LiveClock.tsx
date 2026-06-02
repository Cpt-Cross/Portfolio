"use client";

import { useEffect, useState } from "react";

/**
 * Live local (Delhi) clock for the callsign bar. Renders a stable placeholder
 * on the server and first client paint, then ticks every second - so it never
 * triggers a hydration mismatch.
 */
export function LiveClock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());

    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums tracking-wide">{now ?? "--:--:--"}</span>;
}
