import Header from '@/components/header';
import Footer from "@/components/footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='relative z-50 flex flex-1 flex-col items-center xl:container dark:bg-ln-gray-900 lg:mt-6 lg:flex xl:mx-auto'>
        <Header />
        <main className='w-full flex-1 overflow-x-hidden'>{children}</main>
      </div>
      <Footer />
    </>
  );
}
