import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ücretsiz E-Ticaret Hesaplama Araçları | Moyduz',
  description:
    'KDV hesaplama, desi hesaplama, kargo ücreti, komisyon ve ROI analizi. Ücretsiz e-ticaret araçlarıyla kararınızı güçlendirin.',
  keywords: [
    'e-ticaret hesaplama araçları',
    'kdv hesaplama',
    'desi hesaplama',
    'kargo ücreti hesaplama',
    'maliyet hesaplama',
    'roi hesaplama',
    'komisyon hesaplama',
    'sanal pos hesaplama',
    'ücretsiz e-ticaret araçları',
  ],
  alternates: { canonical: 'https://moyduz.com/tools' },
  openGraph: {
    title: 'Ücretsiz E-Ticaret Hesaplama Araçları | Moyduz',
    description: 'Maliyet, ROI ve komisyon hesaplayıcılar. Site sağlık skoru yakında.',
    url: 'https://moyduz.com/tools',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Moyduz',
    images: [{ url: 'https://moyduz.com/opengraph-image', width: 1200, height: 630, alt: 'Moyduz Araçları' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ücretsiz E-Ticaret Hesaplama Araçları | Moyduz',
    description: 'Maliyet, ROI ve komisyon hesaplayıcılar.',
    images: ['https://moyduz.com/opengraph-image'],
  },
}

const TOOLS = [
  {
    slug: 'kdv-hesaplama',
    title: 'KDV Hesaplama',
    description: '%1, %10, %20 KDV oranlarıyla KDV dahil / hariç fiyat hesaplayın. Aylık KDV yükü analizi.',
    iconPath: 'kdv',
    live: true,
  },
  {
    slug: 'desi-hesaplama',
    title: 'Desi Hesaplama',
    description: 'Kargo hacimsel ağırlığını hesaplayın, gerçek ağırlıkla karşılaştırın ve kargo maliyetini görün.',
    iconPath: 'box',
    live: true,
  },
  {
    slug: 'kargo-ucreti-hesaplama',
    title: 'Kargo Ücreti Hesaplama',
    description: 'MNG, Yurtiçi, Aras, PTT, Sürat ve Sendeo kargo fiyatlarını karşılaştırın.',
    iconPath: 'truck',
    live: true,
  },
  {
    slug: 'komisyon-hesaplama',
    title: 'Marketplace Komisyon Hesaplama',
    description: 'Trendyol, Hepsiburada ve diğer pazaryerlerinde net kâr marjınızı görün.',
    iconPath: 'percent',
    live: true,
  },
  {
    slug: 'sanal-pos-hesaplama',
    title: 'Sanal POS Maliyet Hesaplayıcı',
    description: 'iyzico, PayTR, Shopier ve Banka POS maliyetlerini cirona göre karşılaştır.',
    iconPath: 'pos',
    live: true,
  },
  {
    slug: 'maliyet-hesaplama',
    title: 'E-Ticaret Maliyet Hesaplama',
    description: 'Platform maliyetlerinizi hesaplayın, özel yazılımla tasarrufunuzu görün.',
    iconPath: 'calculator',
    live: true,
  },
  {
    slug: 'roi-hesaplama',
    title: 'E-Ticaret ROI Hesaplama',
    description: 'Yatırımın geri dönüş süresini ve toplam getiriyi hesaplayın.',
    iconPath: 'trending',
    live: true,
  },
  {
    slug: 'e-ticaret-kar-hesaplama',
    title: 'E-Ticaret Kâr Hesaplama',
    description: 'Satış fiyatı, maliyet ve komisyon dahil gerçek kâr marjınızı hesaplayın.',
    iconPath: 'profit',
    live: true,
  },
  {
    slug: 'site-saglik-skoru',
    title: 'Site Sağlık Skoru',
    description: 'Sitenizin performans ve teknik sağlık skoru. Yakında.',
    iconPath: 'activity',
    live: false,
  },
] as const

const ICONS: Record<string, React.ReactNode> = {
  kdv: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0 text-ln-orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  ),
  box: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0 text-ln-orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  truck: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0 text-ln-orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  profit: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0 text-ln-orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  calculator: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0 text-ln-orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
    </svg>
  ),
  trending: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0 text-ln-orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  ),
  percent: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0 text-ln-orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      <circle cx="6.75" cy="6.75" r="2.25" strokeWidth={1.5} stroke="currentColor" fill="none" />
      <circle cx="17.25" cy="17.25" r="2.25" strokeWidth={1.5} stroke="currentColor" fill="none" />
    </svg>
  ),
  pos: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0 text-ln-orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
  ),
  activity: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0 text-ln-orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h2.25M12 3v2.25M20.25 12H22M12 20.25V22M8.5 12l2.5-3 2.5 3 3-4.5" />
    </svg>
  ),
}

