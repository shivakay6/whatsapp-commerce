import type {
  Product,
  ProductCategory,
  ProductVariant,
  SampleArea,
  SellerAvailability,
  SellerName,
  Stockist,
  StockistMatch,
} from "../types/chat";

export const CATALOG: Product[] = [
  {
    id: "parrys-white-label-sugar",
    name: "Parry's White Label Sugar",
    category: "sweetener",
    description: "Pure, sparkling white cane sugar crystals for everyday tea, coffee, and Indian sweets.",
    tags: ["daily use", "tea/coffee", "cooking", "baking", "white sugar"],
    image: "/src/assets/images/parry_white_sugar_1795068201543.jpg",
    variants: [
      { size: "500 g", price: 32, stockQty: 42 },
      { size: "1 kg", price: 62, stockQty: 28 },
      { size: "5 kg", price: 295, stockQty: 11 },
    ],
  },
  {
    id: "parrys-pure-refined-sugar",
    name: "Parry's Pure Refined Sugar",
    category: "sweetener",
    description: "Sulphur-free, double-refined fine sugar that dissolves effortlessly in beverages and baking.",
    tags: ["baking", "tea/coffee", "sulphur-free", "fine grain", "refined"],
    image: "/src/assets/images/parry_refined_sugar_1795068202058.jpg",
    variants: [
      { size: "500 g", price: 38, stockQty: 34 },
      { size: "1 kg", price: 74, stockQty: 19 },
    ],
  },
  {
    id: "parrys-sweetcare-low-gi",
    name: "Parry's SweetCare Low GI Sugar",
    category: "sweetener",
    description: "Clinically tested low-glycemic-index natural cane sugar for mindful, sugar-conscious households.",
    tags: ["diabetic-friendly", "low GI", "tea/coffee", "mindful sweetness", "health"],
    image: "/src/assets/images/parry_sweetcare_sugar_1795068202249.jpg",
    variants: [
      { size: "500 g", price: 95, stockQty: 22 },
      { size: "1 kg", price: 180, stockQty: 15 },
    ],
  },
  {
    id: "parrys-amrit-brown-sugar",
    name: "Parry's Amrit Brown Sugar",
    category: "sweetener",
    description: "Unrefined natural brown cane sugar retaining mild molasses notes for coffee and baking.",
    tags: ["baking", "tea/coffee", "unrefined", "brown sugar", "molasses"],
    image: "/src/assets/images/parry_brown_sugar_1795068202029.jpg",
    variants: [
      { size: "500 g", price: 78, stockQty: 16 },
      { size: "1 kg", price: 148, stockQty: 4 },
    ],
  },
  {
    id: "parrys-jaggery-powder",
    name: "Parry's Jaggery Powder",
    category: "sweetener",
    description: "Chemical-free, easy-to-scoop natural cane jaggery powder for traditional sweets and warm drinks.",
    tags: ["traditional", "chemical-free", "jaggery", "daily use", "desserts"],
    image: "/src/assets/images/parry_jaggery_powder_1795068202781.jpg",
    variants: [
      { size: "500 g", price: 68, stockQty: 25 },
      { size: "1 kg", price: 129, stockQty: 12 },
    ],
  },
  {
    id: "parrys-rice",
    name: "Parry's Rice",
    category: "non-sweetener",
    description: "Aged, aromatic everyday dining rice with consistent grain quality for daily home cooking.",
    tags: ["staples", "daily use", "cooking", "rice", "lunch/dinner"],
    image: "/src/assets/images/parry_sona_rice_1795068201887.jpg",
    variants: [
      { size: "1 kg", price: 88, stockQty: 30 },
      { size: "5 kg", price: 420, stockQty: 18 },
      { size: "10 kg", price: 810, stockQty: 0 },
    ],
  },
  {
    id: "parrys-toor-dal",
    name: "Parry's Toor Dal",
    category: "non-sweetener",
    description: "Unpolished, protein-rich split pigeon peas selected for quick cooking and homestyle sambar and dal.",
    tags: ["staples", "daily use", "dal", "protein", "daily cooking"],
    image: "/src/assets/images/parry_toor_dal_1795068201874.jpg",
    variants: [
      { size: "500 g", price: 96, stockQty: 27 },
      { size: "1 kg", price: 185, stockQty: 14 },
    ],
  },
  {
    id: "parrys-millets",
    name: "Parry's Millets",
    category: "non-sweetener",
    description: "Fibre-rich, naturally gluten-free traditional grains ideal for wholesome breakfast bowls and khichdi.",
    tags: ["staples", "millets", "fibre-rich", "healthy grains", "diabetic-friendly"],
    image: "/src/assets/images/parry_millets_pack_1795068202377.jpg",
    variants: [
      { size: "500 g", price: 79, stockQty: 21 },
      { size: "1 kg", price: 150, stockQty: 9 },
    ],
  },
  {
    id: "parrys-organic-spirulina",
    name: "Parry's Organic Spirulina",
    category: "non-sweetener",
    description: "Certified organic blue-green microalgae tablets offering plant-based daily nutrition and antioxidants.",
    tags: ["health supplement", "organic", "immunity", "plant protein", "wellness"],
    image: "/src/assets/images/parry_spirulina_tablets_1795068201809.jpg",
    variants: [
      { size: "60 tablets", price: 299, stockQty: 17 },
      { size: "120 tablets", price: 549, stockQty: 8 },
    ],
  },
  {
    id: "parrys-moong-dal",
    name: "Parry's Moong Dal",
    category: "non-sweetener",
    description: "Light, easy-to-digest split yellow moong lentils for comforting khichdi, payasam, and everyday meals.",
    tags: ["staples", "daily use", "dal", "light meal", "daily cooking"],
    image: "/src/assets/images/parry_moong_dal_1795068202396.jpg",
    variants: [
      { size: "500 g", price: 89, stockQty: 24 },
      { size: "1 kg", price: 172, stockQty: 13 },
    ],
  },
];

