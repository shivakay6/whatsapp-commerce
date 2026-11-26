import { QrCode, Globe, Megaphone, Search, RotateCcw } from "lucide-react";
import { CATALOG } from "../data/mockData";
import type { EntryConfig, EntrySource } from "../types/chat";

interface EntrySimulatorProps {
  config: EntryConfig;
  onLaunchEntry: (nextConfig: EntryConfig) => void;
  onRestart: () => void;
}

const ENTRY_CARDS: Array<{
  source: EntrySource;
  label: string;
  subtitle: string;
  icon: typeof Megaphone;
  hasProductDropdown: boolean;
  dropdownLabel?: string;
}> = [
  {
    source: "meta_ad",
    label: "Meta ad",
    subtitle: "Product-specific Click-to-WhatsApp ad",
    icon: Megaphone,
    hasProductDropdown: true,
    dropdownLabel: "Ad product",
  },
  {
    source: "google_ad",
    label: "Google ad",
    subtitle: "Product-specific Search ad extension",
    icon: Search,
    hasProductDropdown: true,
    dropdownLabel: "Ad product",
  },
  {
    source: "qr_pack",
    label: "QR code on pack",
    subtitle: "Retail pack scan (product-specific)",
    icon: QrCode,
    hasProductDropdown: true,
    dropdownLabel: "Scanned pack",
  },
  {
    source: "website",
    label: "Website chat button",
    subtitle: "Generic site entry (buttons or Tell me what I need)",
    icon: Globe,
    hasProductDropdown: false,
  },
];

export function EntrySimulator({ config, onLaunchEntry, onRestart }: EntrySimulatorProps) {
  const sweeteners = CATALOG.filter((p) => p.category === "sweetener");
  const nonSweeteners = CATALOG.filter((p) => p.category === "non-sweetener");

  const handleSelectSource = (source: EntrySource) => {
    onLaunchEntry({ ...config, source });
  };

  const handleChangeProduct = (source: EntrySource, productId: string) => {
    onLaunchEntry({ ...config, source, productId });
  };

  return (
    <aside className="flex flex-col gap-6">
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-semibold text-stone-900 tracking-tight">
              Entry point simulator
            </h2>
            <p className="text-sm text-stone-500 mt-1 leading-relaxed">
              Choose how a customer arrives in WhatsApp to start or switch the journey.
            </p>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {ENTRY_CARDS.map((card) => {
            const Icon = card.icon;
            const isSelected = config.source === card.source;

            return (
              <div
                key={card.source}
                className={`rounded-xl border transition-colors ${
                  isSelected
                    ? "border-[#008069] bg-[#008069]/[0.03]"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleSelectSource(card.source)}
                  className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#008069] text-white"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-stone-900 truncate">
                        {card.label}
                      </div>
                      <div className="text-xs text-stone-500 truncate">{card.subtitle}</div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium whitespace-nowrap shrink-0 ${
                      isSelected ? "text-[#008069]" : "text-stone-400"
                    }`}
                  >
                    {isSelected ? "Active" : "Simulate"}
                  </span>
                </button>

                {card.hasProductDropdown && isSelected && (
                  <div className="px-4 pb-4 pt-2 border-t border-stone-200/70">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-stone-600">
                        {card.dropdownLabel}
                      </span>
                      <select
                        value={config.productId}
                        onChange={(e) => handleChangeProduct(card.source, e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-[#008069]"
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
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Concise Demo Reference */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-semibold text-stone-900">Sample test inputs</h3>
        <div className="mt-3 flex flex-col gap-3 text-xs text-stone-600">
          <div>
            <div className="font-medium text-stone-800 mb-1">
              &ldquo;Tell me what I need&rdquo; queries
            </div>
            <div className="leading-relaxed">
              &ldquo;sugar for diabetics&rdquo; · &ldquo;rice and dal for daily cooking&rdquo; · &ldquo;organic immunity supplement&rdquo; · &ldquo;running shoes&rdquo; (no match)
            </div>
          </div>
          <div className="pt-3 border-t border-stone-100">
            <div className="font-medium text-stone-800 mb-1">
              Store locator pincodes (12 mock outlets)
            </div>
            <div className="leading-relaxed font-mono tabular-nums text-[11px] text-stone-600">
              600001 Chennai · 641001 Coimbatore · 625001 Madurai · 560001 Bengaluru · 400001 (no match)
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
