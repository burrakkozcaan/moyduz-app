"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, CornerDownLeft, CircleCheck, GitBranch, Plus, Play, Signature, Mail, Database, Send, ListChecks, Rocket } from "lucide-react";
import { AnimatedBadge } from "./new-ui/Animated-Badge";

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.99971 2.37354C8.34581 2.37354 8.62638 2.6541 8.62638 3.0002V7.37354H12.9997C13.3458 7.37354 13.6264 7.6541 13.6264 8.0002C13.6264 8.3463 13.3458 8.62687 12.9997 8.62687H8.62638V13.0002C8.62638 13.3463 8.34581 13.6269 7.99971 13.6269C7.65362 13.6269 7.37305 13.3463 7.37305 13.0002V8.62687H2.99971C2.65362 8.62687 2.37305 8.3463 2.37305 8.0002C2.37305 7.6541 2.65362 7.37354 2.99971 7.37354H7.37305V3.0002C7.37305 2.6541 7.65361 2.37354 7.99971 2.37354Z" fill="currentColor" />
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M10.7783 2.44434L5.22276 7.99989L10.7783 13.5554" stroke="currentColor" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M5.22168 2.44434L10.7772 7.99989L5.22168 13.5554" stroke="currentColor" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function AISuggestionsCardContent() {
  return (
    <div className="min-w-[14rem] mx-auto p-3">
      <div className="relative rounded-lg p-3">
        <div className="relative flex w-fit items-center gap-1">
          <div className="absolute inset-0 h-5 rounded bg-gradient-to-r from-indigo-500/15 via-indigo-500/15 to-emerald-500/15" />
          <span className="relative text-xs">Siteyi nasıl iyileştiririm</span>
          <span className="relative h-5 w-px flex-shrink-0 animate-pulse bg-primary" />
        </div>
      </div>
      <div className="mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-black/6.5">
        <div className="flex items-center gap-2 border-b border-ln-orange/30 bg-ln-orange/10 px-3 py-2">
          <Sparkles className="size-3.5 text-ln-orange" />
          <span className="text-xs font-medium">Akıllı Öneriler</span>
        </div>
        <div className="divide-y divide-border">
          <div className="flex cursor-pointer items-center gap-2 bg-primary/5 px-3 py-2.5 transition-colors">
            <span className="flex-1 text-xs">...SEO meta etiketlerini iyileştir?</span>
            <span className="flex items-center gap-1 rounded bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
              <CornerDownLeft className="size-2.5" /> Sekme
            </span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 px-3 py-2.5 transition-colors hover:bg-muted/50">
            <span className="flex-1 text-xs text-muted-foreground">...sayfa yükleme hızını artır?</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 px-3 py-2.5 transition-colors hover:bg-muted/50">
            <span className="flex-1 text-xs text-muted-foreground">...Core Web Vitals skorunu yükselt?</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>3 öneri</span>
        <span className="flex items-center gap-1">
          <span className="rounded bg-background px-1">↑</span>
          <span className="rounded bg-background px-1">↓</span>
          gezinmek için
        </span>
      </div>
    </div>
  );
}

