import { useEffect, useState } from 'react';

/**
 * Anima un valor tipo "15+" desde 0 hasta su número cuando `start` es true.
 * Conserva prefijo/sufijo no numéricos.
 */
export function useCountUp(value: string, start: boolean, duration = 1400) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? '';
  const target = match ? Number(match[2]) : 0;
  const suffix = match?.[3] ?? '';
  const isNumeric = match !== null;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start || !isNumeric) return;
    let frame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, isNumeric, target, duration]);

  if (!isNumeric) return value;
  return `${prefix}${current}${suffix}`;
}
