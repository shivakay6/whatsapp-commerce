export type ProductCategory = "sweetener" | "non-sweetener";

export interface ProductVariant {
  size: string;
  price: number;
  stockQty: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  tags: string[];
  image: string;
  variants: ProductVariant[];
}

export type RangeCarried = "sweetener" | "non-sweetener" | "both";

export interface Stockist {
  id: string;
  name: string;
  city: "Chennai" | "Coimbatore" | "Madurai" | "Bengaluru";
  address: string;
  pincode: string;
  phone: string;
  rangesCarried: RangeCarried;
}

export interface StockistMatch {
  stockist: Stockist;
  approxDistance: "within 2 km" | "about 5 km" | "about 10+ km";
  mapsUrl: string;
  categoryNote: string;
}

export type SampleArea = "Chennai" | "Coimbatore" | "Bengaluru";

export type SellerName =
  | "Parry's website"
  | "Blinkit"
  | "Zepto"
  | "Swiggy Instamart";

export interface SellerAvailability {
  seller: SellerName;
  product_name: string;
  in_stock: boolean;
  mrp: number;
  offer_price: number;
  delivery_eta: string;
  purchase_link: string;
}

export interface SellerResultsBundle {
  product: Product;
  size: string;
  sellers: SellerAvailability[];
}

export type EntrySource = "meta_ad" | "google_ad" | "qr_pack" | "website";

export interface EntryConfig {
  source: EntrySource;
  productId: string;
}

export type JourneyStep =
  | "awaiting_entry_send"
  | "select_range"
  | "enquiry"
  | "select_product"
  | "select_size"
  | "action_menu"
  | "flow_a_pincode"
  | "flow_a_results"
  | "buy_now_location"
  | "buy_now_checking"
  | "buy_now_results";

export type BotAction =
  | { type: "explore_category"; category: ProductCategory }
  | { type: "explore_free_text" }
  | { type: "select_product"; productId: string }
  | { type: "select_size"; size: string }
  | { type: "action_store_locator" }
  | { type: "action_buy_now" }
  | { type: "action_explore" }
  | { type: "tap_buy_now_seller"; seller: SellerName }
  | { type: "confirm_order_placed" }
  | { type: "use_existing_pincode"; pincode: string };

export interface ReplyButton {
  id: string;
  label: string;
  action: BotAction;
}

export interface ListMenuItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  action: BotAction;
}

export interface ListMenu {
  title: string;
  items: ListMenuItem[];
}

export interface ProductShowcaseCard {
  product: Product;
  size?: string;
}

export interface ProductMatchCard {
  product: Product;
  reason: string;
}

export interface LinkButton {
  label: string;
  url: string;
  badgeText?: string;
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "bot";
  text: string;
  timestamp: string;
  note?: string;
  isError?: boolean;
  productCard?: ProductShowcaseCard;
  productMatches?: ProductMatchCard[];
  sellerResults?: SellerResultsBundle;
  replyButtons?: ReplyButton[];
  listMenu?: ListMenu;
  stockistCards?: StockistMatch[];
  linkButtons?: LinkButton[];
}
