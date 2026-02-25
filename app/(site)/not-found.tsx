import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
export default function NotFound() {
  return (
    <div className="min-h-screen  text-white py-32 flex items-center justify-center">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 ">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-ln-gray-900 dark:text-white">Sayfa Bulunamadı</h1>
          <p className="text-lg text-ln-gray-700 dark:text-ln-gray-300">İstenen sayfa bulunamadı</p>
          <Link
            href="/"
            className="text-ln-gray-700 dark:text-ln-gray-300 hover:text-ln-gray-900 dark:hover:text-white flex items-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
