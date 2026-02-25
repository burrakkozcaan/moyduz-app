import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sizi Arayalım | Moyduz',
  description: 'İletişim bilgilerinizi bırakın, sizi arayalım.',
};

export default function SiziArayalimPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ln-gray-900 dark:text-white">
        Sizi Arayalım
      </h1>
      <p className="mt-4 text-ln-gray-600 dark:text-ln-gray-400">
        Projeniz hakkında konuşmak için iletişim formunu doldurun, en kısa sürede sizinle iletişime geçelim.
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-block text-ln-orange hover:underline"
      >
        İletişim formuna git →
      </Link>
    </div>
  );
}
