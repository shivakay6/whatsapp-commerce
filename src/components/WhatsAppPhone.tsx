import { useEffect, useRef, useState } from "react";
import {
  CheckCheck,
  ChevronRight,
  ExternalLink,
  List,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type {
  BotAction,
  ChatMessage,
  JourneyStep,
  SellerName,
} from "../types/chat";

interface WhatsAppPhoneProps {
  messages: ChatMessage[];
  step: JourneyStep;
  isTyping: boolean;
  draftText?: string;
  draftVersion?: number;
  onSendMessage: (text: string) => void;
  onAction: (action: BotAction, label?: string) => void;
  onRestart: () => void;
}

function ProductImage({
  src,
  alt,
  className = "w-full h-32 object-cover bg-stone-100",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-emerald-50 to-stone-100 flex flex-col items-center justify-center gap-1 px-2 text-center`}
      >
        <Package className="w-5 h-5 text-[#008069]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function SellerLogoBadge({ seller }: { seller: SellerName }) {
  const styles: Record<SellerName, { bg: string; fg: string; abbr: string }> = {
    "Parry's website": { bg: "bg-[#008069]", fg: "text-white", abbr: "P" },
    Blinkit: { bg: "bg-amber-300", fg: "text-stone-900", abbr: "B" },
    Zepto: { bg: "bg-violet-700", fg: "text-white", abbr: "Z" },
    "Swiggy Instamart": { bg: "bg-orange-500", fg: "text-white", abbr: "S" },
  };
  const s = styles[seller];
  return (
    <div
      className={`w-7 h-7 rounded-md ${s.bg} ${s.fg} font-display font-bold text-[11px] flex items-center justify-center shrink-0`}
      aria-hidden="true"
    >
      {s.abbr}
    </div>
  );
}

function getComposerState(step: JourneyStep, isTyping: boolean) {
  if (isTyping) {
    return {
      enabled: false,
      placeholder: "Parry's is replying...",
      numeric: false,
    };
  }
  if (step === "awaiting_entry_send") {
    return {
      enabled: true,
      placeholder: "Tap Send to start chat...",
      numeric: false,
    };
  }
  if (step === "enquiry") {
    return {
      enabled: true,
      placeholder: "Type what you're looking for...",
      numeric: false,
    };
  }
  if (step === "flow_a_pincode" || step === "buy_now_location") {
    return {
      enabled: true,
      placeholder: "Enter 6-digit pincode (e.g. 600001)",
      numeric: true,
    };
  }
  return {
    enabled: false,
    placeholder: "Use the buttons above...",
    numeric: false,
  };
}

export function WhatsAppPhone({
  messages,
  step,
  isTyping,
  draftText = "",
  draftVersion = 0,
  onSendMessage,
  onAction,
  onRestart,
}: WhatsAppPhoneProps) {
  const [inputValue, setInputValue] = useState(draftText);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const composer = getComposerState(step, isTyping);

  const latestInteractiveMsgId = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (
        m.sender === "bot" &&
        (m.replyButtons?.length ||
          m.listMenu ||
          m.productMatches?.length)
      ) {
        return m.id;
      }
    }
    return null;
  })();

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    setInputValue(draftText);
  }, [draftText, draftVersion]);

  useEffect(() => {
    if (composer.enabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [composer.enabled, step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || !composer.enabled) return;
    onSendMessage(trimmed);
    setInputValue("");
  };

  return (
    <div className="w-full max-w-[410px] bg-[#161917] p-2.5 rounded-[2.25rem] shadow-[0_20px_50px_-12px_rgba(17,27,33,0.22)]">
      <div className="relative bg-white rounded-[1.65rem] overflow-hidden flex flex-col h-[680px] max-h-[80vh]">
        {/* WhatsApp Green Header */}
        <header className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-white text-[#008069] font-display font-bold text-sm flex items-center justify-center shrink-0">
              P
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-semibold text-[15px] leading-tight truncate">
                  Parry&apos;s
                </span>
                <ShieldCheck
                  className="w-3.5 h-3.5 text-[#A7F3D0] shrink-0"
                  aria-label="Verified Business"
                />
              </div>
              <div className="text-[11px] text-white/80 leading-tight mt-0.5 truncate">
                {isTyping ? "typing..." : "Official Business Account"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onRestart}
            title="Restart chat"
            aria-label="Restart chat"
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </header>

        {/* Chat Messages Feed */}
        <div
          ref={scrollRef}
          className="wa-chat-bg flex-1 overflow-y-auto wa-scroll px-3.5 py-4 flex flex-col gap-3"
        >
          <div className="self-center bg-white/90 text-stone-600 text-[10.5px] font-medium px-3 py-1 rounded-lg shadow-[0_1px_1px_rgba(11,20,26,0.06)]">
            Today · EID Parry WhatsApp Assistant
          </div>

          {messages.length === 0 && step === "awaiting_entry_send" && (
            <div className="self-center max-w-[85%] bg-[#FFF5C4] text-[#54656F] text-[11.5px] leading-snug text-center px-3.5 py-2.5 rounded-xl shadow-[0_1px_1px_rgba(11,20,26,0.06)]">
              Your message is pre-filled below. Tap the green <span className="font-semibold text-[#111B21]">Send</span> button to start chatting with Parry&apos;s.
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isCustomer = msg.sender === "customer";
              const isInteractive = msg.id === latestInteractiveMsgId && !isTyping;

              if (isCustomer) {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="self-end max-w-[82%] bg-[#D9FDD3] text-[#111B21] rounded-2xl rounded-tr-sm px-3.5 py-2 shadow-[0_1px_1px_rgba(11,20,26,0.08)]"
                  >
                    <p className="text-[13.5px] leading-snug whitespace-pre-line">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-stone-500 tabular-nums">
                      <span>{msg.timestamp}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" aria-hidden="true" />
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="self-start w-full max-w-[92%] flex flex-col gap-2"
                >
                  {/* Product Photo Card */}
                  {msg.productCard && (
                    <div className="bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-[0_1px_2px_rgba(11,20,26,0.06)]">
                      <ProductImage
                        src={msg.productCard.product.image}
                        alt={msg.productCard.product.name}
                        className="w-full h-36 object-cover bg-stone-100"
                      />
                      <div className="px-3.5 py-2.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="text-[13.5px] font-semibold text-stone-900 leading-snug">
                            {msg.productCard.product.name}
                          </div>
                          {msg.productCard.size && (
                            <span className="text-[11.5px] font-medium text-[#075E54] whitespace-nowrap shrink-0">
                              {msg.productCard.size}
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-stone-600 leading-snug mt-0.5">
                          {msg.productCard.product.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Main Bot Bubble (either standard text OR unified WhatsApp Seller Results bubble) */}
                  {msg.sellerResults ? (
                    <div className="bg-white text-[#111B21] rounded-2xl rounded-tl-sm overflow-hidden shadow-[0_1px_1px_rgba(11,20,26,0.08)]">
                      {/* Header + Compact Product Context */}
                      <div className="px-3.5 pt-3 pb-2.5">
                        <p className="text-[13.5px] leading-snug">{msg.text}</p>
                        <div className="mt-2.5 flex items-center gap-2.5 bg-stone-50 rounded-lg p-2">
                          <ProductImage
                            src={msg.sellerResults.product.image}
                            alt={msg.sellerResults.product.name}
                            className="w-10 h-10 rounded-md object-cover bg-stone-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-[12.5px] font-semibold text-stone-900 truncate">
                              {msg.sellerResults.product.name}
                            </div>
                            <div className="text-[11px] text-stone-500">
                              Pack size: {msg.sellerResults.size}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Unified Hairline-Divided Seller Rows inside the single WhatsApp message */}
                      <div className="divide-y divide-stone-100 border-t border-stone-100">
                        {msg.sellerResults.sellers.map((item) => {
                          const hasDiscount = item.mrp > item.offer_price;

                          return (
                            <div key={item.seller} className="px-3.5 py-2.5">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <SellerLogoBadge seller={item.seller} />
                                  <span className="text-[13px] font-semibold text-stone-900 truncate">
                                    {item.seller}
                                  </span>
                                </div>

                                <div className="flex items-baseline gap-1.5 font-mono tabular-nums shrink-0">
                                  <span className="text-[13.5px] font-bold text-stone-900">
                                    ₹{item.offer_price}
                                  </span>
                                  {hasDiscount && (
                                    <span className="text-[11px] text-stone-400 line-through">
                                      ₹{item.mrp}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="mt-1.5 pl-[38px] flex items-center justify-between gap-2">
                                <span className="text-[11px] text-stone-500 truncate">
                                  {item.delivery_eta}
                                </span>

                                <a
                                  href={item.purchase_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() =>
                                    onAction({
                                      type: "tap_buy_now_seller",
                                      seller: item.seller,
                                    })
                                  }
                                  className="px-2.5 py-1 rounded-md bg-[#008069] hover:bg-[#075E54] text-white text-[11.5px] font-medium inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors"
                                >
                                  <span>Buy now</span>
                                  <ExternalLink className="w-3 h-3 shrink-0" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer Note + Timestamp */}
                      <div className="px-3.5 py-2.5 bg-stone-50/70 border-t border-stone-100">
                        <p className="text-[11px] text-stone-500 leading-snug">
                          Buying happens on the app or website you choose - you&apos;ll complete checkout and payment there.
                        </p>
                        <div className="flex justify-end mt-1 text-[10px] text-stone-400 tabular-nums">
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-[0_1px_1px_rgba(11,20,26,0.08)] ${
                        msg.isError
                          ? "bg-amber-50 border border-amber-200 text-stone-900"
                          : "bg-white text-[#111B21]"
                      }`}
                    >
                      <p className="text-[13.5px] leading-snug whitespace-pre-line">{msg.text}</p>
                      {msg.note && (
                        <p className="text-[11.5px] text-stone-500 mt-2 pt-2 border-t border-stone-100 leading-snug">
                          {msg.note}
                        </p>
                      )}
                      <div className="flex justify-end mt-1 text-[10px] text-stone-400 tabular-nums">
                        {msg.timestamp}
                      </div>
                    </div>
                  )}

                  {/* Gemini Enquiry Product Match Cards */}
                  {msg.productMatches && msg.productMatches.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {msg.productMatches.map((card) => (
                        <div
                          key={card.product.id}
                          className="bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-[0_1px_2px_rgba(11,20,26,0.06)]"
                        >
                          <ProductImage
                            src={card.product.image}
                            alt={card.product.name}
                            className="w-full h-28 object-cover bg-stone-100"
                          />
                          <div className="p-3 flex flex-col gap-1.5">
                            <div className="text-[13.5px] font-semibold text-stone-900 leading-snug">
                              {card.product.name}
                            </div>
                            <p className="text-[12px] text-stone-600 leading-snug">
                              {card.product.description}
                            </p>
                            <p className="text-[11.5px] text-[#075E54] bg-[#008069]/[0.06] rounded-md px-2.5 py-1.5 leading-snug">
                              {card.reason}
                            </p>
                            <button
                              type="button"
                              disabled={!isInteractive}
                              onClick={() =>
                                onAction(
                                  { type: "select_product", productId: card.product.id },
                                  card.product.name
                                )
                              }
                              className="mt-1 w-full py-2 px-3 rounded-lg bg-[#008069] hover:bg-[#075E54] disabled:bg-stone-200 disabled:text-stone-500 text-white text-xs font-medium transition-colors cursor-pointer disabled:cursor-default"
                            >
                              Choose this
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stockist Cards (Flow A) */}
                  {msg.stockistCards && msg.stockistCards.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {msg.stockistCards.map((item) => (
                        <div
                          key={item.stockist.id}
                          className="bg-white rounded-xl p-3 border border-stone-200/80 shadow-[0_1px_2px_rgba(11,20,26,0.06)] flex flex-col gap-1.5"
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-[13px] font-semibold text-stone-900 leading-snug">
                              {item.stockist.name}
                            </span>
                            <span className="text-[11px] font-medium text-[#075E54] whitespace-nowrap shrink-0 tabular-nums">
                              {item.approxDistance}
                            </span>
                          </div>
                          <p className="text-[12px] text-stone-600 leading-snug">
                            {item.stockist.address}
                          </p>
                          <div className="flex items-center gap-1.5 text-[12px] font-mono tabular-nums text-stone-700">
                            <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                            <span>{item.stockist.phone}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 leading-snug pt-1 border-t border-stone-100">
                            {item.categoryNote}
                          </p>
                          <a
                            href={item.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-[#008069] text-xs font-medium transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            Open in Maps
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Clickable Link Buttons */}
                  {msg.linkButtons && msg.linkButtons.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      {msg.linkButtons.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-stone-50 border border-stone-200/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2 text-[#008069] shadow-[0_1px_1px_rgba(11,20,26,0.06)] transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="text-[13px] font-medium truncate">{link.label}</div>
                            {link.badgeText && (
                              <div className="text-[11px] text-stone-500 truncate">
                                {link.badgeText}
                              </div>
                            )}
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* WhatsApp List Menu */}
                  {msg.listMenu && (
                    <div className="bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-[0_1px_2px_rgba(11,20,26,0.06)]">
                      <div className="px-3.5 py-2 bg-stone-50 border-b border-stone-100 flex items-center gap-2 text-[12px] font-semibold text-[#008069]">
                        <List className="w-3.5 h-3.5" />
                        <span>{msg.listMenu.title}</span>
                      </div>
                      <div className="divide-y divide-stone-100">
                        {msg.listMenu.items.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            disabled={!isInteractive}
                            onClick={() => onAction(item.action, item.title)}
                            className="w-full min-h-[48px] px-3.5 py-2.5 flex items-center justify-between gap-2.5 text-left hover:bg-stone-50 disabled:hover:bg-white disabled:opacity-55 transition-colors cursor-pointer disabled:cursor-default"
                          >
                            {item.image && (
                              <ProductImage
                                src={item.image}
                                alt={item.title}
                                className="w-11 h-11 rounded-lg object-cover bg-stone-100 shrink-0"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="text-[13px] font-medium text-stone-900 leading-snug">
                                {item.title}
                              </div>
                              {item.subtitle && (
                                <div className="text-[11px] text-stone-500 leading-snug mt-0.5 line-clamp-2">
                                  {item.subtitle}
                                </div>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick-Reply Buttons (Max 3 per message) */}
                  {msg.replyButtons && msg.replyButtons.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      {msg.replyButtons.slice(0, 3).map((btn) => (
                        <button
                          key={btn.id}
                          type="button"
                          disabled={!isInteractive}
                          onClick={() => onAction(btn.action, btn.label)}
                          className="w-full min-h-[40px] bg-white hover:bg-stone-50 disabled:opacity-55 border border-stone-200/80 rounded-xl px-3.5 py-2 text-[13px] font-medium text-[#008069] disabled:text-stone-500 text-center shadow-[0_1px_1px_rgba(11,20,26,0.06)] transition-colors cursor-pointer disabled:cursor-default"
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isTyping && (
            <div className="self-start bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-[0_1px_1px_rgba(11,20,26,0.08)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:-0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:-0.1s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
            </div>
          )}
        </div>

        {/* Bottom Text Input Composer */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#F0F2F5] px-3 py-2.5 flex items-center gap-2 border-t border-stone-200/70 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            inputMode={composer.numeric ? "numeric" : "text"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!composer.enabled}
            placeholder={composer.placeholder}
            aria-label="WhatsApp message input"
            className="flex-1 bg-white disabled:bg-stone-100 rounded-full px-4 py-2 text-[13.5px] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#008069]/30"
          />
          <button
            type="submit"
            disabled={!composer.enabled || !inputValue.trim()}
            aria-label="Send message"
            className="w-10 h-10 rounded-full bg-[#008069] hover:bg-[#075E54] disabled:bg-stone-300 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer disabled:cursor-default"
          >
            <Send className="w-4 h-4 translate-x-[1px]" />
          </button>
        </form>
      </div>
    </div>
  );
}