export const STOCKISTS: Stockist[] = [
  {
    id: "chn-1",
    name: "Parry's Corner Provision Mart",
    city: "Chennai",
    address: "142 NSC Bose Road, George Town, Chennai 600001",
    pincode: "600001",
    phone: "+91 44 2534 1180",
    rangesCarried: "both",
  },
  {
    id: "chn-2",
    name: "Adyar Heritage Supermarket",
    city: "Chennai",
    address: "28 LB Road, Adyar, Chennai 600020",
    pincode: "600020",
    phone: "+91 44 2441 7622",
    rangesCarried: "sweetener",
  },
  {
    id: "chn-3",
    name: "Anna Nagar Granary & Stores",
    city: "Chennai",
    address: "45 Second Avenue, Anna Nagar, Chennai 600040",
    pincode: "600040",
    phone: "+91 44 2621 4905",
    rangesCarried: "non-sweetener",
  },
  {
    id: "cbe-1",
    name: "Kovai Town Hall Provisions",
    city: "Coimbatore",
    address: "112 Big Bazaar Street, Town Hall, Coimbatore 641001",
    pincode: "641001",
    phone: "+91 422 239 5412",
    rangesCarried: "both",
  },
  {
    id: "cbe-2",
    name: "RS Puram Nilgiri Grocers",
    city: "Coimbatore",
    address: "74 DB Road, RS Puram, Coimbatore 641002",
    pincode: "641002",
    phone: "+91 422 254 8830",
    rangesCarried: "sweetener",
  },
  {
    id: "cbe-3",
    name: "Peelamedu Daily Staples",
    city: "Coimbatore",
    address: "305 Avinashi Road, Peelamedu, Coimbatore 641018",
    pincode: "641018",
    phone: "+91 422 256 3201",
    rangesCarried: "non-sweetener",
  },
  {
    id: "mdu-1",
    name: "Meenakshi Bazaar Wholesale & Retail",
    city: "Madurai",
    address: "88 West Masi Street, Madurai 625001",
    pincode: "625001",
    phone: "+91 452 234 7190",
    rangesCarried: "both",
  },
  {
    id: "mdu-2",
    name: "Tallakulam Choice Mart",
    city: "Madurai",
    address: "19 Alagar Kovil Main Road, Tallakulam, Madurai 625002",
    pincode: "625002",
    phone: "+91 452 253 0944",
    rangesCarried: "sweetener",
  },
  {
    id: "mdu-3",
    name: "Vaigai Harvest Stores",
    city: "Madurai",
    address: "64 80 Feet Road, Anna Nagar, Madurai 625020",
    pincode: "625020",
    phone: "+91 452 258 6311",
    rangesCarried: "non-sweetener",
  },
  {
    id: "blr-1",
    name: "Bengaluru Central Grocers",
    city: "Bengaluru",
    address: "52 Brigade Road Cross, Bengaluru 560001",
    pincode: "560001",
    phone: "+91 80 2558 4320",
    rangesCarried: "both",
  },
  {
    id: "blr-2",
    name: "Jayanagar Sweet & Spice Emporium",
    city: "Bengaluru",
    address: "118 4th Block, 11th Main Road, Jayanagar, Bengaluru 560011",
    pincode: "560011",
    phone: "+91 80 2663 9175",
    rangesCarried: "sweetener",
  },
  {
    id: "blr-3",
    name: "Indiranagar Organic Pantry",
    city: "Bengaluru",
    address: "712 100 Feet Road, Indiranagar, Bengaluru 560038",
    pincode: "560038",
    phone: "+91 80 2528 7740",
    rangesCarried: "non-sweetener",
  },
];

