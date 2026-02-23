'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Hourglass, Brain, Bot, GitBranch } from 'lucide-react';

const TABS = [
  { id: 'ai-models', label: 'Brief\'iniz', icon: Brain },
  { id: 'smart-agent', label: 'Sürecimiz', icon: Bot },
  { id: 'workflows', label: 'Teslimat', icon: GitBranch },
];

const COMPLIANCE = [
  { label: 'Güvenli ve ölçeklenebilir', icon: ShieldCheck },
  { label: 'Zamanında teslimat', icon: ShieldCheck },
  { label: 'Duyarlı ve erişilebilir', icon: ShieldCheck },
  { label: 'Sürekli destek', icon: Hourglass },
];

function EmailMockupCard() {
  return (
    <div className="bg-card/95 ring-border shadow-black/6.5 rounded-2xl p-6 pb-16 pt-2 shadow-xl ring-1">
      <div className="divide-y border-b text-xs *:flex *:h-10 *:items-center *:py-2 [&>*]:flex [&>*]:h-10 [&>*]:items-center [&>*]:py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-foreground/50">Alıcı:</span>
            <div className="bg-muted ring-border shadow-black/6.5 flex cursor-pointer gap-1 rounded-full p-0.5 pr-2.5 shadow-md ring-1">
              <div className="relative size-4 overflow-hidden rounded-full border border-foreground/20 bg-muted">
                <img
                  alt="Moyduz"
                  src="/images/team/moyduz.svg"
                  width={20}
                  height={20}
                  className="size-full object-contain"
                />
              </div>
              <span className="text-xs font-medium">Ekibiniz</span>
            </div>
          </div>
          <div className="bg-foreground/10 flex size-6 items-center justify-center rounded-full border">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
        </div>
        <div className="flex gap-1"><span className="text-foreground/50">Bilgi:</span></div>
        <div className="flex gap-1"><span className="text-foreground/50">Konu:</span> Proje güncellemesi – teslime hazır</div>
        <div className="flex gap-1"><span className="text-foreground/50">Gönderen:</span> Moyduz</div>
      </div>
      <div className="text-muted-foreground mt-6 space-y-2 text-sm leading-6">
        <p>
          İşletmeniz için modern teknoloji ve en iyi uygulamalarla inşa edilmiş, size özel web
          uygulamanız veya siteniz.
        </p>
        <p className="mt-3">— Moyduz Ekibi</p>
      </div>
    </div>
  );
}

function SmartAgentMockupCard() {
  return (
    <div className="bg-card/95 ring-border shadow-black/6.5 rounded-2xl p-6 shadow-xl ring-1">
      <div className="flex items-center gap-2 border-b border-foreground/10 pb-3">
        <div className="size-8 rounded-lg bg-primary/15 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <path d="M12 8v4l2 2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <span className="text-sm font-medium">Akıllı Asistan</span>
      </div>
      <div className="text-muted-foreground mt-4 space-y-3 text-sm">
        <div className="rounded-lg bg-muted/60 p-3">
          <p className="text-foreground/80 text-xs font-medium mb-1">Önerilen görev</p>
          <p>Site performansınızı iyileştirmek için sitemap ve sayfa analizi yapılıyor</p>
        </div>
        <div className="rounded-lg border border-dashed border-foreground/20 p-3">
          <p className="text-foreground/50 text-xs">Sorununuz inceleniyor...</p>
        </div>
      </div>
    </div>
  );
}

