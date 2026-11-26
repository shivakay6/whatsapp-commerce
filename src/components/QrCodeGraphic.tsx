import { MessageCircle } from "lucide-react";

interface QrCodeGraphicProps {
  seed: string;
  size?: number;
}

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function isFinderCell(r: number, c: number, gridSize: number): boolean | null {
  const corners = [
    { top: 0, left: 0 },
    { top: 0, left: gridSize - 7 },
    { top: gridSize - 7, left: 0 },
  ];

  for (const corner of corners) {
    const dr = r - corner.top;
    const dc = c - corner.left;
    if (dr >= 0 && dr < 7 && dc >= 0 && dc < 7) {
      if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true;
      if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return true;
      return false;
    }
    // 1-module white separator around finder pattern
    if (dr >= -1 && dr <= 7 && dc >= -1 && dc <= 7) {
      return false;
    }
  }

  // Alignment pattern near bottom-right (around gridSize - 9 to gridSize - 5)
  const ar = r - (gridSize - 9);
  const ac = c - (gridSize - 9);
  if (ar >= 0 && ar < 5 && ac >= 0 && ac < 5) {
    if (ar === 0 || ar === 4 || ac === 0 || ac === 4) return true;
    if (ar === 2 && ac === 2) return true;
    return false;
  }

  // Timing patterns on row 6 and col 6
  if (r === 6 && c >= 8 && c <= gridSize - 9) {
    return c % 2 === 0;
  }
  if (c === 6 && r >= 8 && r <= gridSize - 9) {
    return r % 2 === 0;
  }

  return null;
}

export function QrCodeGraphic({ seed, size = 188 }: QrCodeGraphicProps) {
  const gridSize = 25;
  const cells: Array<{ r: number; c: number }> = [];
  let rng = hashString(seed);

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Leave clean center window for the WhatsApp mark
      if (r >= 10 && r <= 14 && c >= 10 && c <= 14) {
        continue;
      }
      const fixed = isFinderCell(r, c, gridSize);
      let dark = false;
      if (fixed !== null) {
        dark = fixed;
      } else {
        rng = (Math.imul(rng, 1664525) + 1013904223) >>> 0;
        dark = (rng >>> 24) % 100 < 52;
      }
      if (dark) {
        cells.push({ r, c });
      }
    }
  }

  return (
    <div
      className="relative inline-flex items-center justify-center bg-white p-3 rounded-xl border border-stone-200"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${gridSize} ${gridSize}`}
        className="w-full h-full text-[#111B21]"
        role="img"
        aria-label={`QR code for ${seed}`}
      >
        {cells.map(({ r, c }) => (
          <rect
            key={`${r}-${c}`}
            x={c}
            y={r}
            width={0.94}
            height={0.94}
            rx={0.14}
            fill="currentColor"
          />
        ))}
      </svg>

      {/* Center WhatsApp Scan Emblem */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shadow-sm ring-2 ring-white">
          <MessageCircle className="w-4 h-4 fill-current" />
        </div>
      </div>
    </div>
  );
}
