import { useState } from "react";
import { Package, QrCode, ScanLine } from "lucide-react";
import { CATALOG } from "../data/mockData";
import type { Product } from "../types/chat";
import { QrCodeGraphic } from "./QrCodeGraphic";

interface QrPackEntryProps {
  productId: string;
  onChangeProduct: (productId: string) => void;
  onLaunchWhatsApp: (productId: string) => void;
}

function PackPhoto({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full aspect-[4/3] rounded-xl bg-stone-100 flex flex-col items-center justify-center gap-2 text-stone-500">
        <Package className="w-7 h-7 text-[#008069]" />
        <span className="text-xs font-medium">{product.name}</span>
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-full aspect-[4/3] object-cover rounded-xl bg-stone-100"
    />
  );
}

export function QrPackEntry({
  productId,
  onChangeProduct,
  onLaunchWhatsApp,
}: QrPackEntryProps) {
  const product = CATALOG.find((p) => p.id === productId) ?? CATALOG[2];
  const primaryVariant = product.variants[0];
  const sweeteners = CATALOG.filter((p) => p.category === "sweetener");
  const nonSweeteners = CATALOG.filter((p) => p.category === "non-sweetener");

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
      {/* Compact Prototype Bar */}
      <div className="w-full bg-white border border-stone-200/90 rounded-xl px-4 py-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-stone-900">
            QR Code on Retail Pack
          </div>
          <div className="text-xs text-stone-500">
            Click the printed QR code on the pack to simulate scanning into WhatsApp
          </div>
        </div>

        <select
          aria-label="Scanned product pack"
          value={product.id}
          onChange={(e) => onChangeProduct(e.target.value)}
          className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#008069]"
        >
          <optgroup label="Sweeteners">
            {sweeteners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Non-sweeteners (Staples & more)">
            {nonSweeteners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Centered Realistic Retail Pack Label Mockup */}
      <div className="w-full max-w-[600px] bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-[0_18px_40px_-14px_rgba(17,27,33,0.14)]">
        <div className="bg-[#008069] text-white px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-white/80 font-medium">
              E.I.D. - Parry (India) Ltd. · Since 1788
            </div>
            <h3 className="font-display text-lg font-bold tracking-tight mt-0.5">
              {product.name}
            </h3>
          </div>
          <div className="text-right font-mono tabular-nums shrink-0">
            <div className="text-[11px] text-white/80">Net Wt.</div>
            <div className="text-sm font-semibold">{primaryVariant.size}</div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Pack Front/Details */}
          <div className="sm:col-span-6 flex flex-col gap-3">
            <PackPhoto product={product} />
            <p className="text-xs text-stone-600 leading-relaxed">{product.description}</p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono tabular-nums">
              <span>MRP ₹{primaryVariant.price}.00 (incl. taxes)</span>
              <span>FSSAI 10012042000181</span>
            </div>
          </div>

          {/* Clickable Scan-to-WhatsApp QR Panel */}
          <div className="sm:col-span-6 flex flex-col items-center text-center bg-stone-50 border border-stone-200/80 rounded-xl p-5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#075E54]">
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan to chat on WhatsApp</span>
            </div>

            <button
              type="button"
              onClick={() => onLaunchWhatsApp(product.id)}
              aria-label={`Click QR code to simulate scanning ${product.name} pack`}
              className="mt-3 relative group rounded-2xl p-2 transition-transform hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008069] cursor-pointer"
            >
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#008069] rounded-tl-md" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#008069] rounded-tr-md" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#008069] rounded-bl-md" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#008069] rounded-br-md" />

              <QrCodeGraphic seed={product.id} size={172} />
            </button>

            <p className="mt-3 text-xs text-stone-600 leading-snug">
              Find nearby stores, reorder fast, or explore more Parry&apos;s products.
            </p>

            <button
              type="button"
              onClick={() => onLaunchWhatsApp(product.id)}
              className="mt-3.5 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#008069] hover:bg-[#075E54] text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ScanLine className="w-3.5 h-3.5" />
              Click QR to scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
