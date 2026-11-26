import { useCallback, useRef, useState } from "react";
import { ArrowRight, Globe, Megaphone, MessageCircle, QrCode, Search } from "lucide-react";
import { DebugStrip } from "./components/DebugStrip";
import { EntrySimulator } from "./components/EntrySimulator";
import { GoogleAdEntry } from "./components/GoogleAdEntry";
import { MetaAdEntry } from "./components/MetaAdEntry";
import { QrPackEntry } from "./components/QrPackEntry";
import { WebsiteEntry } from "./components/WebsiteEntry";
import { WhatsAppPhone } from "./components/WhatsAppPhone";
import {
  CATALOG,
  checkSellerAvailability,
  findProductById,
  mapPincodeToArea,
  matchStockists,
} from "./data/mockData";
import type {
  BotAction,
  ChatMessage,
  EntryConfig,
  EntrySource,
  JourneyStep,
  ListMenu,
  Product,
  ProductCategory,
  ReplyButton,
  SampleArea,
} from "./types/chat";

type PrototypeTab = "meta_ad" | "google_ad" | "qr_pack" | "website" | "whatsapp";

const ENTRY_TABS: Array<{
  id: Exclude<PrototypeTab, "whatsapp">;
  label: string;
  icon: typeof Megaphone;
}> = [
  { id: "meta_ad", label: "1. Meta Ad", icon: Megaphone },
  { id: "google_ad", label: "2. Google Ad", icon: Search },
  { id: "qr_pack", label: "3. QR on Pack", icon: QrCode },
  { id: "website", label: "4. Website Chat", icon: Globe },
];

function nowTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

let msgCounter = 0;
function nextId(prefix: string): string {
  msgCounter += 1;
  return `${prefix}-${Date.now()}-${msgCounter}`;
}

function isProductKnownEntry(config: EntryConfig): boolean {
  return config.source !== "website";
}

function buildRangeButtons(prefix: string): ReplyButton[] {
  return [
    {
      id: `${prefix}-sweet`,
      label: "Sweeteners",
      action: { type: "explore_category", category: "sweetener" },
    },
    {
      id: `${prefix}-non`,
      label: "Staples & more",
      action: { type: "explore_category", category: "non-sweetener" },
    },
    {
      id: `${prefix}-tell`,
      label: "Tell me what I need",
      action: { type: "explore_free_text" },
    },
  ];
}

function buildSizeButtons(product: Product): ReplyButton[] {
  return product.variants.slice(0, 3).map((v) => ({
    id: `size-${product.id}-${v.size}`,
    label: v.size,
    action: { type: "select_size", size: v.size },
  }));
}

function buildActionMenu(): ListMenu {
  return {
    title: "Choose an option",
    items: [
      {
        id: "opt-store",
        title: "1. Find a store near me",
        subtitle: "Check nearby outlets by 6-digit pincode",
        action: { type: "action_store_locator" },
      },
      {
        id: "opt-buy-now",
        title: "2. Buy now",
        subtitle: "Check live availability and price, then buy",
        action: { type: "action_buy_now" },
      },
      {
        id: "opt-explore",
        title: "3. Explore more products",
        subtitle: "Browse sweeteners, staples & wellness",
        action: { type: "action_explore" },
      },
    ],
  };
}

function buildCategoryListMenu(category: ProductCategory): ListMenu {
  const items = CATALOG.filter((p) => p.category === category);
  return {
    title: category === "sweetener" ? "Sweeteners (5)" : "Staples & more (5)",
    items: items.map((p) => ({
      id: `cat-${p.id}`,
      title: p.name,
      subtitle: p.description,
      image: p.image,
      action: { type: "select_product", productId: p.id },
    })),
  };
}

