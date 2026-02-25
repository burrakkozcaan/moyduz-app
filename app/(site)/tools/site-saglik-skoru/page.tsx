import Link from 'next/link'
import type { Metadata } from 'next'
import { ToolsPageShell, TOOLS_CARD_CLASS, TOOLS_BTN_PRIMARY_CLASS, TOOLS_BTN_SECONDARY_CLASS } from '@/components/ToolsPageShell'

export const metadata: Metadata = {
  title: 'Site Sağlık Skoru | Moyduz Araçları',
  description:
    'E-ticaret sitenizin performans ve teknik sağlık skoru. Core Web Vitals, hız ve SEO sağlığı analizi yakında.',
  alternates: { canonical: 'https://moyduz.com/tools/site-saglik-skoru' },
  openGraph: {
    title: 'Site Sağlık Skoru | Moyduz',
    description: 'Sitenizin performans skoru ve teknik analiz aracı. Yakında.',
    url: 'https://moyduz.com/tools/site-saglik-skoru',
    type: 'website',
    locale: 'tr_TR',
  },
}

const ARROW_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 shrink-0">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8" />
  </svg>
)

export default function SiteSaglikSkoruPage() {
  return (
    <ToolsPageShell
      title="Site Sağlık Skoru"
      description="E-ticaret sitenizin performans, Core Web Vitals ve teknik SEO sağlığını tek skorla göreceğiniz araç üzerinde çalışıyoruz."
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className={`${TOOLS_CARD_CLASS} mb-10`}>
          <p className="text-ln-paragraph-sm text-ln-gray-700 dark:text-ln-gray-300 font-medium">
            Yakında kullanıma açılacak. Haberdar olmak için bizi takip edin veya sitenizi şimdi analiz ettirmek isterseniz iletişime geçin.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className={`inline-flex items-center justify-center gap-2 ${TOOLS_BTN_PRIMARY_CLASS}`}>
            Sitenizi analiz ettirin
            {ARROW_ICON}
          </Link>
          <Link href="/tools" className={`inline-flex items-center justify-center ${TOOLS_BTN_SECONDARY_CLASS}`}>
            Tüm araçlara dön
          </Link>
        </div>
      </div>
    </ToolsPageShell>
  )
}
