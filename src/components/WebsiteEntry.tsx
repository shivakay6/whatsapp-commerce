import { useState } from "react";
import { Lock, MessageCircle, Package, Send, ShieldCheck, X } from "lucide-react";
import { CATALOG } from "../data/mockData";
import type { Product, ProductCategory } from "../types/chat";

interface WebsiteEntryProps {
  onLaunchWhatsApp: () => void;
}

function ProductThumb({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full aspect-[4/3] bg-stone-100 flex items-center justify-center">
        <Package className="w-6 h-6 text-[#008069]" />
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

export function WebsiteEntry({ onLaunchWhatsApp }: WebsiteEntryProps) {
  const [filter, setFilter] = useState<"all" | ProductCategory>("all");
  const [widgetOpen, setWidgetOpen] = useState(true);

  const showcaseProducts = CATALOG.filter((p) =>
    filter === "all" ? true : p.category === filter
  ).slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5">
      {/* Compact Prototype Bar */}
      <div className="bg-white border border-stone-200/90 rounded-xl px-4 py-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-stone-900">
            EID Parry Website Chat Button
          </div>
          <div className="text-xs text-stone-500">
            Click the floating WhatsApp widget or <span className="font-medium text-stone-700">Chat on WhatsApp</span> to start a generic chat
          </div>
        </div>
        <button
          type="button"
          onClick={onLaunchWhatsApp}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#008069] hover:bg-[#075E54] text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          Open WhatsApp Chat
        </button>
      </div>

      {/* Simulated Browser Frame for eidparry.com */}
      <div className="relative bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-[0_18px_40px_-14px_rgba(17,27,33,0.12)]">
        {/* Browser Address Bar */}
        <div className="bg-stone-100 border-b border-stone-200/80 px-4 py-2.5 flex items-center gap-4">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
          </div>
          <div className="flex-1 max-w-md mx-auto bg-white border border-stone-200 rounded-md px-3 py-1 flex items-center gap-2 text-xs text-stone-600">
            <Lock className="w-3 h-3 text-stone-400 shrink-0" />
            <span className="truncate">https://www.eidparry.com/consumer-products</span>
          </div>
        </div>

        {/* Website Content */}
        <div className="relative bg-[#FAFAF8]">
          {/* Website Top Navigation (3-zone contract) */}
          <div className="bg-white border-b border-stone-200/80 px-6 py-4 flex items-center justify-between gap-8">
            <span className="font-display text-lg font-bold tracking-tight text-[#075E54] whitespace-nowrap shrink-0">
              EID Parry
            </span>

            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-600">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === "all" ? "text-stone-900 font-semibold" : ""
                }`}
              >
                All Products
              </button>
              <button
                type="button"
                onClick={() => setFilter("sweetener")}
                className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === "sweetener" ? "text-stone-900 font-semibold" : ""
                }`}
              >
                Sweeteners
              </button>
              <button
                type="button"
                onClick={() => setFilter("non-sweetener")}
                className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === "non-sweetener" ? "text-stone-900 font-semibold" : ""
                }`}
              >
                Staples &amp; Wellness
              </button>
              <button
                type="button"
                onClick={onLaunchWhatsApp}
                className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Store Locator
              </button>
            </nav>

            <button
              type="button"
              onClick={onLaunchWhatsApp}
              className="px-4 py-2 text-xs font-medium text-white bg-[#008069] hover:bg-[#075E54] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Chat on WhatsApp
            </button>
          </div>

          {/* Storefront Hero */}
          <section className="px-6 py-8 md:px-10 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-stone-200/70 bg-white">
            <div className="md:col-span-7">
              <div className="text-xs font-medium text-[#008069]">
                Heritage Since 1788 · Pure Cane Sweeteners &amp; Staples
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mt-2 text-balance">
                Pure Sweetness &amp; Everyday Staples for Indian Kitchens
              </h3>
              <p className="text-sm text-stone-600 mt-3 leading-relaxed max-w-xl">
                From sulphur-free refined sugar and clinically tested Low GI cane sugar to
                unpolished dals, millets, and organic spirulina. Need help picking a product or
                finding a nearby store?
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onLaunchWhatsApp}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#008069] hover:bg-[#075E54] text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Ask Parry&apos;s on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("sweetener")}
                  className="px-4 py-2.5 rounded-lg border border-stone-200 hover:border-stone-300 bg-white text-stone-800 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Browse Sweeteners
                </button>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-xl overflow-hidden border border-stone-200/80 bg-stone-50">
                <ProductThumb product={CATALOG[2]} />
              </div>
            </div>
          </section>

          {/* Featured Products Grid */}
          <section className="px-6 py-8 md:px-10 pb-24">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <h4 className="font-display text-base font-semibold text-stone-900">
                Consumer Range
              </h4>
              <div className="inline-flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
                {(
                  [
                    { id: "all", label: "All" },
                    { id: "sweetener", label: "Sweeteners" },
                    { id: "non-sweetener", label: "Staples & more" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilter(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      filter === tab.id
                        ? "bg-white text-stone-900 shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {showcaseProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200/80 rounded-xl overflow-hidden flex flex-col"
                >
                  <ProductThumb product={item} />
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-stone-500 uppercase tracking-wide">
                        {item.category === "sweetener" ? "Sweetener" : "Staples & Wellness"}
                      </div>
                      <div className="text-sm font-semibold text-stone-900 mt-0.5">
                        {item.name}
                      </div>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                      <span className="text-xs font-mono tabular-nums font-semibold text-stone-900">
                        From ₹{Math.min(...item.variants.map((v) => v.price))}
                      </span>
                      <button
                        type="button"
                        onClick={onLaunchWhatsApp}
                        className="text-xs font-medium text-[#008069] hover:text-[#075E54] cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Buy / Locate →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Floating Website WhatsApp Widget (Bottom-Right) */}
          <div className="relative sm:absolute sm:bottom-5 sm:right-5 px-6 pb-6 sm:p-0 z-20 flex flex-col items-end gap-3">
            {widgetOpen && (
              <div className="w-[300px] bg-white rounded-2xl border border-stone-200 shadow-[0_20px_45px_-12px_rgba(17,27,33,0.28)] overflow-hidden">
                <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white text-[#008069] font-display font-bold text-xs flex items-center justify-center shrink-0">
                      P
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold truncate">Parry&apos;s</span>
                        <ShieldCheck className="w-3 h-3 text-[#A7F3D0] shrink-0" />
                      </div>
                      <div className="text-[10.5px] text-white/80 truncate">
                        Typically replies instantly
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWidgetOpen(false)}
                    aria-label="Minimize chat widget"
                    className="w-7 h-7 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="wa-chat-bg p-3.5">
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2.5 shadow-2xs text-xs text-stone-800 leading-relaxed">
                    Hi there! Need help finding a nearby store, checking prices, or picking a
                    Parry&apos;s product?
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-stone-100">
                  <button
                    type="button"
                    onClick={onLaunchWhatsApp}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Start Chat on WhatsApp
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => (widgetOpen ? onLaunchWhatsApp() : setWidgetOpen(true))}
              aria-label="Open Parry's WhatsApp chat"
              className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.55)] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
