"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import ReactMarkdown from "react-markdown";

const EMOJIS = [
  { id: "positive", label: "Olumlu", icon: <ThumbsUp className="size-4" /> },
  { id: "negative", label: "Olumsuz", icon: <ThumbsDown className="size-4" /> },
];

interface FeedbackWidgetProps {
  onSubmit?: (data: { rating: string; feedback: string }) => void;
  onClose?: () => void;
  className?: string;
  /** Text shown in the collapsed state */
  label?: string;
  /** Placeholder for the textarea */
  placeholder?: string;
}

export function FeedbackWidget({
  onSubmit,
  onClose,
  className,
  label = "Size yardımcı oldu mu?",
  placeholder = "Nasıl iyileştirebiliriz?",
}: FeedbackWidgetProps) {
  const [value, setValue] = React.useState<string>("");
  const [feedback, setFeedback] = React.useState("");
  const [isPreview, setIsPreview] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isExpanded = value !== "";
  const containerRef = React.useRef<HTMLDivElement>(null);

  const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  } as const;

  const handleValueChange = (val: string) => {
    if (val === "" || val === value) {
      setValue("");
      setIsPreview(false);
      onClose?.();
    } else {
      setValue(val);
      // Auto-focus the textarea after expansion
      setTimeout(() => {
        containerRef.current?.querySelector("textarea")?.focus();
      }, 100);
    }
  };

  const handleSend = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      // Call onSubmit if provided, otherwise handle locally
      if (onSubmit) {
        await onSubmit({ rating: value, feedback });
      } else {
        // Default behavior: log to console or send to API
        console.log('Feedback submitted:', { rating: value, feedback });
        // You can add API call here if needed
        // await fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ rating: value, feedback }) });
      }
      setValue("");
      setFeedback("");
      setIsPreview(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <motion.div
        ref={containerRef}
        layout
        transition={springTransition}
        initial={false}
        className={cn(
          "overflow-hidden border border-zinc-200 bg-[#f8f8f8] text-zinc-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] rounded-[28px]",
          isExpanded ? "w-full max-w-[420px]" : "w-fit",
        )}
      >
        <motion.div
          layout="position"
          className="px-6 py-3 md:px-5 md:py-2.5"
          transition={springTransition}
        >
          <div className="flex items-center justify-between gap-6">
            <motion.span
              layout="position"
              transition={springTransition}
              className="ml-2 cursor-default select-none whitespace-nowrap font-medium text-[14px] text-zinc-600 dark:text-zinc-400"
            >
              {label}
            </motion.span>

            <ToggleGroup.Root
              type="single"
              value={value}
              onValueChange={handleValueChange}
              className="flex items-center gap-1.5"
            >
              {EMOJIS.map((emoji) => (
                <ToggleGroup.Item key={emoji.id} value={emoji.id} asChild>
                  <button
                    title={emoji.label}
                    className={cn(
                      "relative rounded-full p-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500",
                      value === emoji.id
                        ? "text-white"
                        : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/5 dark:hover:text-zinc-300",
                    )}
                  >
                    <motion.div
                      layout="position"
                      transition={springTransition}
                      className="relative z-10 flex h-5 w-5 scale-110 items-center justify-center transition-transform active:scale-90"
                    >
                      {emoji.icon}
                    </motion.div>
                    {value === emoji.id && (
                      <motion.div
                        layoutId="active-bg"
                        className="absolute inset-0 rounded-full bg-blue-600"
                        transition={springTransition}
                      />
                    )}
                  </button>
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </div>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.25, ease: [0.32, 0, 0.2, 1] },
                  opacity: { duration: 0.2 },
                }}
                className="overflow-hidden"
              >
                <div className="px-1 pt-6 pb-2">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="select-none font-bold text-[10px] text-zinc-500 uppercase tracking-[0.1em] dark:text-zinc-500">
                      {isPreview ? "Önizleme" : "Geri bildirim"}
                    </span>
                    <button
                      onClick={() => setIsPreview(!isPreview)}
                      className="rounded-md bg-zinc-100 px-2 py-0.5 font-semibold text-[11px] text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      {isPreview ? "Düzenle" : "Önizleme"}
                    </button>
                  </div>

                  <div className="group/textarea relative">
                    <AnimatePresence mode="wait">
                      {isPreview ? (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="prose prose-sm scrollbar-none h-[140px] w-full max-w-none overflow-y-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-[14px] text-zinc-700 leading-relaxed dark:prose-invert dark:border-white/5 dark:bg-zinc-900/50 dark:text-zinc-300"
                        >
                          <ReactMarkdown>
                            {feedback || "*Önizlenecek bir şey yok...*"}
                          </ReactMarkdown>
                        </motion.div>
                      ) : (
                        <motion.textarea
                          key="editor"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          autoFocus
                          placeholder={placeholder}
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="scrollbar-none h-[140px] w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-[14px] text-zinc-800 leading-relaxed transition-all placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none dark:border-white/5 dark:bg-zinc-900/50 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-white/20"
                        />
                      )}
                    </AnimatePresence>

                    {!isPreview && (
                      <div className="pointer-events-none absolute right-4 bottom-3 flex select-none items-center gap-1.5 opacity-40 transition-opacity group-focus-within/textarea:opacity-80">
                        <span className="font-bold text-[10px] text-zinc-400 tracking-tight dark:text-zinc-500">
                          M↓
                        </span>
                        <span className="font-bold text-[10px] text-zinc-400 tracking-tight dark:text-zinc-500">
                          desteklenir
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 flex items-center justify-between border-zinc-200 border-t pt-4 dark:border-white/5"
                >
                  <p className="font-medium text-[11px] text-zinc-500 dark:text-zinc-500">
                    Geri bildiriminiz için teşekkür ederiz.
                  </p>
                  <button
                    onClick={handleSend}
                    disabled={!feedback.trim() || isSubmitting}
                    className="relative rounded-xl bg-zinc-900 px-6 py-2 font-bold text-[13px] text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:pointer-events-none disabled:opacity-30 disabled:grayscale dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white dark:border-black/20 dark:border-t-black"
                      />
                    ) : (
                      "Gönder"
                    )}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
