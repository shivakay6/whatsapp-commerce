import { useState } from "react";
import {
  Bookmark,
  ChevronRight,
  Globe,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Package,
  Send,
  Share2,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react";
import { CATALOG } from "../data/mockData";
import type { Product } from "../types/chat";

interface MetaAdEntryProps {
  productId: string;
  onChangeProduct: (productId: string) => void;
  onLaunchWhatsApp: (productId: string) => void;
}

type MetaPlacement = "instagram" | "facebook";

function AdCreativeImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full aspect-square bg-gradient-to-br from-emerald-50 to-stone-100 flex flex-col items-center justify-center gap-2 text-stone-500">
        <Package className="w-8 h-8 text-[#008069]" />
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
      className="w-full aspect-[4/3] object-cover bg-stone-100"
    />
  );
}

export function MetaAdEntry({
  productId,
  onChangeProduct,
  onLaunchWhatsApp,
}: MetaAdEntryProps) {
  const [placement, setPlacement] = useState<MetaPlacement>("instagram");
  const product = CATALOG.find((p) => p.id === productId) ?? CATALOG[2];
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const packSummary = product.variants.map((v) => v.size).join(" · ");

  const sweeteners = CATALOG.filter((p) => p.category === "sweetener");
  const nonSweeteners = CATALOG.filter((p) => p.category === "non-sweetener");

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
      {/* Compact Prototype Bar */}
      <div className="w-full bg-white border border-stone-200/90 rounded-xl px-4 py-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-stone-900">
            Meta Click-to-WhatsApp Ad
          </div>
          <div className="text-xs text-stone-500">
            Tap <span className="font-medium text-stone-700">Send message</span> on the ad to open WhatsApp
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg">
            <button
              type="button"
              onClick={() => setPlacement("instagram")}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                placement === "instagram"
                  ? "bg-white text-stone-900 shadow-2xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Instagram
            </button>
            <button
              type="button"
              onClick={() => setPlacement("facebook")}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                placement === "facebook"
                  ? "bg-white text-stone-900 shadow-2xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Facebook
            </button>
          </div>

          <select
            aria-label="Featured Meta ad product"
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
      </div>

      {/* Realistic Mobile Meta Feed Frame */}
      <div className="w-full max-w-[390px] bg-[#161917] p-2.5 rounded-[2.25rem] shadow-[0_20px_50px_-12px_rgba(17,27,33,0.22)]">
        <div className="bg-white rounded-[1.65rem] overflow-hidden flex flex-col">
          {/* App Top Bar */}
          <div className="px-4 py-2.5 border-b border-stone-200/80 flex items-center justify-between">
            <span className="font-display font-bold text-[15px] tracking-tight text-stone-900">
              {placement === "instagram" ? "Instagram" : "facebook"}
            </span>
            <span className="text-[11px] text-stone-400">Feed</span>
          </div>

          {/* Sponsored Account Header */}
          <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#008069] text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
                P
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[13px] font-semibold text-stone-900 truncate">
                    {placement === "instagram" ? "eidparry.india" : "EID Parry India"}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0095F6] shrink-0" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 leading-tight">
                  <span>Sponsored</span>
                  {placement === "facebook" && (
                    <>
                      <span aria-hidden="true">·</span>
                      <Globe className="w-2.5 h-2.5" />
                    </>
                  )}
                </div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-stone-500 shrink-0" />
          </div>

          {/* Facebook Primary Text sits above media */}
          {placement === "facebook" && (
            <div className="px-3.5 pb-2.5 text-[13px] text-[#050505] leading-snug">
              {product.description} Available in {packSummary}. Message us on WhatsApp to check
              stores or order near you.
            </div>
          )}

          {/* Ad Media */}
          <div className="relative bg-stone-100">
            <AdCreativeImage product={product} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3.5 pt-7 pb-2.5 text-white">
              <div className="text-[10.5px] text-white/85">
                EID Parry · {packSummary}
              </div>
              <div className="flex items-baseline justify-between gap-2 mt-0.5">
                <div className="text-[14.5px] font-semibold leading-snug truncate">
                  {product.name}
                </div>
                <div className="text-[12.5px] font-mono tabular-nums font-semibold whitespace-nowrap shrink-0">
                  From ₹{minPrice}
                </div>
              </div>
            </div>
          </div>

          {/* Native Meta Click-to-WhatsApp CTA Area */}
          {placement === "instagram" ? (
            <>
              {/* Real Instagram Sponsored CTA Bar directly beneath image */}
              <button
                type="button"
                onClick={() => onLaunchWhatsApp(product.id)}
                className="w-full px-3.5 py-2.5 bg-[#0095F6] hover:bg-[#1877F2] text-white flex items-center justify-between gap-2 transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Send message
                </span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>

              {/* IG Engagement Row + Caption */}
              <div className="px-3.5 py-2.5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-stone-800">
                  <div className="flex items-center gap-3.5">
                    <Heart className="w-5 h-5" />
                    <MessageCircle className="w-5 h-5" />
                    <Send className="w-5 h-5" />
                  </div>
                  <Bookmark className="w-5 h-5" />
                </div>
                <div className="text-[12px] font-semibold text-stone-900 tabular-nums">
                  2,418 likes
                </div>
                <p className="text-[12px] text-stone-800 leading-snug">
                  <span className="font-semibold mr-1.5">eidparry.india</span>
                  {product.description} Tap &ldquo;Send message&rdquo; to chat on WhatsApp for
                  pack sizes, store locator &amp; quick delivery.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Real Facebook Click-to-WhatsApp Footer Bar */}
              <div className="px-3.5 py-2.5 bg-[#F0F2F5] border-t border-stone-200/70 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10.5px] uppercase tracking-wide text-stone-500">
                    WhatsApp
                  </div>
                  <div className="text-[13px] font-semibold text-[#050505] truncate">
                    Chat with Parry&apos;s about {product.name}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onLaunchWhatsApp(product.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] text-[12.5px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                  Send message
                </button>
              </div>

              {/* FB Reactions + Actions */}
              <div className="px-3.5 py-2 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] text-stone-500 pb-1.5 border-b border-stone-100 tabular-nums">
                  <span>1.4K reactions</span>
                  <span>84 comments · 112 shares</span>
                </div>
                <div className="grid grid-cols-3 text-xs font-medium text-stone-600 py-0.5">
                  <div className="flex items-center justify-center gap-1.5 py-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Like
                  </div>
                  <div className="flex items-center justify-center gap-1.5 py-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Comment
                  </div>
                  <div className="flex items-center justify-center gap-1.5 py-1">
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