export const SAMPLE_AREAS: Record<SampleArea, { coords: string; label: string }> = {
  Chennai: { coords: "13.0827, 80.2707", label: "Chennai (13.0827° N, 80.2707° E)" },
  Coimbatore: { coords: "11.0168, 76.9558", label: "Coimbatore (11.0168° N, 76.9558° E)" },
  Bengaluru: { coords: "12.9716, 77.5946", label: "Bengaluru (12.9716° N, 77.5946° E)" },
};

export function mapPincodeToArea(pincode: string): SampleArea {
  if (pincode.startsWith("64") || pincode.startsWith("638") || pincode.startsWith("67") || pincode.startsWith("68") || pincode.startsWith("69")) {
    return "Coimbatore";
  }
  if (pincode.startsWith("5")) {
    return "Bengaluru";
  }
  if (pincode.startsWith("6")) {
    return "Chennai";
  }
  // Map other Indian pincode regions deterministically to the nearest sample hub
  const firstDigit = Number(pincode[0]);
  if (firstDigit >= 7) return "Chennai";
  return "Bengaluru";
}

// Per-product, per-area mock seller stock flags & price adjustments
const AVAILABILITY_MATRIX: Record<
  string,
  Record<SampleArea, Record<SellerName, { inStock: boolean; discountPct: number; eta?: string }>>
