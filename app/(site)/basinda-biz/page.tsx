import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Basında Biz | Moyduz',
  description: 'Moyduz hakkında basında çıkan haberler ve referanslar.',
  alternates: { canonical: 'https://moyduz.com/basinda-biz' },
};

export default function BasindaBizPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ln-gray-900 dark:text-white">
        Basında Biz
      </h1>
      <p className="mt-4 text-ln-gray-600 dark:text-ln-gray-400">
        Basın ve medya iletişimi için: basin@moyduz.com
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
