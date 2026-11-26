import type { EntryConfig, JourneyStep, Product } from "../types/chat";

interface DebugStripProps {
  config: EntryConfig;
  selectedProduct: Product | null;
  selectedSize: string | null;
  pincode: string | null;
  locationUsed: string | null;
  inStockSellers: string[] | null;
  buyNowTapped: string | null;
  selfReportedOrdered: boolean;
  step: JourneyStep;
}

function formatEntryLabel(config: EntryConfig): string {
  switch (config.source) {
    case "meta_ad":
      return "Meta ad";
    case "google_ad":
      return "Google ad";
    case "qr_pack":
      return "QR code on pack";
    case "website":
      return "Website chat button";
  }
}

export function DebugStrip({
  config,
  selectedProduct,
  selectedSize,
  pincode,
  locationUsed,
  inStockSellers,
  buyNowTapped,
  selfReportedOrdered,
  step,
}: DebugStripProps) {
  const sellersText =
    inStockSellers === null
      ? "—"
      : inStockSellers.length === 0
        ? "0 (None)"
        : `${inStockSellers.length} (${inStockSellers.join(", ")})`;

  return (
    <div
      aria-label="Session debug state"
      className="w-full max-w-[410px] bg-white border border-stone-200/90 rounded-xl px-4 py-2.5 text-[11px] font-mono tabular-nums text-stone-600 grid grid-cols-2 gap-x-4 gap-y-1.5 shadow-xs"
    >
      <div className="truncate">
        <span className="text-stone-400">Entry: </span>
        <span className="text-stone-800 font-medium">{formatEntryLabel(config)}</span>
      </div>
      <div className="truncate">
        <span className="text-stone-400">Step: </span>
        <span className="text-[#075E54] font-medium">{step}</span>
      </div>
      <div className="truncate">
        <span className="text-stone-400">Product: </span>
        <span className="text-stone-800 font-medium">
          {selectedProduct ? selectedProduct.name : "None"}
        </span>
      </div>
      <div className="truncate">
        <span className="text-stone-400">Size / Pin: </span>
        <span className="text-stone-800 font-medium">
          {selectedSize ?? "—"} · {pincode ?? "—"}
        </span>
      </div>
      <div className="truncate">
        <span className="text-stone-400">Location: </span>
        <span className="text-stone-800 font-medium">{locationUsed ?? "—"}</span>
      </div>
      <div className="truncate">
        <span className="text-stone-400">In stock: </span>
        <span className="text-stone-800 font-medium">{sellersText}</span>
      </div>
      <div className="truncate">
        <span className="text-stone-400">Buy now tapped: </span>
        <span className="text-stone-800 font-medium">{buyNowTapped ?? "—"}</span>
      </div>
      <div className="truncate">
        <span className="text-stone-400">Self-reported ordered: </span>
        <span className="text-stone-800 font-medium">
          {selfReportedOrdered ? "yes" : "no"}
        </span>
      </div>
    </div>
  );
}
