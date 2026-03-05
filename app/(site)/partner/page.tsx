import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Moyduz Partner Programı | Ajanslar ve Yazılımcılar İçin Gelir Ortaklığı',
  description:
    'Moyduz iş ortağı olun: müşterinizin projesinden %10-15 komisyon kazanın. Ajanslar, yazılımcılar ve danışmanlar için partner programı.',
  alternates: { canonical: 'https://moyduz.com/partner' },
  openGraph: {
    title: 'Moyduz Partner Programı | Ajanslar ve Yazılımcılar İçin Gelir Ortaklığı',
    description:
      'Moyduz iş ortağı olun: müşterinizin projesinden %10-15 komisyon kazanın. Ajanslar, yazılımcılar ve danışmanlar için partner programı.',
    url: 'https://moyduz.com/partner',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moyduz Partner Programı | Ajanslar ve Yazılımcılar İçin Gelir Ortaklığı',
    description:
      'Moyduz iş ortağı olun: müşterinizin projesinden %10-15 komisyon kazanın. Ajanslar, yazılımcılar ve danışmanlar için partner programı.',
  },
}

const partnerTypes = [
  {
    icon: 'M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605',
    title: 'Dijital Ajanslar',
    description:
      'Müşterilerinize e-ticaret altyapısı önerebilir, her projeden anlamlı bir komisyon kazanabilirsiniz. Teknik yük bize ait; siz ilişkiyi yönetin.',
  },
  {
    icon: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
    title: 'Serbest Yazılımcılar',
    description:
      'Mevcut müşteri ağınızı Moyduz ile değerlendirin. Projeyi kendiniz geliştirmeden, referans kodunuzla yönlendirdiğiniz her projeden pay alın.',
  },
  {
    icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z',
    title: 'Danışmanlar',
    description:
      "İş modelini analiz edin, doğru platformu önerin ve fark yaratın. Danışmanlık hizmetinizin doğal bir uzantısı olarak Moyduz'u portfolyonuza ekleyin.",
  },
]

const commissions = [
  { name: 'Starter', price: '$2,250', rate: '%10', amount: '$225', highlight: false },
  { name: 'Business', price: '$3,750', rate: '%10', amount: '$375', highlight: false },
  { name: 'Commerce', price: '$4,750', rate: '%12', amount: '$570', highlight: true },
  { name: 'Marketplace', price: '$8,500', rate: '%15', amount: '$1,275', highlight: false },
]

const steps = [
  {
    number: '01',
    title: 'Başvurun',
    description:
      'Formu doldurun. 24 saat içinde partner koordinatörümüz sizi onaylayıp referans kodunuzu iletir.',
  },
  {
    number: '02',
    title: 'Yönlendirin',
    description:
      'Özel referans kodunuzla müşterinizi bize yönlendirin. Görüşme, teklif ve sözleşme sürecini biz yönetiriz.',
  },
  {
    number: '03',
    title: 'Kazanın',
    description:
      'Proje teslim edildiğinde komisyonunuz banka hesabınıza aktarılır. Gecikme yok, belirsizlik yok.',
  },
]

const advantages = [
  'Sözleşme yok, minimum satış hedefi yok',
  'Projeyi siz yönetmek zorunda değilsiniz',
  'Müşteri takip paneline erişim',
  'Moyduz teknik ekibi tüm süreci destekler',
  'Referans materyalleri ve pitch deck hazır',
  'Birden fazla müşteri yönlendirme imkânı',
]