> = {
  "parrys-white-label-sugar": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 8, eta: "10 mins" },
      Zepto: { inStock: true, discountPct: 10, eta: "12 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 6, eta: "15 mins" },
    },
    Coimbatore: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 6, eta: "14 mins" },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: true, discountPct: 9, eta: "16 mins" },
    },
    Bengaluru: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 11, eta: "10 mins" },
      Zepto: { inStock: true, discountPct: 7, eta: "11 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 9, eta: "14 mins" },
    },
  },
  "parrys-pure-refined-sugar": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 9, eta: "11 mins" },
      Zepto: { inStock: true, discountPct: 6, eta: "13 mins" },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
    Coimbatore: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: false, discountPct: 0 },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: true, discountPct: 8, eta: "18 mins" },
    },
    Bengaluru: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 10, eta: "10 mins" },
      Zepto: { inStock: true, discountPct: 12, eta: "10 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 7, eta: "15 mins" },
    },
  },
  "parrys-sweetcare-low-gi": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 8, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 10, eta: "12 mins" },
      Zepto: { inStock: true, discountPct: 6, eta: "14 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 5, eta: "16 mins" },
    },
    Coimbatore: {
      "Parry's website": { inStock: true, discountPct: 8, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 5, eta: "15 mins" },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
    Bengaluru: {
      "Parry's website": { inStock: true, discountPct: 8, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 12, eta: "10 mins" },
      Zepto: { inStock: true, discountPct: 9, eta: "11 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 6, eta: "15 mins" },
    },
  },
  "parrys-amrit-brown-sugar": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 6, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 8, eta: "12 mins" },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: true, discountPct: 10, eta: "14 mins" },
    },
    Coimbatore: {
      "Parry's website": { inStock: true, discountPct: 6, eta: "2-3 days" },
      Blinkit: { inStock: false, discountPct: 0 },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: true, discountPct: 4, eta: "18 mins" },
    },
    Bengaluru: {
      "Parry's website": { inStock: true, discountPct: 6, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 10, eta: "11 mins" },
      Zepto: { inStock: true, discountPct: 12, eta: "10 mins" },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
  },
  "parrys-jaggery-powder": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: false, discountPct: 0 },
      Zepto: { inStock: true, discountPct: 9, eta: "13 mins" },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
    Coimbatore: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: false, discountPct: 0 },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
    Bengaluru: {
      "Parry's website": { inStock: false, discountPct: 0 },
      Blinkit: { inStock: true, discountPct: 8, eta: "12 mins" },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: true, discountPct: 6, eta: "15 mins" },
    },
  },
  "parrys-rice": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 7, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 10, eta: "11 mins" },
      Zepto: { inStock: true, discountPct: 12, eta: "10 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 8, eta: "15 mins" },
    },
    Coimbatore: {
      "Parry's website": { inStock: true, discountPct: 7, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 9, eta: "15 mins" },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: true, discountPct: 6, eta: "17 mins" },
    },
    Bengaluru: {
      "Parry's website": { inStock: true, discountPct: 7, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 11, eta: "10 mins" },
      Zepto: { inStock: true, discountPct: 9, eta: "12 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 13, eta: "14 mins" },
    },
  },
  "parrys-toor-dal": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 6, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 9, eta: "10 mins" },
      Zepto: { inStock: true, discountPct: 7, eta: "12 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 11, eta: "14 mins" },
    },
    Coimbatore: {
      "Parry's website": { inStock: true, discountPct: 6, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 8, eta: "14 mins" },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
    Bengaluru: {
      "Parry's website": { inStock: true, discountPct: 6, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 10, eta: "11 mins" },
      Zepto: { inStock: true, discountPct: 8, eta: "10 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 5, eta: "16 mins" },
    },
  },
  "parrys-millets": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 9, eta: "12 mins" },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
    Coimbatore: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: false, discountPct: 0 },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: true, discountPct: 7, eta: "18 mins" },
    },
    Bengaluru: {
      "Parry's website": { inStock: true, discountPct: 5, eta: "2-3 days" },
      Blinkit: { inStock: false, discountPct: 0 },
      Zepto: { inStock: true, discountPct: 10, eta: "12 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 8, eta: "15 mins" },
    },
  },
  // Parry's Organic Spirulina: out of stock everywhere in Coimbatore to demo "no stock" path
  "parrys-organic-spirulina": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 10, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 6, eta: "15 mins" },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
    Coimbatore: {
      "Parry's website": { inStock: false, discountPct: 0 },
      Blinkit: { inStock: false, discountPct: 0 },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
    Bengaluru: {
      "Parry's website": { inStock: true, discountPct: 10, eta: "2-3 days" },
      Blinkit: { inStock: false, discountPct: 0 },
      Zepto: { inStock: true, discountPct: 12, eta: "12 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 8, eta: "16 mins" },
    },
  },
  "parrys-moong-dal": {
    Chennai: {
      "Parry's website": { inStock: true, discountPct: 6, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 9, eta: "10 mins" },
      Zepto: { inStock: true, discountPct: 11, eta: "12 mins" },
      "Swiggy Instamart": { inStock: false, discountPct: 0 },
    },
    Coimbatore: {
      "Parry's website": { inStock: true, discountPct: 6, eta: "2-3 days" },
      Blinkit: { inStock: false, discountPct: 0 },
      Zepto: { inStock: false, discountPct: 0 },
      "Swiggy Instamart": { inStock: true, discountPct: 8, eta: "16 mins" },
    },
    Bengaluru: {
      "Parry's website": { inStock: true, discountPct: 6, eta: "2-3 days" },
      Blinkit: { inStock: true, discountPct: 8, eta: "10 mins" },
      Zepto: { inStock: true, discountPct: 10, eta: "11 mins" },
      "Swiggy Instamart": { inStock: true, discountPct: 7, eta: "14 mins" },
    },
  },
};

