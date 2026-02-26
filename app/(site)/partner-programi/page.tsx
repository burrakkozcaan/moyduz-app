import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partner Programı | Moyduz',
  description: 'Moyduz partner programı hakkında bilgi alın. Birlikte büyüyelim.',
  alternates: { canonical: 'https://moyduz.com/partner-programi' },
};

export default function PartnerProgramiPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ln-gray-900 dark:text-white">
        Partner Programı
      </h1>
      <p className="mt-4 text-ln-gray-600 dark:text-ln-gray-400">
        Partner programımız hakkında detaylı bilgi için bizimle iletişime geçin.
        E-posta: partner@moyduz.com
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-block text-ln-orange hover:underline"
      >
        İletişime geçin →
      </Link>
    </div>
  );
}
