'use client';

import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

const faqCategories = [
  {
    label: 'Genel',
    items: [
      {
        question: 'Moyduz hangi hizmetleri sunuyor?',
        answer:
          'Moyduz; web tasarım, e-ticaret geliştirme, özel yazılım, dijital pazarlama ve yapay zeka otomasyonu dahil kurumsal dijital çözümler sunuyor.',
      },
      {
        question: 'Bir web sitesi ne kadar maliyetli?',
        answer:
          'Starter paketimiz premium bir web sitesi için belirli bir bütçeyle başlıyor. E-ticaret ve marketplace projeleri kapsama göre fiyatlandırılıyor. Özel projeler için ücretsiz keşif görüşmesiyle teklif veriyoruz.',
      },
      {
        question: 'Proje ne kadar sürer?',
        answer:
          'Kurumsal web siteleri genelde 2–4 hafta, e-ticaret projeleri 4–8 hafta sürebilir. İlk görüşmede kapsamı netleştirip size özel bir takvim sunuyoruz.',
      },
      {
        question: 'Devam eden bakım ve destek sunuyor musunuz?',
        answer:
          'Evet. Aylık bakım paketlerimizle hosting, güvenlik güncellemeleri, performans izleme ve içerik güncellemeleri sunuyoruz.',
      },
      {
        question: 'İade ve iptal politikanız nedir?',
        answer:
          'Memnuniyet garantisi veriyoruz. İlk aşamadaki çıktılardan memnun kalmazsanız revizyon yapıyoruz veya ilk milestone kapsamında iade imkânı sunuyoruz.',
      },
      {
        question: 'Moyduz nerede konumlanıyor?',
        answer:
          'Moyduz Türkiye merkezli olup uzaktan çalışma modeliyle dünya genelinde müşterilere hizmet veriyor.',
      },
      {
        question: 'Moyduz ile nasıl iletişime geçebilirim?',
        answer:
          'info@moyduz.com e-posta adresi, web sitemizdeki iletişim formu veya canlı destek üzerinden bize ulaşabilirsiniz.',
      },
    ],
  },
  {
    label: 'Teknik',
    items: [
      {
        question: 'Hangi teknolojileri kullanıyorsunuz?',
        answer:
          'Web geliştirmede Next.js, React, TypeScript, Tailwind CSS ve Node.js kullanıyoruz. E-ticaret için Shopify, WooCommerce ve özel çözümlerle çalışıyoruz.',
      },
      {
        question: 'Mobil uygulama geliştiriyor musunuz?',
        answer:
          'Evet. React Native ile çapraz platform mobil uygulamalar ve hem iOS hem Android’de çalışan progresif web uygulamaları (PWA) geliştiriyoruz.',
      },
      {
        question: 'Mevcut sistemlerimle entegrasyon yapabilir misiniz?',
        answer:
          'Evet. API entegrasyonları, CRM bağlantıları, ödeme sistemleri ve üçüncü taraf servis entegrasyonlarıyla kesintisiz iş akışları kuruyoruz.',
      },
      {
        question: 'SEO hizmeti veriyor musunuz?',
        answer:
          'Evet. Tüm web sitelerimiz SEO en iyi uygulamalarıyla geliştirilir. Ayrıca sürekli görünürlük ve büyüme için dijital pazarlama ve SEO hizmetleri sunuyoruz.',
      },
      {
        question: 'Sitem hızlı ve optimize olacak mı?',
        answer:
          'Performans önceliğimiz. Core Web Vitals uyumu, sunucu taraflı render, görsel optimizasyonu ve CDN ile hızlı siteler teslim ediyoruz.',
      },
    ],
  },
  {
    label: 'Süreç',
    items: [
      {
        question: 'Proje süreci nasıl işliyor?',
        answer:
          'Sürecimiz keşif ve strateji, tasarım konseptleri, geliştirme, test ve QA ile go-live aşamalarından oluşur. Her milestone’da sizin onayınızla ilerliyoruz.',
      },
      {
        question: 'Kod ve tasarımın hakları bende mi?',
        answer:
          'Evet. Proje tamamlanıp ödeme alındığında, projeniz için üretilen tüm kod, tasarım ve varlıkların tamamı size devredilir.',
      },
      {
        question: 'Yayına aldıktan sonra değişiklik yapabilir miyim?',
        answer:
          'Evet. Devam eden değişiklikler için bakım paketlerimiz var. İsterseniz projenizde kurduğumuz CMS üzerinden içeriği kendiniz de yönetebilirsiniz.',
      },
      {
        question: 'Startup’larla çalışıyor musunuz?',
        answer:
          'Evet. Startup’lardan kurumsal firmalara kadar her ölçekte işletmeyle çalışıyoruz. Starter paketimiz yeni girişimler ve MVP’ler için uygun.',
      },
    ],
  },
];

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      className={className}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6 12a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12'
        clipRule='evenodd'
      />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 18 18'
      className='size-[18px] text-ln-gray-400'
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.125'
        d='M7.313 6.938c0-.622.503-1.125 1.125-1.125h.906a1.343 1.343 0 0 1 .745 2.46l-.421.282A1.5 1.5 0 0 0 9 9.803v.134M9 12v-.008M15.938 9A6.937 6.937 0 1 1 2.063 9a6.937 6.937 0 0 1 13.874 0Zm-6.75 3a.187.187 0 1 1-.375 0 .187.187 0 0 1 .374 0Z'
      />
    </svg>
  );
}