function WorkflowCompletedCardContent() {
  return (
    <div className="mx-auto p-3">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-md shadow-black/6.5">
        <CircleCheck className="size-4 fill-emerald-500/15 text-emerald-500" />
        <span className="text-sm font-medium text-foreground">İş akışı tamamlandı</span>
      </div>
      <div className="relative space-y-4 pl-6 pt-6">
        <div className="absolute bottom-8 left-6 top-0 border-l border-dashed border-foreground/15" />
        <div className="relative pl-6">
          <div className="absolute bottom-1/2 left-0 top-0 w-6 rounded-bl-full border-b border-l border-dashed border-foreground/15" />
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow">
            <ListChecks className="size-3.5 flex-shrink-0 text-violet-500 dark:text-violet-400" />
            <span className="text-xs font-medium text-muted-foreground">Görev oluşturuldu <span className="pl-0.5 text-foreground/50 text-xs">12 sn önce</span></span>
          </div>
        </div>
        <div className="relative pl-6">
          <div className="absolute bottom-1/2 left-0 top-0 w-6 rounded-bl-full border-b border-l border-dashed border-foreground/15" />
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow">
            <GitBranch className="size-3.5 flex-shrink-0 text-blue-500 dark:text-blue-400" />
            <span className="text-xs font-medium text-muted-foreground">Dal oluşturuldu <span className="pl-0.5 text-foreground/50 text-xs">3 sn önce</span></span>
          </div>
        </div>
        <div className="relative pl-6">
          <div className="absolute bottom-1/2 left-0 top-0 w-6 rounded-bl-full border-b border-l border-dashed border-foreground/15" />
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow">
            <Rocket className="size-3.5 flex-shrink-0 text-emerald-500 dark:text-emerald-400" />
            <span className="text-xs font-medium text-muted-foreground">Önizleme yayında <span className="pl-0.5 text-foreground/50 text-xs">şimdi</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TokenUsageCardContent() {
  return (
    <div className="flex w-full justify-center px-2">
      <div className="min-w-0 max-w-[16rem] scale-90">
        <div className="rounded-t-2xl border border-border bg-transparent px-2 pt-3 shadow-lg shadow-black/6.5">
          <div className="mb-2 text-center text-xs font-medium text-muted-foreground">Kullanım</div>
          <div className="flex flex-col gap-3 rounded-t-xl border border-border bg-transparent px-3 pt-3 shadow">
            <div className="space-y-3 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-xs text-foreground">Kullanıcı prompt tokenları</span>
                  <span className="font-medium text-foreground">43%</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Premium model kullanımı başına bir prompt kredisi kullanır.</p>
                <div className="relative mt-3">
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-foreground/5">
                    <div className="absolute inset-y-0 left-0 w-[43%] rounded-full bg-gradient-to-l from-primary to-emerald-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">550 / 1,500</span>
                  <span className="text-emerald-500">950 kaldı</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="rounded-md border border-border bg-muted/50 p-1.5 text-center">
                  <div className="text-muted-foreground">Tahmini maliyet</div>
                  <div className="font-medium text-foreground">$0.25</div>
                </div>
                <div className="rounded-md border border-border bg-muted/50 p-1.5 text-center">
                  <div className="text-muted-foreground">İstekler</div>
                  <div className="font-medium text-foreground">48</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpendingLimitCardContent() {
  return (
    <div className="mx-auto p-3">
      <div className="relative z-10 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-black/10">
        <div className="font-medium text-foreground">
          <span className="bg-amber-100 dark:bg-amber-900/40 py-1 text-amber-900 dark:text-amber-200">Harcama</span> limiti
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">Yeni kullanıcılar – İlk kullanıcı birincil kanal grubu</p>
        <div className="relative mb-4 mt-4 flex">
          <div className="h-5 w-1/5 rounded-l-md bg-amber-500/70 dark:bg-amber-500/50" />
          <div className="h-5 w-1/5 bg-primary transition-[width] duration-300 group-hover:w-2/5" />
          <div className="h-5 w-3/5 rounded-r-md border border-border bg-[length:5px_5px] transition-[width] duration-300 group-hover:w-2/5 [background-image:linear-gradient(-90deg,var(--tw-gradient-from)_25%,transparent_25%,transparent_50%,var(--tw-gradient-from)_50%,var(--tw-gradient-from)_75%,transparent_75%,transparent)] [--tw-gradient-from:rgb(0_0_0_/_0.08)] dark:[--tw-gradient-from:rgb(255_255_255/0.1)]" />
        </div>
        <div className="flex gap-1 border-b border-dashed border-border pb-3">
          <div className="w-2/5">
            <div className="text-xl font-medium text-foreground">40%</div>
            <div className="text-sm text-muted-foreground">Kullanılan</div>
          </div>
          <div className="w-3/5">
            <div className="text-xl font-medium text-foreground">60%</div>
            <div className="text-sm text-muted-foreground">Serbest</div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            <div className="size-1.5 rounded-full bg-amber-500/80" />
            <div className="line-clamp-1 text-sm font-medium">Koşu <span className="text-muted-foreground">(%20)</span> ortalama 12 dakika</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            <div className="size-1.5 rounded-full bg-primary" />
            <div className="line-clamp-1 text-sm font-medium">Yüzme <span className="text-muted-foreground">(%20)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsCardContent() {
  return (
    <div className="flex w-full flex-col items-center gap-3 px-2">
      {/* Orange "Entegrasyon Aktif!" block */}
      <div className="relative flex w-full max-w-[16rem] gap-2 overflow-hidden rounded-xl border border-ln-orange/30 bg-ln-orange/5 p-3 pr-6 shadow-md shadow-black/[0.065] backdrop-blur">
        <div
          className="absolute inset-1 w-1/2 rounded-l-lg border border-ln-orange/20 opacity-20 [background-size:5px_5px]"
          style={{
            backgroundImage: "linear-gradient(-45deg, var(--color-ln-orange) 25%, transparent 25%, transparent 50%, var(--color-ln-orange) 50%, var(--color-ln-orange) 75%, transparent 75%, transparent)",
          }}
        />
        <div className="relative flex size-7 shrink-0 items-center justify-center rounded-full border border-ln-orange/30 bg-background">
          <Signature className="m-auto size-3.5 text-ln-orange" strokeWidth={2} />
        </div>
        <div className="relative min-w-0 flex-1 text-left">
          <div className="mb-2">
            <div className="text-xs font-medium text-foreground">Entegrasyon Aktif!</div>
            <div className="line-clamp-1 text-[10px] text-muted-foreground">Gemini, Replit ve diğer servisleri bağlıyoruz</div>
          </div>
          <span className="inline-flex h-6 cursor-pointer items-center justify-center rounded-md border border-transparent bg-card px-2.5 text-[10px] font-medium shadow-sm shadow-black/10 transition-colors hover:bg-muted/50">
            Bağlantıyı Görüntüle
          </span>
        </div>
      </div>
      {/* Gemini + Replit list (smaller) */}
      <div className="w-full max-w-[14rem]">
        <div className="rounded-xl border border-border bg-card px-2 py-2 shadow-md shadow-black/5">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-dashed border-border py-2 last:border-b-0">
            <div className="flex size-7 items-center justify-center rounded-md border border-foreground/5 bg-muted">
              <svg viewBox="0 0 296 298" fill="none" className="size-3.5">
                <path fill="#3689FF" d="M148 0c-20 0-40 10-55 28L0 149l93 121c15 18 35 28 55 28s40-10 55-28l93-121-93-121C188 10 168 0 148 0z" />
                <path fill="#F6C013" d="M74 120a40 40 0 1 0 0 58 40 40 0 0 0 0-58z" />
                <path fill="#FA4340" d="M148 40l60 80-60 78-60-78 60-80z" />
                <path fill="#14BB69" d="M148 218l60-80-60-78-60 78 60 80z" />
              </svg>
            </div>
            <div className="min-w-0 space-y-0.5">
              <h3 className="text-xs font-medium">Gemini</h3>
              <p className="line-clamp-1 text-[10px] text-muted-foreground">Google arama motoru.</p>
            </div>
            <button type="button" className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded border border-transparent bg-card shadow-sm transition-colors hover:bg-muted/50" aria-label="Ekle">
              <Plus className="size-3" />
            </button>
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-dashed border-border py-2 last:border-b-0">
            <div className="flex size-7 items-center justify-center rounded-md border border-foreground/5 bg-muted">
              <svg viewBox="0 0 20 24" fill="none" className="size-3.5">
                <path d="M0 1.5C0 0.672 0.672 0 1.5 0H8.5C9.328 0 10 0.672 10 1.5V8H1.5C0.672 8 0 7.328 0 6.5V1.5z" fill="#F26207" />
                <path d="M10 8h8.5C19.328 8 20 8.672 20 9.5v5C20 15.328 19.328 16 18.5 16H10V8z" fill="#F26207" />
                <path d="M0 17.5C0 16.672 0.672 16 1.5 16H10v6.5C10 23.328 9.328 24 8.5 24H1.5C0.672 24 0 23.328 0 22.5V17.5z" fill="#F26207" />
              </svg>
            </div>
            <div className="min-w-0 space-y-0.5">
              <h3 className="text-xs font-medium">Replit</h3>
              <p className="line-clamp-1 text-[10px] text-muted-foreground">Build, deploy, host.</p>
            </div>
            <button type="button" className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded border border-transparent bg-card shadow-sm transition-colors hover:bg-muted/50" aria-label="Ekle">
              <Plus className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TranslationCardContent() {
  return (
    <div className="min-w-[18rem] max-w-[18rem] mx-auto p-3">
      <div className="space-y-3">
        <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)" }}>
          <p className="text-sm leading-6">
            Corporis voluptates voluptatem atque excepturi, tempore dolor distinctio libero dicta vel, nihil rem consequatur esse aspernatur nostrum, minus magnam labore quas optio?
          </p>
        </div>
        <div className="flex w-fit items-center gap-1">
          <span className="rounded bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-sm text-transparent">Auto translated from English</span>
        </div>
        <div className="rounded-xl border border-primary/50 bg-card p-3 shadow-md shadow-black/6.5">
          <div className="mb-3 text-xs text-muted-foreground">Spanish</div>
          <p className="text-sm leading-6 text-foreground">
            Hola, ¿cómo puedo ayudarte hoy? Estoy aquí para responder cualquier pregunta que tengas sobre nuestros servicios y productos.
          </p>
        </div>
      </div>
    </div>
  );
}

function EmailMockupCardContent() {
  return (
    <div className="flex w-full justify-center px-2" style={{ maskImage: "linear-gradient(to bottom, black 25%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 25%, transparent 100%)" }}>
      <div className="min-w-0 max-w-[14rem] scale-90">
        <div className="rounded-xl border border-border bg-transparent p-4 pb-10 pt-1.5 shadow-xl shadow-black/6.5">
          <div className="divide-y border-b text-[10px] [&>*]:flex [&>*]:h-7 [&>*]:items-center [&>*]:py-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-foreground/50">Alıcı:</span>
                <div className="flex cursor-pointer gap-1 rounded-full border border-border bg-card p-0.5 pr-2 shadow-md shadow-black/6.5">
                  <div className="relative size-3 overflow-hidden rounded-full border border-foreground/20 before:absolute before:inset-0 before:rounded-full before:border">
                    <img alt="Moyduz" src="/images/team/moyduz.svg" width={12} height={12} className="size-full object-contain" />
                  </div>
                  <span className="text-[10px] font-medium">Moyduz</span>
                </div>
              </div>
              <div className="flex size-5 items-center justify-center rounded-full border bg-foreground/10">
                <Plus className="m-auto size-2.5" />
              </div>
            </div>
            <div className="flex gap-1"><span className="text-foreground/50">Bilgi:</span></div>
            <div className="flex gap-1"><span className="text-foreground/50">Konu:</span></div>
            <div className="flex gap-1"><span className="text-foreground/50">Gönderen:</span></div>
          </div>
          <div className="mt-4 space-y-1 text-center text-xs leading-5 text-muted-foreground">
            <p>
              Destek ekibimiz 7/24 yanınızda. Sorularınız için bize yazın.
            </p>
            <p className="mt-2">— Moyduz Destek</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailToClientsWorkflowCardContent() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex w-full max-w-[13rem] items-center gap-2 rounded-xl  border-orange-200 bg-orange-500/20 px-3 py-2 shadow-md dark:border-orange-800 dark:bg-orange-500/25">
        <Mail className="size-4 shrink-0 text-orange-600 dark:text-orange-400" />
        <span className="text-xs font-medium text-orange-900 dark:text-orange-100">Tüm müşterilere e-posta gönder</span>
      </div>
      <div className="w-full max-w-[14rem] rounded-xl  border-orange-200/80 bg-orange-50 p-3 shadow-lg dark:border-orange-800/80 dark:bg-orange-950/60">
        <div className="mb-2 flex items-center gap-1.5 border-b border-ln-gray-200/60 pb-2 text-[10px] dark:border-orange-800/60">
          <span className="text-orange-700 dark:text-orange-400">Alıcı:</span>
          <span className="font-medium text-orange-900 dark:text-orange-100">Tüm müşteriler</span>
        </div>
        <div className="rounded-lg bg-orange-100/80 px-3 py-2.5 text-center text-sm text-orange-900 dark:bg-orange-900/50 dark:text-orange-100">
          Merhaba, nasılsınız?
        </div>
      </div>
    </div>
  );
}

function BulkEmailCardContent() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex w-full max-w-[13rem] items-center gap-2 rounded-xl  bg-blue-500/20 px-3 py-2 shadow-md dark:border-blue-800 dark:bg-blue-500/25">
        <Send className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
        <span className="text-xs font-medium text-blue-900 dark:text-blue-100">Toplu e-posta kampanyası</span>
      </div>
      <div className="w-full max-w-[14rem] rounded-xl  p-3 shadow-lg dark:border-blue-800/80 dark:bg-blue-950/50">
        <div className="mb-2 flex items-center justify-between border-b-2 border-white/10 pb-2 text-[10px] dark:border-blue-800/60">
          <span className="font-medium text-blue-900 dark:text-blue-100">Alıcı listesi</span>
          <span className="rounded bg-blue-200/80 px-1.5 py-0.5 text-blue-800 dark:bg-blue-800/60 dark:text-blue-200">1.250</span>
        </div>
        <div className="space-y-1.5">
          {["Bülten aboneleri", "Kampanya segmenti", "CRM listesi"].map((label) => (
            <div key={label} className="flex items-center gap-2 rounded-md bg-white/80 px-2 py-1.5 text-[10px] dark:bg-blue-900/30">
              <Mail className="size-3 shrink-0 text-blue-500" />
              <span className="text-blue-900 dark:text-blue-100">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[9px] text-blue-700/80 dark:text-blue-300/80">Tek tıkla toplu mail gönderimi</p>
      </div>
    </div>
  );
}

function DataScrapeCardContent() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex w-full max-w-[13rem] items-center gap-2 rounded-xl border border-violet-200 bg-violet-500/20 px-3 py-2 shadow-md dark:border-violet-800 dark:bg-violet-500/25">
        <Database className="size-4 shrink-0 text-violet-600 dark:text-violet-400" />
        <span className="text-xs font-medium text-violet-900 dark:text-violet-100">Veri toplama & scrape</span>
      </div>
      <div className="w-full max-w-[14rem] rounded-xl border border-violet-200/80 bg-violet-50/80 p-3 shadow-lg dark:border-violet-800/80 dark:bg-violet-950/50">
        <div className="mb-2 flex flex-wrap gap-1.5 border-b border-violet-200/60 pb-2 dark:border-violet-800/60">
          <span className="rounded-md bg-violet-200/80 px-2 py-0.5 text-[9px] font-medium text-violet-800 dark:bg-violet-800/60 dark:text-violet-200">Kategori</span>
          <span className="rounded-md bg-violet-200/80 px-2 py-0.5 text-[9px] font-medium text-violet-800 dark:bg-violet-800/60 dark:text-violet-200">Marka</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] dark:bg-violet-900/30">
            <span className="text-violet-900 dark:text-violet-100">Elektronik · Marka A</span>
            <span className="text-violet-600 dark:text-violet-400">2.340 kayıt</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] dark:bg-violet-900/30">
            <span className="text-violet-900 dark:text-violet-100">Giyim · Marka B</span>
            <span className="text-violet-600 dark:text-violet-400">1.890 kayıt</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] dark:bg-violet-900/30">
            <span className="text-violet-900 dark:text-violet-100">Kozmetik · Marka C</span>
            <span className="text-violet-600 dark:text-violet-400">956 kayıt</span>
          </div>
        </div>
        <p className="mt-2 text-center text-[9px] text-violet-700/80 dark:text-violet-300/80">Kategori ve markaya göre veri çekme</p>
      </div>
    </div>
  );
}

const WhatsAppLogo = ({ className = "size-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function WhatsAppBulkCardContent() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-4">
      {/* Header: WhatsApp icon + label */}
      <div className="flex items-center gap-2.5 rounded-2xl bg-[#25D366]/15 px-3 py-1.5 shadow-sm ring-1 ring-[#25D366]/30 dark:bg-[#25D366]/20 dark:ring-[#25D366]/40">
        <div className="flex size-6 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
          <WhatsAppLogo className="size-3.5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-[#128C7E] dark:text-[#25D366]">WhatsApp</span>
          <span className="text-[10px] text-emerald-800/90 dark:text-emerald-200/90">Toplu mesaj · 200 kişi (günlük)</span>
        </div>
      </div>

      {/* Mini chat preview */}
      <div className="w-full max-w-[15rem] overflow-hidden rounded-2xl bg-[#ECE5DD] shadow-lg ring-1 ring-black/5 dark:bg-[#1f2c33] dark:ring-white/5">
        <div className="flex items-center gap-2 border-b border-black/5 bg-[#075E54] px-3 py-2 dark:border-white/5 dark:bg-[#0b141a]">
          <div className="flex size-7 items-center justify-center rounded-full bg-[#25D366] text-white">
            <WhatsAppLogo className="size-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-medium text-white">Toplu mesaj listesi</p>
            <p className="truncate text-[9px] text-white/70">200 alıcı</p>
          </div>
        </div>
        <div className="space-y-2 p-2.5">
          {/* Outgoing bubble */}
          <div className="ml-6 rounded-lg rounded-tr-sm bg-[#D9FDD3] px-2.5 py-1.5 shadow-sm dark:bg-[#005c4b]">
            <p className="text-[10px] text-[#111b21] dark:text-[#e9edef]">Merhaba, kampanya mesajınız burada…</p>
            <span className="mt-0.5 block text-[8px] text-[#667781] dark:text-[#8696a0]">12:34</span>
          </div>
          {/* Incoming placeholder */}
          <div className="mr-6 rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 shadow-sm dark:bg-[#202c33]">
            <p className="text-[10px] text-[#111b21] dark:text-[#e9edef]">✓ 200 kişiye iletildi</p>
            <span className="mt-0.5 block text-[8px] text-[#667781] dark:text-[#8696a0]">12:35</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeminiIcon() {
  return (
    <svg viewBox="0 0 296 298" fill="none" className="size-5 flex-shrink-0">
      <path fill="#3186FF" d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z" />
    </svg>
  );
}
function OpenAIIcon() {
  return (
    <svg className="size-5 flex-shrink-0 fill-foreground" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260">
      <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
    </svg>
  );
}
function DeepseekIcon() {
  return (
    <svg className="size-5 flex-shrink-0" style={{ flex: "none", lineHeight: 1 }} viewBox="0 0 24 24">
      <path fill="#4D6BFE" d="M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 0 1-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 0 0-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 0 1-.465.137 9.597 9.597 0 0 0-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 0 0 1.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 0 1 1.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 0 1 .415-.287.302.302 0 0 1 .2.288.306.306 0 0 1-.31.307.303.303 0 0 1-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 0 1-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 0 1 .016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 0 1-.254-.078.253.253 0 0 1-.114-.358c.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z" />
    </svg>
  );
}
function MistralIcon() {
  return (
    <svg className="size-5 flex-shrink-0" preserveAspectRatio="xMidYMid" viewBox="0 0 256 233">
      <path d="M186.18182 0h46.54545v46.54545h-46.54545z" />
      <path fill="#F7D046" d="M209.45454 0h46.54545v46.54545h-46.54545z" />
      <path d="M0 0h46.54545v46.54545H0zM0 46.54545h46.54545V93.0909H0zM0 93.09091h46.54545v46.54545H0zM0 139.63636h46.54545v46.54545H0zM0 186.18182h46.54545v46.54545H0z" />
      <path fill="#F7D046" d="M23.27273 0h46.54545v46.54545H23.27273z" />
      <path fill="#F2A73B" d="M209.45454 46.54545h46.54545V93.0909h-46.54545zM23.27273 46.54545h46.54545V93.0909H23.27273z" />
      <path d="M139.63636 46.54545h46.54545V93.0909h-46.54545z" />
      <path fill="#F2A73B" d="M162.90909 46.54545h46.54545V93.0909h-46.54545zM69.81818 46.54545h46.54545V93.0909H69.81818z" />
      <path fill="#EE792F" d="M116.36364 93.09091h46.54545v46.54545h-46.54545zM162.90909 93.09091h46.54545v46.54545h-46.54545zM69.81818 93.09091h46.54545v46.54545H69.81818z" />
      <path d="M93.09091 139.63636h46.54545v46.54545H93.09091z" />
      <path fill="#EB5829" d="M116.36364 139.63636h46.54545v46.54545H116.36364z" />
      <path fill="#EE792F" d="M209.45454 93.09091h46.54545v46.54545h-46.54545zM23.27273 93.09091h46.54545v46.54545H23.27273z" />
      <path d="M186.18182 139.63636h46.54545v46.54545h-46.54545z" />
      <path fill="#EB5829" d="M209.45454 139.63636h46.54545v46.54545h-46.54545z" />
      <path d="M186.18182 186.18182h46.54545v46.54545h-46.54545z" />
      <path fill="#EB5829" d="M23.27273 139.63636h46.54545v46.54545H23.27273z" />
      <path fill="#EA3326" d="M209.45454 186.18182h46.54545v46.54545h-46.54545zM23.27273 186.18182h46.54545v46.54545H23.27273z" />
    </svg>
  );
}
function QwenIcon() {
  return (
    <svg className="size-5 flex-shrink-0 fill-foreground" fillRule="evenodd" style={{ flex: "none", lineHeight: 1 }} viewBox="0 0 24 24">
      <title>Qwen</title>
      <path d="M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z" />
    </svg>
  );
}

function ModelsCardContent() {
  const radialMask = "radial-gradient(ellipse 100% 100% at 0% 0%, black 75%, transparent 100%)";
  return (
    <div className="pl-6 pt-1 [transform:rotateX(5deg)_rotateZ(6deg)_rotate(-4deg)]" style={{ maskImage: radialMask, WebkitMaskImage: radialMask }}>
      <div className="rounded-tl-2xl border border-border bg-white/75 px-2 pt-4 shadow-lg shadow-black/[0.065] dark:bg-black/20">
        <div className="mb-3 flex items-center gap-2.5 px-3 font-medium text-muted-foreground">
          Modeller
          <Play className="size-2.5 translate-y-0.5 rotate-90 fill-current opacity-50" stroke="currentColor" strokeWidth={2} />
        </div>
        <div className="flex flex-col gap-5 rounded-tl-xl border border-border bg-muted/30 pl-5 pt-5 shadow">
          <div className="flex origin-bottom items-center gap-2.5 [&>svg]:size-5">
            <GeminiIcon />
            <span className="text-base">Gemini</span>
          </div>
          <div className="flex origin-bottom items-center gap-2.5 [&>svg]:size-5">
            <OpenAIIcon />
            <span className="text-base">Open AI</span>
          </div>
          <div className="flex origin-bottom items-center gap-2.5 [&>svg]:size-5">
            <DeepseekIcon />
            <span className="text-base">Deepseek</span>
          </div>
          <div className="flex origin-bottom items-center gap-2.5 [&>svg]:size-5">
            <MistralIcon />
            <span className="text-base">Mistral AI</span>
          </div>
          <div className="flex origin-bottom items-center gap-2.5 [&>svg]:size-5">
            <QwenIcon />
            <span className="text-base">Qwen</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsageRadialCardContent() {
  const radialMask = "radial-gradient(ellipse 100% 100% at 50% 0%, black 75%, transparent 100%)";
  return (
    <div aria-hidden className="-mx-6 flex justify-center" style={{ maskImage: radialMask, WebkitMaskImage: radialMask }}>
      <div className="px-3 pt-1">
        <div className="mx-auto w-fit min-w-0 max-w-[18rem] rounded-t-2xl border border-border bg-white/75 px-2 pt-4 shadow-lg shadow-black/[0.065] dark:bg-black/20">
          <div className="mb-2 text-center text-sm font-medium text-muted-foreground">Kullanım</div>
          <div className="flex flex-col gap-5 rounded-t-xl border border-border bg-muted/30 px-4 pt-4 shadow">
            <div className="space-y-5">
              <div className="space-y-2 text-center">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sm text-foreground">Kullanıcı prompt tokenları</span>
                  <span className="font-medium text-foreground">43%</span>
                </div>
                <p className="text-left text-xs text-muted-foreground">Premium model kullanımı başına bir prompt kredisi kullanır.</p>
                <div className="relative mt-4">
                  <div className="relative h-2 overflow-hidden rounded-full bg-foreground/5">
                    <div className="absolute inset-y-0 left-0 w-[43%] rounded-full bg-gradient-to-l from-primary to-emerald-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">550 / 1,500 token</span>
                  <span className="text-emerald-500">950 kaldı</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-border bg-muted/50 p-2 text-center">
                  <div className="text-muted-foreground">Tahmini maliyet</div>
                  <div className="mt-0.5 font-medium text-foreground">$0.25</div>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-2 text-center">
                  <div className="text-muted-foreground">İstekler</div>
                  <div className="mt-0.5 font-medium text-foreground">48</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BeamDocCard({ label, badgeClass }: { label: string; badgeClass: string }) {
  return (
    <div className="relative">
      <div className={`z-[2] absolute -right-3 bottom-2 rounded px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-lg after:absolute after:inset-0 after:rounded after:border after:border-foreground/15 ${badgeClass}`}>
        {label}
      </div>
      <div className="z-[1] relative w-16 space-y-3 rounded-md rounded-tr-[15%] border border-border bg-muted/30 p-3 shadow-md shadow-black/[0.065]">
        <div className="space-y-1.5">
          <div className="flex gap-2"><div className="h-0.5 w-full rounded-full bg-foreground/10" /></div>
          <div className="flex gap-1"><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /></div>
          <div className="flex gap-1"><div className="h-0.5 w-1/2 rounded-full bg-foreground/10" /><div className="h-0.5 w-1/2 rounded-full bg-foreground/10" /></div>
          <div className="flex gap-1"><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /></div>
          <div className="flex gap-1"><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /><div className="h-0.5 w-2/3 rounded-full bg-foreground/10" /><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /></div>
          <div className="flex gap-1"><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /><div className="h-0.5 w-1/3 rounded-full bg-foreground/10" /></div>
        </div>
        <div className="flex gap-1 pt-1"><div className="h-0.5 w-4 rounded-full bg-foreground" /></div>
      </div>
    </div>
  );
}

function BeamCardContent() {
  const id = React.useId().replace(/:/g, "");
  const gradient1 = `gradient-${id}-1`;
  const gradientCenter = `gradient-center-${id}-1`;
  const paintLogo = `paint_logo_${id}`;
  return (
    <div className="flex w-full justify-center overflow-hidden">
      <div aria-hidden className="relative mx-auto flex w-fit max-w-full scale-[0.72] items-center justify-center">
        <svg viewBox="0 0 661 363" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute inset-0 mx-auto h-full w-4/5 text-foreground/15">
          <path d="M0.5 181.5H330" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
          <path d="M330 181.5H660" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
          <path d="M343.5 173.5H449.28C467.782 173.5 482.78 158.502 482.78 140V64.5C482.78 29.1538 511.434 0.5 546.78 0.5H660.5" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
          <path d="M343.5 189.5H449.28C467.782 189.5 482.78 204.498 482.78 223V298.5C482.78 333.846 511.434 362.5 546.78 362.5H660.5" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
          <path d="M0.5 181.5H330" strokeLinecap="round" strokeWidth={2} strokeDasharray="80 400" strokeDashoffset={400} className="animate-beam-source-to-logo" style={{ stroke: `url(#${gradientCenter})` }} />
          <path d="M330 181.5H660" strokeLinecap="round" strokeWidth={2} strokeDasharray="80 400" strokeDashoffset={400} className="animate-beam-logo-to-docs" style={{ stroke: `url(#${gradientCenter})` }} />
          <path d="M343.5 173.5H449.28C467.782 173.5 482.78 158.502 482.78 140V64.5C482.78 29.1538 511.434 0.5 546.78 0.5H660.5" strokeLinecap="round" strokeWidth={2} strokeDasharray="80 400" strokeDashoffset={400} className="animate-beam-logo-to-docs" style={{ stroke: `url(#${gradient1})` }} />
          <path d="M343.5 189.5H449.28C467.782 189.5 482.78 204.498 482.78 223V298.5C482.78 333.846 511.434 362.5 546.78 362.5H660.5" strokeLinecap="round" strokeWidth={2} strokeDasharray="80 400" strokeDashoffset={400} className="animate-beam-logo-to-docs" style={{ stroke: `url(#${gradient1})` }} />
          <defs>
            <linearGradient id={gradient1} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="currentColor" className="text-background/15" />
              <stop offset="25%" stopColor="var(--color-emerald-400, #34d399)" stopOpacity={0.5} />
              <stop offset="50%" stopColor="var(--color-indigo-400, #818cf8)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="var(--color-sky-400, #38bdf8)" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id={gradientCenter} gradientUnits="userSpaceOnUse" x1="0" y1="181" x2="660" y2="181">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0} className="text-background/15" />
              <stop offset="25%" stopColor="var(--color-emerald-400, #34d399)" />
              <stop offset="50%" stopColor="var(--color-indigo-400, #818cf8)" stopOpacity={0.5} />
              <stop offset="75%" stopColor="var(--color-blue-400, #60a5fa)" />
              <stop offset="100%" stopColor="currentColor" className="text-background/15" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative z-10 mr-8 w-24 rounded-xl border border-border bg-muted/30 p-3 shadow-md shadow-black/[0.065] sm:mr-12">
          <span className="block text-[10px] font-semibold">KAYNAK</span>
          <div className="mt-2 space-y-1">
            <div className="h-1 w-full rounded-full bg-foreground/10" />
            <div className="h-1 w-3/4 rounded-full bg-foreground/10" />
            <div className="h-1 w-1/2 rounded-full bg-foreground/10" />
          </div>
        </div>
        <div className="relative z-10 ml-6 mr-8 sm:ml-10 sm:mr-12">
          <div className="relative flex size-12 sm:size-14 items-center justify-center rounded-full bg-black/75 shadow-xl shadow-black/20 backdrop-blur dark:bg-white/10 dark:ring-white/20">
            <svg className="size-5" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M80 100H28C12.536 100 0 87.464 0 72V28C0 12.536 12.536 0 28 0H72C87.464 0 100 12.536 100 28V80H160C171.046 80 180 88.9543 180 100V167.639C180 175.215 175.72 182.14 168.944 185.528L103.416 218.292C101.17 219.415 98.6923 220 96.1803 220C87.2442 220 80 212.756 80 203.82V100ZM28 20C23.5817 20 20 23.5817 20 28V72C20 76.4183 23.5817 80 28 80H80V28C80 23.5817 76.4183 20 72 20H28ZM100 100H152C156.418 100 160 103.582 160 108V165.092C160 168.103 158.309 170.859 155.625 172.224L111.625 194.591C106.303 197.296 100 193.429 100 187.459V100Z" fill={`url(#${paintLogo})`} />
              <defs>
                <linearGradient id={paintLogo} x1="90" y1="0" x2="90" y2="220" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9B99FE" />
                  <stop offset={1} stopColor="#2BC8B7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="relative z-10 ml-4 flex flex-col gap-6 sm:ml-8">
          <BeamDocCard label="PDF" badgeClass="bg-rose-500 shadow-rose-900/25" />
          <BeamDocCard label="DOC" badgeClass="bg-blue-500 shadow-blue-900/25" />
          <BeamDocCard label="TXT" badgeClass="bg-orange-600 shadow-orange-900/25" />
          <BeamDocCard label="Sitemap / URL" badgeClass="bg-emerald-600 shadow-emerald-900/25" />
        </div>
      </div>
    </div>
  );
}

type CardType = "default" | "ai-suggestions" | "workflow" | "tokens" | "spending-limit" | "integrations" | "translation" | "email" | "email-clients-workflow" | "whatsapp-bulk" | "bulk-email" | "data-scrape" | "models" | "usage-radial" | "beam";

const cards: { type: CardType; title: string; description: string; gradient: string }[] = [
  { type: "email-clients-workflow", title: "Tüm müşterilere e-posta", description: "Tek bir workflow ile tüm müşterilerinize e-posta gönderin; kişiselleştirilmiş mesajlarla iletişimi otomatikleştirin.", gradient: "from-orange-400/30 to-orange-600/20" },
  { type: "whatsapp-bulk", title: "Toplu WhatsApp mesajı", description: "200 kişiye veya daha fazlasına WhatsApp üzerinden tek seferde mesaj gönderin; şablon ve kişiselleştirmeyle kampanyalarınızı yönetin.", gradient: "from-emerald-400/30 to-emerald-600/20" },
  { type: "bulk-email", title: "Toplu e-posta", description: "Binlerce alıcıya tek seferde kampanya maili gönderin; bülten, segment ve CRM listeleriyle toplu mail yönetimi.", gradient: "from-blue-400/30 to-blue-600/20" },
  { type: "data-scrape", title: "Veri toplama & scrape", description: "Kategori ve markaya göre web’den veri elde edin; ürün, fiyat ve stok bilgilerini otomatik toplayın.", gradient: "from-violet-400/30 to-violet-600/20" },
  { type: "ai-suggestions", title: "Akıllı Öneriler", description: "Site iyileştirmeleri ve performans önerileriyle web sitenizi güçlendirin.", gradient: "from-indigo-500/20 to-emerald-500/10" },
  { type: "workflow", title: "Otomatik iş akışları", description: "Sürükle-bırak pipeline ve hazır entegrasyonlarla iş akışlarınızı otomatikleştirin.", gradient: "from-violet-500/20 to-blue-500/10" },
  { type: "beam", title: "Veri akışı", description: "Sitemap ve URL takibi; kaynaktan hedeflere (PDF, DOC, TXT) veri yönlendiriyoruz.", gradient: "from-indigo-500/20 to-sky-500/10" },
  { type: "email", title: "Destek & iletişim", description: "Destek e-postaları ve otomatik yanıt akışlarıyla yanınızdayız.", gradient: "from-slate-500/15 to-zinc-500/15" },
  { type: "integrations", title: "Entegrasyonlar", description: "Gemini, Replit ve diğer servisleri sizin için bağlıyoruz.", gradient: "from-pink-500/20 to-purple-500/10" },
 
];

export function EndlessPossibilitiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pointerRef = useRef({ x: 0, y: 0 });

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 320 + 12;
    scrollRef.current.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  const handleCardPointerDown = (e: React.PointerEvent) => {
    pointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - pointerRef.current.x);
    const dy = Math.abs(e.clientY - pointerRef.current.y);
    if (dx < 8 && dy < 8) router.push("/marketplace/templates");
  };

  return (
    <section className="relative max-w-[100vw] overflow-hidden rounded-2xl px-8 py-16 md:py-20 lg:px-8">
      <div className="container relative mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <AnimatedBadge text="Ne sunuyoruz?" color="#ff4d00" />
            <p className="text-2xl font-semibold tracking-tight text-ln-gray-950 md:text-3xl">Sınırsız olanaklar</p>
            <p className="mt-1 text-base text-ln-gray-600 md:text-lg">Sunduğumuz hizmetlerle. Sorunsuz iş akışları ve araçlar.</p>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button type="button" onClick={() => scroll("left")} className="inline-flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-ln-gray-200 bg-ln-gray-50 text-ln-gray-950 transition-colors hover:border-ln-gray-300 hover:bg-ln-gray-100" aria-label="Önceki">
              <ChevronLeft />
            </button>
            <button type="button" onClick={() => scroll("right")} className="inline-flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-ln-gray-200 bg-ln-gray-50 text-ln-gray-950 transition-colors hover:border-ln-gray-300 hover:bg-ln-gray-100" aria-label="Sonraki">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
      <div ref={scrollRef} className="scrollbar-hide w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden" style={{ scrollBehavior: "smooth" }}>
        <div className="container mx-auto">
          <div className="flex w-fit gap-3 pb-4 pr-10 md:pl-0 md:pr-20">
            {cards.map((card) => (
              <div
                key={card.title}
                role="button"
                tabIndex={0}
                onPointerDown={handleCardPointerDown}
                onClick={handleCardClick}
                onKeyDown={(e) => e.key === "Enter" && router.push("/marketplace/templates")}
                className="group w-[min(320px,85vw)] flex-shrink-0 snap-center snap-always cursor-pointer flex flex-col overflow-hidden rounded-[32px] border border-ln-gray-200 bg-white backdrop-blur-sm transition-all hover:border-ln-gray-300 hover:bg-ln-gray-100 dark:border-ln-gray-800 dark:bg-ln-gray-900/50 dark:hover:border-ln-gray-800 dark:hover:bg-ln-gray-800/50"
              >
                <div className={`aspect-[338/300] w-full overflow-hidden bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                  {card.type === "ai-suggestions" && <AISuggestionsCardContent />}
                  {card.type === "workflow" && <WorkflowCompletedCardContent />}
                  {card.type === "tokens" && <TokenUsageCardContent />}
                  {card.type === "spending-limit" && <SpendingLimitCardContent />}
                  {card.type === "integrations" && <IntegrationsCardContent />}
                  {card.type === "translation" && <TranslationCardContent />}
                  {card.type === "email" && <EmailMockupCardContent />}
                  {card.type === "email-clients-workflow" && <EmailToClientsWorkflowCardContent />}
                  {card.type === "whatsapp-bulk" && <WhatsAppBulkCardContent />}
                  {card.type === "bulk-email" && <BulkEmailCardContent />}
                  {card.type === "data-scrape" && <DataScrapeCardContent />}
                  {card.type === "models" && <ModelsCardContent />}
                  {card.type === "usage-radial" && <UsageRadialCardContent />}
                  {card.type === "beam" && <BeamCardContent />}
                  {card.type === "default" && (
                    <div className="flex h-full items-center justify-center -space-x-8 transition-all duration-300 ease-out group-hover:space-x-0">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="h-24 w-20 flex-shrink-0 rounded-xl bg-ln-gray-50 dark:bg-ln-gray-800/80 backdrop-blur transition-transform duration-300 ease-out group-hover:scale-105" style={{ zIndex: 3 - n }} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 border-t border-ln-gray-200 dark:border-ln-gray-800 p-5">
                  <p className="max-w-[280px] text-sm leading-relaxed text-ln-gray-950 dark:text-ln-gray-100">
                    <span className="inline-block font-medium text-ln-gray-950 dark:text-ln-gray-50">{card.title}.</span>{" "}
                    <span className="text-ln-gray-600 dark:text-ln-gray-400">{card.description}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/marketplace/templates"
                      className="text-xs font-medium text-ln-gray-600 dark:text-ln-gray-400 underline underline-offset-2 hover:text-ln-gray-950 dark:hover:text-ln-gray-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Şablonlara git →
                    </Link>
                    <span className="inline-flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-ln-gray-50 dark:bg-ln-gray-800 p-3 text-ln-gray-950 dark:text-ln-gray-100 transition-colors group-hover:bg-ln-gray-100 dark:group-hover:bg-ln-gray-700" aria-hidden>
                      <PlusIcon />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