const DIRECT_PRODUCT_LINKS: Record<
  string,
  Partial<Record<Exclude<SellerName, "Parry's website">, string>>
> = {
  "parrys-white-label-sugar": {
    Blinkit: "https://blinkit.com/prn/parrys-white-label-sulphurless-sugar/prid/38910",
    Zepto: "https://www.zepto.com/pn/parrys-white-label-sugar/pvid/07bbeb5e-e670-4c4e-b282-4f51c1e9f4cb",
    "Swiggy Instamart": "https://www.swiggy.com/instamart/item/FXKC7SHNLH",
  },
  "parrys-pure-refined-sugar": {
    Blinkit: "https://blinkit.com/prn/parrys-pure-refined-sugar/prid/555368",
    Zepto: "https://www.zepto.com/pn/parrys-superfine-sugar/pvid/479486c7-ac6b-4d9c-bce8-599196739365",
    "Swiggy Instamart": "https://www.swiggy.com/instamart/item/9WGSP9M1D3",
  },
  "parrys-sweetcare-low-gi": {
    Blinkit: "https://blinkit.com/prn/parrys-sweet-care-low-gi-sugar/prid/490865",
    Zepto: "https://www.zepto.com/pn/parrys-sweet-care-low-gi-sugar/pvid/5ecfbc4b-75de-4151-91f6-a44f0ad9e2b1",
    "Swiggy Instamart": "https://www.swiggy.com/instamart/item/0UTYYPMC2D",
  },
  "parrys-amrit-brown-sugar": {
    Blinkit: "https://blinkit.com/prn/parrys-amrit-brown-sugar/prid/490867",
    Zepto: "https://www.zepto.com/pn/parrys-amrit-brown-sugar/pvid/4b99fb29-0e0f-4f18-bcdf-6661648a7fda",
    "Swiggy Instamart": "https://instamart.in/p/parry-s-amrit-natural-brown-sugar",
  },
  "parrys-jaggery-powder": {
    Blinkit: "https://blinkit.com/prn/parrys-jaggery-powder/prid/520523",
    Zepto: "https://www.zepto.com/pn/parrys-jaggery-powder/pvid/ba0053cc-0566-445c-a582-c2498245c962",
    "Swiggy Instamart": "https://www.swiggy.com/instamart/item/E38NIMG3JF",
  },
  "parrys-rice": {
    Blinkit: "https://blinkit.com/prn/parrys-sona-masoori-raw-rice/prid/562980",
    Zepto: "https://www.zepto.com/pn/parrys-sona-masoori-raw-rice/pvid/43d41d00-c7a1-401d-a4d2-241ac867b97f",
    "Swiggy Instamart": "https://instamart.in/p/parry-s-sona-masoori-raw-rice",
  },
  "parrys-toor-dal": {
    Blinkit: "https://blinkit.com/prn/parrys-toor-dal/prid/562975",
    Zepto: "https://www.zepto.com/pn/parrys-toor-dal-polished/pvid/7919eaef-376c-4876-bbf7-0f9ebd23f8df",
    "Swiggy Instamart": "https://www.swiggy.com/instamart/item/HM91KTHO69",
  },
  "parrys-millets": {
    Blinkit: "https://blinkit.com/prn/parrys-millets/prid/562982",
    Zepto: "https://www.zepto.com/pn/parrys-millets/pvid/8a31f2b0-19c4-4c8d-9c52-21a7c4b390e1",
    "Swiggy Instamart": "https://instamart.in/p/parry-s-millets",
  },
  "parrys-organic-spirulina": {
    Blinkit: "https://blinkit.com/prn/parrys-organic-spirulina-tablets/prid/562990",
    Zepto: "https://www.zepto.com/pn/parrys-organic-spirulina-tablets/pvid/6b12c3e4-51a2-49d0-8e33-4a91f8c271b0",
    "Swiggy Instamart": "https://instamart.in/p/parry-s-organic-spirulina-tablets",
  },
  "parrys-moong-dal": {
    Blinkit: "https://blinkit.com/prn/parrys-moong-dal/prid/562978",
    Zepto: "https://www.zepto.com/pn/parrys-moong-dal-split/pvid/7ae283e2-4d10-470f-b160-d32e712bddf7",
    "Swiggy Instamart": "https://instamart.in/p/parry-s-moong-dal",
  },
};