export default function FAQPage() {
  return (
    <div className="relative mx-2.5 mt-2.5 w-full rounded-t-2xl rounded-b-[36px] bg-gradient-to-b from-background via-background to-orange-100 lg:mx-4 dark:to-orange-900">
    <div className='container pt-11 md:pt-16'>
      <div className='xl:px-[98px]'>
        <div className='flex flex-col items-start gap-9 md:items-center xl:flex-row xl:items-start xl:gap-6'>
          {/* Left Sidebar */}
          <div className='top-5 flex shrink-0 flex-col items-start md:items-center xl:sticky xl:block xl:w-[368px]'>
            <h1 className='hidden text-ln-label-md text-ln-gray-500 xl:block'>
              S.S.S.
            </h1>
            <div className='xl:hidden'>
              <div className='flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3'>
                <QuestionIcon />
                S.S.S.
              </div>
            </div>
            <div className='mt-4 text-[28px]/[36px] font-550 -tracking-[0.02em] text-ln-gray-900 md:text-ln-title-h4 xl:mt-2 xl:text-[40px]/[48px]'>
              Sık Sorulan Sorular.
            </div>
            <p className='mt-3 text-ln-paragraph-md text-ln-gray-600'>
              <span className='font-medium text-ln-gray-800'>Sık sorulan</span>{' '}
              sorulara{' '}
              <span className='font-medium text-ln-gray-800'>yanıt</span> bulun.
            </p>
          </div>

          {/* Right Content */}
          <div className='flex w-full min-w-0 flex-1 flex-col gap-10 xl:gap-14'>
            {faqCategories.map((category) => (
              <div
                key={category.label}
                className='flex flex-col gap-3 xl:gap-5'
              >
                <div className='text-ln-label-sm text-ln-gray-500 xl:text-ln-label-md'>
                  {category.label}
                </div>
                <AccordionPrimitive.Root
                  type='single'
                  collapsible
                  className='flex w-full flex-col gap-3 xl:gap-5'
                >
                  {category.items.map((item, index) => (
                    <React.Fragment key={item.question}>
                      <AccordionPrimitive.Item
                        value={`${category.label}-${index}`}
                      >
                        <AccordionPrimitive.Trigger className='group flex w-full items-center gap-2 text-left text-ln-label-sm text-ln-gray-900 xl:text-ln-label-md'>
                          <div className='flex-1'>{item.question}</div>
                          <div className='relative size-6 shrink-0'>
                            <MinusIcon className='absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rotate-90 text-ln-gray-400 transition duration-300 group-data-[state=open]:scale-x-0' />
                            <MinusIcon className='size-6 text-ln-gray-400 transition duration-300' />
                          </div>
                        </AccordionPrimitive.Trigger>
                        <AccordionPrimitive.Content
                          className='overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
                          style={
                            {
                              '--radix-accordion-content-height':
                                'var(--radix-collapsible-content-height)',
                              '--radix-accordion-content-width':
                                'var(--radix-collapsible-content-width)',
                            } as React.CSSProperties
                          }
                        >
                          <div className='pt-3 text-ln-paragraph-sm text-ln-gray-600'>
                            {item.answer}
                          </div>
                        </AccordionPrimitive.Content>
                      </AccordionPrimitive.Item>
                      {index < category.items.length - 1 && (
                        <div className='h-px w-full bg-ln-gray-200' />
                      )}
                    </React.Fragment>
                  ))}
                </AccordionPrimitive.Root>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
