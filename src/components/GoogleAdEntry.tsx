import { useState } from "react";
import {
  ChevronRight,
  MessageCircle,
  Mic,
  MoreVertical,
  Package,
  Search,
} from "lucide-react";
import { CATALOG } from "../data/mockData";
import type { Product } from "../types/chat";

interface GoogleAdEntryProps {
  productId: string;
  onChangeProduct: (productId: string) => void;
  onLaunchWhatsApp: (productId: string) => void;
}

function AdThumbnail({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-16 h-16 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
        <Package className="w-5 h-5 text-[#008069]" />
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
    />
  );
}

export function GoogleAdEntry({
  productId,
  onChangeProduct,
  onLaunchWhatsApp,
}: GoogleAdEntryProps) {
  const product = CATALOG.find((p) => p.id === productId) ?? CATALOG[2];
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const packSummary = product.variants.map((v) => v.size).join(", ");
  const searchQuery = `buy ${product.name.toLowerCase()} near me`;

  const sweeteners = CATALOG.filter((p) => p.category === "sweetener");
  const nonSweeteners = CATALOG.filter((p) => p.category === "non-sweetener");

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
      {/* Compact Prototype Bar */}
      <div className="w-full bg-white border border-stone-200/90 rounded-xl px-4 py-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-stone-900">
            Google Search Ad · Message Asset
          </div>
          <div className="text-xs text-stone-500">
            Tap <span className="font-medium text-stone-700">Send WhatsApp message</span> below the ad to open WhatsApp
          </div>
        </div>

        <select
          aria-label="Searched Google ad product"
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

      {/* Realistic Mobile Google Search SERP */}
      <div className="w-full max-w-[420px] bg-[#161917] p-2.5 rounded-[2.25rem] shadow-[0_20px_50px_-12px_rgba(17,27,33,0.22)]">
        <div className="bg-white rounded-[1.65rem] overflow-hidden flex flex-col">
          {/* Mobile Google Header */}
          <div className="px-4 pt-4 pb-2 border-b border-stone-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="font-display font-bold text-xl tracking-tight select-none">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-700 text-xs font-semibold flex items-center justify-center">
                S
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-full px-3.5 py-2 shadow-2xs">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="text-[13px] text-[#202124] truncate flex-1">{searchQuery}</span>
              <Mic className="w-4 h-4 text-[#4285F4] shrink-0" />
            </div>

            <div className="flex items-center gap-5 mt-3 text-[12px] font-medium text-[#5f6368]">
              <span className="text-[#1a73e8] border-b-2 border-[#1a73e8] pb-1.5">All</span>
              <span className="pb-1.5">Shopping</span>
              <span className="pb-1.5">Images</span>
              <span className="pb-1.5">Maps</span>
            </div>
          </div>

          {/* Search Results */}
          <div className="bg-[#F1F3F4] flex flex-col gap-2">
            {/* Sponsored Search Ad with Real Message Asset */}
            <div className="bg-white px-4 py-3.5 flex flex-col gap-2">
              <div className="text-[11.5px] font-bold text-[#202124]">Sponsored</div>

              {/* Site identity line */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#008069] text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
                    P
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-[13px] text-[#202124] truncate">EID Parry</div>
                    <div className="text-[11.5px] text-[#4d5156] truncate">
                      https://www.eidparry.com › products
                    </div>
                  </div>
                </div>
                <MoreVertical className="w-4 h-4 text-[#5f6368] shrink-0" />
              </div>

              {/* Ad Headline (Website link, no WhatsApp mention per Google policy) + Description + Image Asset */}
              <div className="flex items-start justify-between gap-3 mt-0.5">
                <div className="min-w-0">
                  <a
                    href={`https://www.eidparry.com/?product=${encodeURIComponent(product.id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[17px] font-normal text-[#1a0dab] hover:underline leading-snug block"
                  >
                    {product.name} | Official EID Parry Range
                  </a>
                  <p className="text-[13px] text-[#4d5156] leading-snug mt-1">
                    {product.description} Packs: {packSummary}. Starting from{" "}
                    <span className="tabular-nums">₹{minPrice}</span>.
                  </p>
                </div>
                <AdThumbnail product={product} />
              </div>

              {/* Real Google Ads WhatsApp Message Asset Extension */}
              <div className="mt-1 pt-2.5 border-t border-stone-200/80">
                <button
                  type="button"
                  onClick={() => onLaunchWhatsApp(product.id)}
                  className="w-full rounded-full border border-[#dadce0] bg-[#f8f9fa] hover:bg-[#eef6f0] hover:border-[#25D366]/60 px-3.5 py-2.5 flex items-center justify-between gap-2.5 transition-colors cursor-pointer group"
                >
                  <span className="inline-flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3 h-3 fill-current" />
                    </span>
                    <span className="text-[13px] font-medium text-[#1a0dab] group-hover:text-[#075E54] truncate">
                      Send WhatsApp message
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#5f6368] shrink-0" />
                </button>
              </div>
            </div>

            {/* Organic Result below for realistic SERP feel */}
            <div className="bg-white px-4 py-3.5 opacity-80">
              <div className="text-[12px] text-[#202124]">eidparry.com</div>
              <div className="text-[11px] text-[#4d5156] truncate">
                https://www.eidparry.com › consumer-brands
              </div>
              <div className="text-[15px] text-[#1a0dab] mt-1 leading-snug">
                E.I.D. - Parry (India) Ltd — Sweeteners &amp; Staples
              </div>
              <p className="text-[12.5px] text-[#4d5156] mt-1 line-clamp-2 leading-snug">
                Explore Parry&apos;s trusted range of refined sugars, low GI cane sugar, unpolished
                dals, millets, and organic spirulina.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
