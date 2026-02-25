import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Moyduz',
  description: 'Kişisel verilerin korunması ve işlenmesi hakkında aydınlatma metni.',
};

export default function KvkkPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ln-gray-900 dark:text-white">
        KVKK Aydınlatma Metni
      </h1>
      <p className="mt-4 text-ln-gray-600 dark:text-ln-gray-400">
        6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metnimiz hazırlanmaktadır.
        Detaylı bilgi için Gizlilik Politikamızı inceleyebilirsiniz.
      </p>
      <Link
        href="/privacy-policy"
        className="mt-6 inline-block text-ln-orange hover:underline"
      >
        Gizlilik Politikası →
      </Link>
    </div>
  );
}