function WorkflowsMockupCard() {
  return (
    <div className="bg-card/95 ring-border shadow-black/6.5 rounded-2xl p-6 shadow-xl ring-1">
      <div className="flex items-center gap-2 border-b border-foreground/10 pb-3">
        <div className="size-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 dark:text-emerald-400">
            <path d="M4 4h6v6H4z" /><path d="M14 4h6v6h-6z" /><path d="M4 14h6v6H4z" /><path d="M14 14h6v6h-6z" />
          </svg>
        </div>
        <span className="text-sm font-medium">İş Akışı</span>
      </div>
      <div className="mt-4 space-y-2">
        {['Derle', 'Test', 'Yayınla'].map((step, i) => (
          <div key={step} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-foreground/10 text-xs font-medium">{i + 1}</span>
            <span className="text-sm">{step}</span>
            {i < 2 && <span className="ml-auto text-foreground/40">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BuildFasterSection() {
  const [activeTab, setActiveTab] = useState('ai-models');

  return (
    <section className="min-h-[400px] w-full mx-auto  bg-transparent py-24" id="build-faster">
      <div aria-hidden className="border-foreground/10 h-px border-b border-dashed" />
      <div className="mx-auto container my-1 max-w-5xl px-5 sm:px-6">
        <div className="grid md:grid-cols-2 md:gap-6">
          {/* Left column */}
          <div className="relative p-6 sm:p-12 mx-auto w-full max-w-md p-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-1 -bottom-56 -top-36 border-x border-dashed border-foreground/10"
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
              }}
            />
            <div className="flex h-full flex-col justify-between gap-12">
              <div className="max-w-sm text-balance">
                <h3 className="text-foreground text-4xl font-medium">
                  Ürününüzü daha hızlı inşa ediyoruz
                </h3>
                <p className="text-muted-foreground my-6">
                  İhtiyaçlarınızı anlıyoruz; üretime hazır uygulama ve web sitelerini daha hızlı ve
                  daha az revizyonla teslim ediyoruz. Site analizi ve optimizasyon gerçekleştirip
                  açıkları ve iyileştirmeleri belirliyoruz.
                </p>
                <Link
                  href="#"
                  className="inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent bg-card px-3 text-xs font-medium shadow-sm shadow-black/10 ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:ring-foreground/15 dark:hover:bg-muted/50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                >
                  Daha fazla bilgi{' '}
                  <span className="ml-0.5 block size-0 border-y-4 border-l-4 border-y-transparent border-l-foreground/50" />
                </Link>
              </div>
              <div className="-ml-4 flex gap-2 justify-center">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      data-state={isActive ? 'expanded' : 'collapsed'}
                      onClick={() => setActiveTab(tab.id)}
                      className="active:scale-[0.98] group flex cursor-pointer items-center gap-2 rounded-full py-2 pr-1 duration-200"
                    >
                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground'
                        }`}
                      >
                        <Icon className="size-4" strokeWidth={1.75} />
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors group-hover:text-foreground ${
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column: mockup card + background */}
          <div className="relative h-fit">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-1 -bottom-56 -top-36 border-x border-dashed border-foreground/10"
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
              }}
            />
            <div className="relative min-h-[320px] overflow-hidden rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50" style={{ aspectRatio: '7/8' }}>
              <div className="scale-[0.85] relative z-10 flex h-full items-center justify-center">
                <div
                  aria-hidden
                  className="relative max-w-[23rem] w-full animate-in fade-in duration-300"
                  key={activeTab}
                >
                  {activeTab === 'ai-models' && <EmailMockupCard />}
                  {activeTab === 'smart-agent' && <SmartAgentMockupCard />}
                  {activeTab === 'workflows' && <WorkflowsMockupCard />}
                </div>
              </div>
              <div className="absolute inset-0">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1600223260976-32a509b23602?q=80&w=1200&auto=format&fit=crop"
                  className="absolute inset-0 size-full object-cover opacity-65 dark:opacity-35"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,var(--color-brand),var(--color-white)_100%)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="border-foreground/10 h-px border-t border-dashed" />

      {/* Bottom: compliance + testimonial */}
      <div className="mx-auto container max-w-5xl px-2 py-6 sm:px-6 ">
        <div className="grid gap-12 px-6 md:grid-cols-2 md:gap-6 md:px-12">
          <ul className="text-muted-foreground mt-auto space-y-3 text-sm">
            {COMPLIANCE.map((item) => (
              <li key={item.label} className="flex items-center gap-3 border-b border-ln-gray-200 dark:border-ln-gray-700 pb-2">
                <item.icon
                  className={`size-4 text-ln-orange-500 dark:text-ln-orange-500 ${
                    item.icon === Hourglass ? 'text-muted-foreground dark:text-ln-orange-500' : '[&>*:nth-child(2)]:text-emerald-600 dark:[&>*:nth-child(2)]:text-emerald-500'
                  }`}
                />
                <span>
                  <span className="text-ln-gray-950 font-medium">{item.label}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-end items-center ">
            <div className="relative mt-auto max-w-xl">
              <p className="text-ln-gray-950 max-w-xs text-balance text-center">
                &ldquo;Tam hayal ettiğimiz gibi. Zamanında teslim edildi, kalitesi mükemmel.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 justify-center">
                <div className="relative size-10 overflow-hidden rounded-full border border-foreground/10 shadow">
                  <img
                    alt="Moyduz"
                    src="/images/team/moyduz.svg"
                    width={56}
                    height={56}
                    className="size-full object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-foreground text-sm font-medium">Moyduz</p>
                  <span className="text-muted-foreground block text-xs">Hayalinizdeki dijital ürünü birlikte inşa ediyoruz</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