export default function PartnerPage() {
  return (
    <div className="container px-5">
      {/* Header */}
      <div className="flex flex-col items-start pt-11 md:items-center md:pt-16">
        <div className="flex items-center gap-1.5 text-ln-label-md text-ln-gray-700">
          Partner Programı
          <div className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">
            Yeni
          </div>
        </div>
        <h1 className="mt-3 text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-900 md:mt-4 md:text-center xl:text-ln-title-h2">
          Moyduz ile Kazan. Müşteriniz Büyüsün.
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-ln-paragraph-md text-ln-gray-600 md:mt-5 md:px-2 md:text-center xl:text-ln-paragraph-lg">
          Ajanslara, yazılımcılara ve danışmanlara{' '}
          <span className="font-medium text-ln-gray-700">pasif gelir fırsatı.</span> Müşterinizi
          yönlendirin, komisyonunuzu alın.{' '}
          <span className="font-medium text-ln-gray-700">Teknik iş bize ait.</span>
        </p>
      </div>

      {/* Partner Types */}
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
        {partnerTypes.map((type) => (
          <div key={type.title} className="rounded-2xl border border-ln-gray-100 bg-ln-gray-25 px-6 py-6">
            <div className="flex size-10 items-center justify-center rounded-[10px] bg-ln-gray-0 ring-1 ring-ln-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="size-5 text-ln-orange"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d={type.icon}
                />
              </svg>
            </div>
            <h2 className="mt-4 text-ln-label-lg text-ln-gray-900">{type.title}</h2>
            <p className="mt-2 text-ln-paragraph-sm text-ln-gray-600">{type.description}</p>
          </div>
        ))}
      </div>

      {/* Commission Structure */}
      <div className="mt-10 overflow-hidden rounded-[32px] bg-ln-gray-925 p-5 ring-1 ring-inset ring-ln-gray-800 md:mt-12 md:p-8">
        <div className="mb-6 flex flex-col gap-1">
          <div className="text-ln-label-sm text-ln-orange">Komisyon Yapısı</div>
          <h2 className="text-[22px]/[28px] font-550 -tracking-[0.015em] text-ln-gray-0">
            Proje büyüdükçe kazancınız artar
          </h2>
          <p className="mt-1 text-ln-paragraph-sm text-ln-gray-450">
            Her paket için sabit komisyon oranları — gizli kesinti yok.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {commissions.map((item) => (
            <div
              key={item.name}
              className={`rounded-2xl p-5 ${
                item.highlight
                  ? 'bg-ln-orange/[.08] ring-1 ring-inset ring-ln-orange/20'
                  : 'bg-ln-gray-800/60 ring-1 ring-inset ring-ln-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-ln-label-sm text-ln-gray-300">{item.name}</span>
                {item.highlight && (
                  <span className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange">
                    Popüler
                  </span>
                )}
              </div>
              <div className="mt-3 text-[13px]/[16px] text-ln-gray-500">{item.price} proje bedeli</div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-[28px]/[32px] font-550 text-ln-gray-0">{item.amount}</span>
                <span className="text-ln-label-sm text-ln-orange">{item.rate}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-[12px]/[16px] text-ln-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            className="size-4 shrink-0 text-ln-gray-600"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M8 7.667V10m0 2.667A4.667 4.667 0 1 1 8 3.333a4.667 4.667 0 0 1 0 9.334Zm.017-6.334h-.034"
            />
          </svg>
          Komisyon proje tesliminden sonra ödenir. USD veya TL ödeme seçeneği mevcuttur.
        </div>
      </div>

      {/* How it works */}
      <div className="mt-14 md:mt-20">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-[22px]/[28px] font-550 -tracking-[0.015em] text-ln-gray-900 md:text-[28px]/[34px]">
            Nasıl çalışır?
          </h2>
          <p className="mt-2 text-ln-paragraph-sm text-ln-gray-600">
            Başvurudan komisyon ödemesine — üç adım.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ln-gray-925 text-ln-label-sm font-600 text-ln-orange ring-1 ring-ln-gray-800">
                {step.number}
              </div>
              <h3 className="text-ln-label-lg text-ln-gray-900">{step.title}</h3>
              <p className="text-ln-paragraph-sm text-ln-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages */}
      <div className="mt-14 rounded-2xl border border-ln-gray-100 bg-ln-gray-25 px-6 py-8 md:mt-16 md:px-10 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-16">
          <div className="md:max-w-xs">
            <h2 className="text-[22px]/[28px] font-550 -tracking-[0.015em] text-ln-gray-900">
              Neden Moyduz Partner&apos;ı?
            </h2>
            <p className="mt-3 text-ln-paragraph-sm text-ln-gray-600">
              Minimum risk, maksimum esneklik. Sizi kısıtlayan bir yapı değil, destekleyen bir ekosistem.
            </p>
          </div>
          <ul className="flex flex-1 flex-col gap-3">
            {advantages.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ln-orange/[.10]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 12 12"
                    className="size-3 text-ln-orange"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m2 6 2.5 2.5 5.5-5"
                    />
                  </svg>
                </div>
                <span className="text-ln-paragraph-sm text-ln-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mb-16 mt-10 rounded-2xl border border-ln-gray-100 bg-ln-gray-25 px-6 py-10 text-center md:mb-24 md:mt-12 md:py-14">
        <h2 className="text-[22px]/[28px] font-550 -tracking-[0.015em] text-ln-gray-900 md:text-[28px]/[34px]">
          Partner olmaya hazır mısınız?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ln-paragraph-sm text-ln-gray-600">
          Başvurunuzu iletin, 24 saat içinde sizi onaylayıp referans kodunuzu ve partner materyallerinizi
          göndereceğiz.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-ln-orange px-7 text-sm font-semibold text-white transition hover:bg-ln-orange/90"
            style={{ boxShadow: '0 0 0 1px rgba(26,26,26,.14), inset 0 1px 2px rgba(255,255,255,.22)' }}
          >
            Partner Olmak İstiyorum
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="size-4 shrink-0"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8"
              />
            </svg>
          </Link>
          <a
            href="mailto:info@moyduz.com"
            className="inline-flex h-11 items-center rounded-xl border border-ln-gray-200 px-6 text-sm font-semibold text-ln-gray-700 transition hover:bg-ln-gray-50"
          >
            info@moyduz.com adresine yazın
          </a>
        </div>
      </div>
    </div>
  )
}