function createInitialSession(config: EntryConfig): {
  messages: ChatMessage[];
  draftText: string;
  selectedProduct: Product | null;
  selectedSize: string | null;
  pincode: string | null;
  locationUsed: string | null;
  inStockSellers: string[] | null;
  step: JourneyStep;
} {
  if (isProductKnownEntry(config)) {
    const product = findProductById(config.productId) ?? CATALOG[0];
    return {
      selectedProduct: product,
      selectedSize: null,
      pincode: null,
      locationUsed: null,
      inStockSellers: null,
      step: "awaiting_entry_send",
      draftText: `Hi, I'm looking at ${product.name}`,
      messages: [],
    };
  }

  return {
    selectedProduct: null,
    selectedSize: null,
    pincode: null,
    locationUsed: null,
    inStockSellers: null,
    step: "awaiting_entry_send",
    draftText: "Hi",
    messages: [],
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<PrototypeTab>("meta_ad");
  const [previewProductId, setPreviewProductId] = useState<string>(CATALOG[2].id);
  const [entryConfig, setEntryConfig] = useState<EntryConfig>({
    source: "meta_ad",
    productId: CATALOG[2].id,
  });

  const initial = useRef(createInitialSession(entryConfig));
  const [messages, setMessages] = useState<ChatMessage[]>(initial.current.messages);
  const [draftText, setDraftText] = useState<string>(initial.current.draftText);
  const [draftVersion, setDraftVersion] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initial.current.selectedProduct
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    initial.current.selectedSize
  );
  const [pincode, setPincode] = useState<string | null>(initial.current.pincode);
  const [locationUsed, setLocationUsed] = useState<string | null>(
    initial.current.locationUsed
  );
  const [inStockSellers, setInStockSellers] = useState<string[] | null>(
    initial.current.inStockSellers
  );
  const [buyNowTapped, setBuyNowTapped] = useState<string | null>(null);
  const [selfReportedOrdered, setSelfReportedOrdered] = useState(false);
  const [step, setStep] = useState<JourneyStep>(initial.current.step);
  const [isTyping, setIsTyping] = useState(false);

  const sessionIdRef = useRef(0);

  const resetToEntry = useCallback((config: EntryConfig) => {
    sessionIdRef.current += 1;
    setIsTyping(false);
    setEntryConfig(config);
    setPreviewProductId(config.productId);
    const next = createInitialSession(config);
    setMessages(next.messages);
    setDraftText(next.draftText);
    setDraftVersion((v) => v + 1);
    setSelectedProduct(next.selectedProduct);
    setSelectedSize(next.selectedSize);
    setPincode(next.pincode);
    setLocationUsed(next.locationUsed);
    setInStockSellers(next.inStockSellers);
    setBuyNowTapped(null);
    setSelfReportedOrdered(false);
    setStep(next.step);
  }, []);

  const handleLaunchFromEntryTab = useCallback(
    (source: EntrySource, productId?: string) => {
      resetToEntry({
        source,
        productId: productId ?? previewProductId,
      });
      setActiveTab("whatsapp");
    },
    [previewProductId, resetToEntry]
  );

  const handleRestart = useCallback(() => {
    resetToEntry(entryConfig);
  }, [entryConfig, resetToEntry]);

  const appendMessages = useCallback((...newMsgs: ChatMessage[]) => {
    setMessages((prev) => [...prev, ...newMsgs]);
  }, []);

  const runEnquiry = useCallback(
    async (queryText: string) => {
      const activeSession = sessionIdRef.current;
      const t = nowTime();
      appendMessages({
        id: nextId("cust"),
        sender: "customer",
        text: queryText,
        timestamp: t,
      });
      setIsTyping(true);

      try {
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: queryText }),
        });

        if (sessionIdRef.current !== activeSession) return;

        const data = (await res.json()) as {
          matches?: Array<{ id: string; reason: string }>;
          error?: string;
        };

        if (!res.ok) {
          setIsTyping(false);
          setStep("select_range");
          appendMessages({
            id: nextId("bot"),
            sender: "bot",
            text:
              data.error ??
              "Sorry, I couldn't process your query right now. You can browse our ranges below instead.",
            timestamp: nowTime(),
            isError: true,
            replyButtons: buildRangeButtons("err"),
          });
          return;
        }

        const matchedCards = (data.matches ?? [])
          .map((m) => {
            const product = findProductById(m.id);
            return product ? { product, reason: m.reason } : null;
          })
          .filter((x): x is { product: Product; reason: string } => x !== null);

        setIsTyping(false);

        if (matchedCards.length === 0) {
          setStep("select_range");
          appendMessages({
            id: nextId("bot"),
            sender: "bot",
            text: "I couldn't find an exact match. Here are our two ranges, or you can describe something else:",
            timestamp: nowTime(),
            replyButtons: buildRangeButtons("empty"),
          });
          return;
        }

        setStep("select_product");
        appendMessages({
          id: nextId("bot"),
          sender: "bot",
          text:
            matchedCards.length === 1
              ? "Here's the best match from Parry's:"
              : `Here are the top ${matchedCards.length} matches from Parry's:`,
          timestamp: nowTime(),
          productMatches: matchedCards,
        });
      } catch {
        if (sessionIdRef.current !== activeSession) return;
        setIsTyping(false);
        setStep("select_range");
        appendMessages({
          id: nextId("bot"),
          sender: "bot",
          text: "Network error while searching products. Please try again or browse our ranges below.",
          timestamp: nowTime(),
          isError: true,
          replyButtons: buildRangeButtons("net"),
        });
      }
    },
    [appendMessages]
  );

  const runBuyNowCheck = useCallback(
    (
      area: SampleArea,
      usedLabel: string,
      enteredPin: string,
      skipCustomerEcho = false
    ) => {
      const activeSession = sessionIdRef.current;
      const t = nowTime();
      const product = selectedProduct ?? CATALOG[0];
      const sizeLabel = selectedSize ?? product.variants[0].size;

      setLocationUsed(usedLabel);
      setStep("buy_now_checking");
      setIsTyping(true);

      const customerMsg: ChatMessage[] = skipCustomerEcho
        ? []
        : [{ id: nextId("cust"), sender: "customer", text: enteredPin, timestamp: t }];

      appendMessages(...customerMsg, {
        id: nextId("bot"),
        sender: "bot",
        text: "Checking availability...",
        timestamp: t,
      });

      setTimeout(() => {
        if (sessionIdRef.current !== activeSession) return;
        setIsTyping(false);
        setStep("buy_now_results");

        const available = checkSellerAvailability(product, sizeLabel, area);
        setInStockSellers(available.map((s) => s.seller));

        if (available.length === 0) {
          appendMessages({
            id: nextId("bot"),
            sender: "bot",
            text: `Sorry, ${product.name} isn't available near you right now.`,
            timestamp: nowTime(),
            replyButtons: [
              {
                id: "buynow-nostock-explore",
                label: "Explore more products",
                action: { type: "action_explore" },
              },
            ],
          });
          return;
        }

        appendMessages({
          id: nextId("bot"),
          sender: "bot",
          text: `In stock near ${enteredPin} (${area}) · lowest price first:`,
          timestamp: nowTime(),
          sellerResults: {
            product,
            size: sizeLabel,
            sellers: available,
          },
          replyButtons: [
            {
              id: "buynow-explore",
              label: "Explore more products",
              action: { type: "action_explore" },
            },
          ],
        });
      }, 1300);
    },
    [appendMessages, selectedProduct, selectedSize]
  );

  const handlePincodeSubmit = useCallback(
    (rawPin: string, skipCustomerEcho = false) => {
      const cleaned = rawPin.trim();
      const t = nowTime();
      const customerMsg: ChatMessage[] = skipCustomerEcho
        ? []
        : [{ id: nextId("cust"), sender: "customer", text: cleaned, timestamp: t }];

      if (!/^\d{6}$/.test(cleaned)) {
        appendMessages(...customerMsg, {
          id: nextId("bot"),
          sender: "bot",
          text: "That doesn't look like a valid pincode. Please enter 6 digits.",
          timestamp: t,
        });
        return;
      }

      setPincode(cleaned);
      setLocationUsed(cleaned);

      if (step === "buy_now_location") {
        const mappedArea = mapPincodeToArea(cleaned);
        runBuyNowCheck(mappedArea, `${cleaned} (${mappedArea})`, cleaned, skipCustomerEcho);
        return;
      }

      const product = selectedProduct ?? CATALOG[0];
      const displayName = selectedSize ? `${product.name} (${selectedSize})` : product.name;
      const stockists = matchStockists(cleaned, product.category);
      setStep("flow_a_results");

      if (stockists.length === 0) {
        appendMessages(...customerMsg, {
          id: nextId("bot"),
          sender: "bot",
          text: "We don't have a listed store near that pincode yet.",
          timestamp: t,
          replyButtons: [
            {
              id: "nostore-buynow",
              label: "Buy now",
              action: { type: "action_buy_now" },
            },
            {
              id: "nostore-explore",
              label: "Explore more products",
              action: { type: "action_explore" },
            },
          ],
        });
        return;
      }

      appendMessages(...customerMsg, {
        id: nextId("bot"),
        sender: "bot",
        text: `Here ${stockists.length === 1 ? "is 1 listed stockist" : `are ${stockists.length} listed stockists`} near ${cleaned} for ${displayName}:`,
        timestamp: t,
        stockistCards: stockists,
        replyButtons: [
          {
            id: "flowa-explore",
            label: "Explore more products",
            action: { type: "action_explore" },
          },
        ],
      });
    },
    [appendMessages, runBuyNowCheck, selectedProduct, selectedSize, step]
  );

  const handleSendMessage = useCallback(
    (text: string) => {
      if (step === "awaiting_entry_send") {
        const activeSession = sessionIdRef.current;
        const t = nowTime();
        setDraftText("");
        setIsTyping(true);
        appendMessages({
          id: nextId("cust"),
          sender: "customer",
          text,
          timestamp: t,
        });

        setTimeout(() => {
          if (sessionIdRef.current !== activeSession) return;
          setIsTyping(false);
          const replyTime = nowTime();

          if (isProductKnownEntry(entryConfig)) {
            const product = findProductById(entryConfig.productId) ?? CATALOG[0];
            setSelectedProduct(product);
            setStep("select_size");
            appendMessages({
              id: nextId("bot"),
              sender: "bot",
              text: `Hi! You're looking at ${product.name}. Which pack size would you like?`,
              timestamp: replyTime,
              productCard: { product },
              replyButtons: buildSizeButtons(product),
            });
            return;
          }

          setStep("select_range");
          appendMessages({
            id: nextId("bot"),
            sender: "bot",
            text: "Hi! Welcome to Parry's. Which range would you like to explore, or tell me what you need?",
            timestamp: replyTime,
            replyButtons: buildRangeButtons("entry"),
          });
        }, 300);
        return;
      }

      if (step === "enquiry") {
        void runEnquiry(text);
      } else if (step === "flow_a_pincode" || step === "buy_now_location") {
        handlePincodeSubmit(text);
      }
    },
    [appendMessages, entryConfig, handlePincodeSubmit, runEnquiry, step]
  );

  const handleAction = useCallback(
    (action: BotAction, label?: string) => {
      const t = nowTime();

      switch (action.type) {
        case "explore_category": {
          const categoryName =
            action.category === "sweetener" ? "Sweeteners" : "Staples & more";
          setStep("select_product");
          appendMessages(
            {
              id: nextId("cust"),
              sender: "customer",
              text: label ?? categoryName,
              timestamp: t,
            },
            {
              id: nextId("bot"),
              sender: "bot",
              text: `Here are our ${categoryName} products. Pick one to select your pack size:`,
              timestamp: t,
              listMenu: buildCategoryListMenu(action.category),
            }
          );
          return;
        }
        case "explore_free_text": {
          setStep("enquiry");
          appendMessages(
            {
              id: nextId("cust"),
              sender: "customer",
              text: label ?? "Tell me what I need",
              timestamp: t,
            },
            {
              id: nextId("bot"),
              sender: "bot",
              text: "Tell me what you're looking for - for example 'sugar for diabetics' or 'rice and dal for daily cooking'.",
              timestamp: t,
            }
          );
          return;
        }
        case "select_product": {
          const product = findProductById(action.productId);
          if (!product) return;
          setSelectedProduct(product);
          setSelectedSize(null);
          setInStockSellers(null);
          setStep("select_size");
          appendMessages(
            {
              id: nextId("cust"),
              sender: "customer",
              text: label ?? product.name,
              timestamp: t,
            },
            {
              id: nextId("bot"),
              sender: "bot",
              text: `Great choice! Which pack size of ${product.name} would you like?`,
              timestamp: t,
              productCard: { product },
              replyButtons: buildSizeButtons(product),
            }
          );
          return;
        }
        case "select_size": {
          const product = selectedProduct ?? CATALOG[0];
          setSelectedSize(action.size);
          setStep("action_menu");
          appendMessages(
            {
              id: nextId("cust"),
              sender: "customer",
              text: label ?? action.size,
              timestamp: t,
            },
            {
              id: nextId("bot"),
              sender: "bot",
              text: `How would you like to get ${product.name} (${action.size})?`,
              timestamp: t,
              listMenu: buildActionMenu(),
            }
          );
          return;
        }
        case "action_store_locator": {
          setStep("flow_a_pincode");
          appendMessages(
            {
              id: nextId("cust"),
              sender: "customer",
              text: label ?? "Find a store near me",
              timestamp: t,
            },
            {
              id: nextId("bot"),
              sender: "bot",
              text: "Please share your 6-digit pincode.",
              timestamp: t,
              replyButtons: pincode
                ? [
                    {
                      id: "use-pin-a",
                      label: `Use ${pincode}`,
                      action: { type: "use_existing_pincode", pincode },
                    },
                  ]
                : undefined,
            }
          );
          return;
        }
        case "use_existing_pincode": {
          appendMessages({
            id: nextId("cust"),
            sender: "customer",
            text: action.pincode,
            timestamp: t,
          });
          handlePincodeSubmit(action.pincode, true);
          return;
        }
        case "action_buy_now": {
          setStep("buy_now_location");
          setInStockSellers(null);
          setBuyNowTapped(null);
          setSelfReportedOrdered(false);
          appendMessages(
            {
              id: nextId("cust"),
              sender: "customer",
              text: label ?? "Buy now",
              timestamp: t,
            },
            {
              id: nextId("bot"),
              sender: "bot",
              text: "Please share your 6-digit pincode so I can check what's available near you.",
              timestamp: t,
              replyButtons: pincode
                ? [
                    {
                      id: "use-pin-buy",
                      label: `Use ${pincode}`,
                      action: { type: "use_existing_pincode", pincode },
                    },
                  ]
                : undefined,
            }
          );
          return;
        }
        case "tap_buy_now_seller": {
          setBuyNowTapped(action.seller);
          if (action.seller === "Parry's website") {
            appendMessages({
              id: nextId("bot"),
              sender: "bot",
              text: "Thank you for choosing Parry's! We truly appreciate your order and hope you enjoy our products. Feel free to browse more from our sweeteners, staples, and wellness range anytime.",
              timestamp: t,
              replyButtons: [
                {
                  id: "web-thanks-explore",
                  label: "Explore more products",
                  action: { type: "action_explore" },
                },
              ],
            });
            return;
          }

          appendMessages({
            id: nextId("bot"),
            sender: "bot",
            text: `Opening ${action.seller} for you. Complete your order there. I'm here if you need anything else.`,
            timestamp: t,
            replyButtons: [
              {
                id: "qcomm-ordered",
                label: "I've placed my order",
                action: { type: "confirm_order_placed" },
              },
              {
                id: "qcomm-explore",
                label: "Explore more products",
                action: { type: "action_explore" },
              },
            ],
          });
          return;
        }
        case "confirm_order_placed": {
          setSelfReportedOrdered(true);
          appendMessages(
            {
              id: nextId("cust"),
              sender: "customer",
              text: label ?? "I've placed my order",
              timestamp: t,
            },
            {
              id: nextId("bot"),
              sender: "bot",
              text: "Thank you for choosing Parry's! We truly appreciate your order and hope you enjoy our products. Feel free to browse more from our sweeteners, staples, and wellness range anytime.",
              timestamp: t,
              replyButtons: [
                {
                  id: "ordered-thanks-explore",
                  label: "Explore more products",
                  action: { type: "action_explore" },
                },
              ],
            }
          );
          return;
        }
        case "action_explore": {
          setStep("select_range");
          appendMessages(
            {
              id: nextId("cust"),
              sender: "customer",
              text: label ?? "Explore more products",
              timestamp: t,
            },
            {
              id: nextId("bot"),
              sender: "bot",
              text: "Which range would you like to explore, or tell me what you need?",
              timestamp: t,
              replyButtons: buildRangeButtons("exp"),
            }
          );
          return;
        }
      }
    },
    [appendMessages, handlePincodeSubmit, pincode, selectedProduct]
  );

  return (
    <div className="min-h-screen bg-[#F4F5F3] text-stone-900 flex flex-col">
      {/* Top Prototype Header */}
      <header className="bg-white border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-baseline gap-3 min-w-0">
            <h1 className="font-display text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0">
              Parry&apos;s WhatsApp Journey
            </h1>
            <span className="text-xs font-medium text-stone-500 whitespace-nowrap shrink-0">
              Prototype - sample data
            </span>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="px-4 py-2 text-xs font-medium text-white bg-[#008069] hover:bg-[#075E54] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Restart
          </button>
        </div>
      </header>

      {/* Prototype Navigation Bar: 4 Entries -> WhatsApp Chat */}
      <div className="bg-white border-b border-stone-200/80">
        <div
          role="tablist"
          aria-label="Entry previews and WhatsApp destination"
          className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-2 overflow-x-auto"
        >
          <span className="text-[11px] font-medium text-stone-400 whitespace-nowrap shrink-0 mr-1">
            Entries:
          </span>

          {ENTRY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <ArrowRight className="w-3.5 h-3.5 text-stone-400 mx-1 shrink-0" aria-hidden="true" />

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "whatsapp"}
            onClick={() => setActiveTab("whatsapp")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === "whatsapp"
                ? "bg-[#008069] text-white"
                : "bg-[#008069]/[0.08] text-[#075E54] hover:bg-[#008069]/[0.14]"
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>WhatsApp Chat</span>
          </button>
        </div>
      </div>

      {/* Active Prototype Page */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {activeTab === "meta_ad" && (
          <MetaAdEntry
            productId={previewProductId}
            onChangeProduct={setPreviewProductId}
            onLaunchWhatsApp={(pid) => handleLaunchFromEntryTab("meta_ad", pid)}
          />
        )}

        {activeTab === "google_ad" && (
          <GoogleAdEntry
            productId={previewProductId}
            onChangeProduct={setPreviewProductId}
            onLaunchWhatsApp={(pid) => handleLaunchFromEntryTab("google_ad", pid)}
          />
        )}

        {activeTab === "qr_pack" && (
          <QrPackEntry
            productId={previewProductId}
            onChangeProduct={setPreviewProductId}
            onLaunchWhatsApp={(pid) => handleLaunchFromEntryTab("qr_pack", pid)}
          />
        )}

        {activeTab === "website" && (
          <WebsiteEntry
            onLaunchWhatsApp={() => handleLaunchFromEntryTab("website")}
          />
        )}

        {activeTab === "whatsapp" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <EntrySimulator
                config={entryConfig}
                onLaunchEntry={resetToEntry}
                onRestart={handleRestart}
              />
            </div>

            <div className="lg:col-span-7 flex flex-col items-center gap-4">
              <WhatsAppPhone
                messages={messages}
                step={step}
                isTyping={isTyping}
                draftText={draftText}
                draftVersion={draftVersion}
                onSendMessage={handleSendMessage}
                onAction={handleAction}
                onRestart={handleRestart}
              />

              <DebugStrip
                config={entryConfig}
                selectedProduct={selectedProduct}
                selectedSize={selectedSize}
                pincode={pincode}
                locationUsed={locationUsed}
                inStockSellers={inStockSellers}
                buyNowTapped={buyNowTapped}
                selfReportedOrdered={selfReportedOrdered}
                step={step}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
