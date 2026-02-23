"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const STEPS: {
  title: string;
  description: string;
  content?: React.ReactNode;
}[] = [
  {
    title: "Kayıt",
    description: "Hesap oluşturun ve e-posta doğrulamasını tamamlayın.",
  },
  {
    title: "Tarama",
    description:
      "Sitenizi ekleyin; alan adınızı tarayıp yapılandırmanızı hazırlıyoruz.",
    content: (
      <div className="inline-block p-2 border rounded-lg bg-muted/30">
        <div className="size-28 flex items-center justify-center rounded bg-muted text-muted-foreground text-xs">
          QR / Tarama alanı
        </div>
      </div>
    ),
  },
  {
    title: "Paket seçimi",
    description: "İhtiyacınıza uygun paketi seçin.",
    content: (
      <div className="flex flex-wrap gap-2">
        {["Starter", "Pro", "Enterprise"].map((p) => (
          <button
            key={p}
            type="button"
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium",
              "bg-background hover:bg-accent hover:text-accent-foreground",
              "transition-colors"
            )}
          >
            {p}
          </button>
        ))}
      </div>
    ),
  },
  {
    title: "Özet",
    description: "Seçimlerinizi kontrol edip onaylayın.",
    content: (
      <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
        Paket: Pro · Ödeme: Aylık · Site: example.com
      </div>
    ),
  },
];

export function OnboardStepsCard() {
  return (
    <Card className="flex w-full max-w-[500px] shadow-none flex-col gap-6 p-5 md:p-8">
      <CardHeader className="flex flex-col items-center gap-2">
        <div className="relative flex size-[68px] shrink-0 items-center justify-center rounded-full backdrop-blur-xl md:size-24 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-neutral-500 before:to-transparent before:opacity-10">
          <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-background dark:bg-muted/80 shadow-xs ring-1 ring-inset ring-border md:size-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="size-6 text-muted-foreground/80 md:size-8"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082M13.5 15a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1.401A2.999 2.999 0 0 1 12 8a3 3 0 0 1 1.5 5.599z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 text-center">
          <CardTitle className="md:text-xl font-medium">
            Kurulum adımları
          </CardTitle>
          <CardDescription className="tracking-[-0.006em]">
            Kayıt, tarama, paket seçimi ve özet.
          </CardDescription>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <div className="grid items-start justify-start grid-cols-1">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-row items-start gap-3 last:after:hidden after:absolute after:top-9 after:bottom-2 after:left-0 after:w-px after:bg-border",
                index !== STEPS.length - 1 && "pb-6"
              )}
            >
              <div className="flex flex-col items-center self-stretch">
                <span className="z-10 text-xs font-semibold flex shrink-0 items-center justify-center rounded-full bg-muted ring-1 ring-inset ring-border text-foreground size-7">
                  {index + 1}
                </span>
              </div>
              <div className="flex flex-col items-start min-w-0">
                <p className="text-sm leading-5 tracking-[-0.006em] font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="text-sm leading-5 tracking-[-0.006em] text-muted-foreground">
                  {step.description}
                </p>
                {step.content && (
                  <div className="mt-2.5 w-full">{step.content}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default OnboardStepsCard;