function ToolIcon({ name }: { name: string }) {
  return <>{ICONS[name] ?? null}</>
}

export default function ToolsIndexPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Moyduz E-Ticaret Araçları',
    itemListElement: TOOLS.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.title,
      url: `https://moyduz.com/tools/${tool.slug}`,
    })),
  }

  return (
    <main className="flex-1 bg-ln-gray-0 rounded-xl dark:bg-ln-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-12 text-center">
          <div className="inline-flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading dark:bg-ln-gray-900 dark:text-ln-gray-300 dark:ring-1 dark:ring-ln-gray-800 md:mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="size-[18px] text-ln-orange"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M7.5 4.167v2.5m5-2.5v2.5M4.167 8.333h11.666M5.833 15h8.334a1.667 1.667 0 0 0 1.667-1.667V6.667A1.667 1.667 0 0 0 14.167 5H5.833A1.667 1.667 0 0 0 4.167 6.667v6.666A1.667 1.667 0 0 0 5.833 15Z"
              />
            </svg>
            Ücretsiz Araçlar
            <span className="rounded-[5px] bg-ln-orange/[.12] px-[5px] py-[3px] text-ln-subheading-xs text-ln-orange shadow-ln-badge-orange">
              PRO
            </span>
          </div>
          <h1 className="mt-3 text-[34px]/[40px] font-550 -tracking-[0.02em] text-ln-gray-900 dark:text-ln-gray-0 md:mt-4 md:text-center md:text-ln-title-h2">
            E-Ticaret Araçları
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ln-paragraph-md text-ln-gray-600 dark:text-ln-gray-400 md:mt-5 md:px-2 md:text-center md:text-ln-paragraph-lg">
            KDV, desi, kargo, komisyon ve ROI hesaplayıcılar. E-ticaret kararlarınızı veriyle destekleyin.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          {TOOLS.map((tool) => {
            const content = (
              <div className="flex w-full items-center gap-4 rounded-2xl bg-ln-gray-0 px-4 py-3 shadow-ln-xs md:w-[calc(50%-12px)] md:flex-col md:p-7 md:text-center xl:w-[368px] xl:gap-6 xl:rounded-3xl xl:p-8">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <ToolIcon name={tool.iconPath} />
                    <h2 className="text-ln-label-lg text-ln-gray-900 dark:text-ln-gray-0">{tool.title}</h2>
                  </div>
                  <p className="text-ln-paragraph-sm text-ln-gray-450 max-w-sm">
                    {tool.description}
                  </p>
                  {tool.live ? (
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="text-ln-label-sm text-ln-orange hover:underline flex items-center gap-1"
                    >
                      Hesapla
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        className="size-5 shrink-0 text-ln-orange"
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
                  ) : (
                    <div className="mt-2 flex h-9 items-center gap-1.5 text-white rounded-10 border border-ln-gray-700 bg-ln-gray-800/50 px-4 text-ln-label-sm">
                      Yakında
                    </div>
                  )}
                </div>
              </div>
            )

            return <div key={tool.slug}>{content}</div>
          })}
        </div>

        <p className="mt-10 text-center text-ln-paragraph-sm text-ln-gray-500 dark:text-ln-gray-400">
          Tüm araçlar ücretsiz. Sitenizi analiz etmek veya özel e-ticaret altyapısı için{' '}
          <Link href="/contact" className="font-medium text-ln-orange hover:underline">
            iletişime geçin
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