function buildPurchaseLink(seller: SellerName, product: Product, _size: string): string {
  if (seller === "Parry's website") {
    return `https://www.eidparry.com/?add_to_cart=${encodeURIComponent(product.id)}`;
  }
  const direct = DIRECT_PRODUCT_LINKS[product.id]?.[seller];
  if (direct) return direct;

  const slug = product.id;
  switch (seller) {
    case "Blinkit":
      return `https://blinkit.com/prn/${slug}/prid/38910`;
    case "Zepto":
      return `https://www.zepto.com/pn/${slug}/pvid/07bbeb5e-e670-4c4e-b282-4f51c1e9f4cb`;
    case "Swiggy Instamart":
      return `https://instamart.in/p/${slug}`;
  }
}

export function checkSellerAvailability(
  product: Product,
  size: string | null,
  area: SampleArea
): SellerAvailability[] {
  const variant = findVariant(product, size);
  const mrp = variant.price;
  const areaData = AVAILABILITY_MATRIX[product.id]?.[area];
  const sellers: SellerName[] = [
    "Parry's website",
    "Blinkit",
    "Zepto",
    "Swiggy Instamart",
  ];

  const records: SellerAvailability[] = sellers.map((seller) => {
    const info = areaData?.[seller] ?? { inStock: false, discountPct: 0 };
    const offerPrice = info.inStock
      ? Math.max(1, Math.round(mrp * (1 - info.discountPct / 100)))
      : mrp;

    return {
      seller,
      product_name: `${product.name} (${variant.size})`,
      in_stock: info.inStock,
      mrp,
      offer_price: offerPrice,
      delivery_eta: info.eta ?? (seller === "Parry's website" ? "2-3 days" : "15 mins"),
      purchase_link: buildPurchaseLink(seller, product, variant.size),
    };
  });

  // Return ONLY sellers where in_stock is true, sorted by lowest offer_price first
  return records
    .filter((r) => r.in_stock)
    .sort((a, b) => a.offer_price - b.offer_price);
}

export function findProductById(productId: string): Product | undefined {
  return CATALOG.find((p) => p.id === productId);
}

export function findVariant(product: Product, size: string | null): ProductVariant {
  if (size) {
    const found = product.variants.find((v) => v.size === size);
    if (found) return found;
  }
  return product.variants[0];
}

export function matchStockists(pincode: string, category: ProductCategory): StockistMatch[] {
  const categoryEligible = STOCKISTS.filter(
    (s) => s.rangesCarried === "both" || s.rangesCarried === category
  );

  const tier1: Stockist[] = [];
  const tier2: Stockist[] = [];
  const tier3: Stockist[] = [];

  for (const outlet of categoryEligible) {
    if (outlet.pincode === pincode) {
      tier1.push(outlet);
    } else if (outlet.pincode.slice(0, 3) === pincode.slice(0, 3)) {
      tier2.push(outlet);
    } else if (outlet.pincode.slice(0, 2) === pincode.slice(0, 2)) {
      tier3.push(outlet);
    }
  }

  const ordered = [
    ...tier1.map((stockist) => ({ stockist, approxDistance: "within 2 km" as const })),
    ...tier2.map((stockist) => ({ stockist, approxDistance: "about 5 km" as const })),
    ...tier3.map((stockist) => ({ stockist, approxDistance: "about 10+ km" as const })),
  ].slice(0, 3);

  const rangeLabel = category === "sweetener" ? "sweetener" : "non-sweetener";

  return ordered.map(({ stockist, approxDistance }) => ({
    stockist,
    approxDistance,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${stockist.name} ${stockist.address}`
    )}`,
    categoryNote: `Typically stocks the ${rangeLabel} range - please call to confirm availability.`,
  }));
}
