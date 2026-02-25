import Link from 'next/link'

export function AboutContent() {
  return (
    <main className="flex-1">
      <div className="container pt-11 md:pt-[72px] mx-auto px-4 md:px-0">
        <div className="relative mx-auto w-full max-w-[564px]">
          <div className="text-[24px]/[32px] font-medium -tracking-[0.01em] text-ln-gray-500 dark:text-ln-gray-400 xl:text-[32px]/[40px] xl:-tracking-[0.015em]">
            Biz kimiz?
          </div>
          <h1 className="mt-2 text-[40px]/[48px] font-550 -tracking-[0.02em] text-ln-gray-900 dark:text-ln-gray-0 md:mt-3 xl:text-ln-title-h2">
            E-ticaret ve dijital altyapının geleceğini inşa ediyoruz.
          </h1>
          <div
            className="my-8 h-1 w-full text-ln-gray-400 opacity-80 md:my-12"
            style={{
              background:
                'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 10px 1px repeat no-repeat',
            }}
            role="separator"
          />
          <p className="text-ln-paragraph-lg -tracking-[0.01em] text-ln-gray-600 dark:text-ln-gray-400 xl:text-[20px]/[32px]">
            Moyduz,{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">
              özel yazılım ve e-ticaret altyapısı
            </span>{' '}
            geliştiren bir yazılım şirketidir. İşletmeler için{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">
              performans odaklı web siteleri
            </span>
            , e-ticaret platformları, multi-vendor pazaryerleri ve kurumsal çözümler sunuyoruz.
            <br />
            <br />
            Moyduz&apos;u farklı kılan,{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">modüler ve ölçeklenebilir</span>{' '}
            mimariyle ihtiyacınıza göre hızlı özelleştirme imkânıdır. Hazır şablonların yanı sıra{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">sıfırdan özel yazılım</span>{' '}
            geliştiriyor; hem başlangıç hem de kurumsal projeler için doğru altyapıyı kuruyoruz.
            <br />
            <br />
            Teknolojideki{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">güncel standartları</span>{' '}
            takip ediyoruz: Core Web Vitals, SEO, güvenlik ve hız her projede önceliğimiz. Türkiye pazarına özel{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">pazaryeri entegrasyonları</span>{' '}
            (Trendyol, Hepsiburada vb.) ve ödeme altyapıları sunuyoruz.
            <br />
            <br />
            Ücretsiz{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">araçlar</span>{' '}
            (maliyet hesaplama, ROI, komisyon hesaplayıcı) ve{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">rehber içeriklerimizle</span>{' '}
            karar süreçlerinizi destekliyoruz. İster e-ticaret ister kurumsal site olsun,{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">tek altyapı</span>{' '}
            ile büyümenizi hedefliyoruz.
          </p>
          <div className="mt-10 md:mt-12">
            <div className="text-ln-label-sm text-ln-gray-500 dark:text-ln-gray-400">
              Moyduz
            </div>
            <div className="mt-1 font-mono text-sm text-ln-gray-400 dark:text-ln-gray-500">
              E-ticaret ve dijital altyapı, performans odaklı.
            </div>
          </div>
        </div>

        <div className="relative mt-12 flex flex-col justify-center gap-6 md:flex-row md:py-7 xl:mt-24 xl:gap-8 before:absolute before:left-0 before:top-0 before:hidden before:h-px before:w-full before:bg-ln-gray-200 dark:before:bg-ln-gray-800 md:before:block after:absolute after:bottom-0 after:left-0 after:hidden after:h-px after:w-full after:bg-ln-gray-200 dark:after:bg-ln-gray-800 md:after:block">
          <div className="flex flex-1 flex-col items-start gap-4 md:items-center md:gap-0 md:text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 shrink-0 text-ln-orange">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            <div className="md:mt-4">
              <div className="text-ln-label-md text-ln-gray-600 dark:text-ln-gray-400">Tamamlanan Proje</div>
              <div className="mt-1 text-ln-title-h4 text-ln-gray-900 dark:text-ln-gray-0">50+</div>
            </div>
          </div>
          <div className="hidden w-px bg-ln-gray-200 dark:bg-ln-gray-800 md:block" />
          <div className="flex flex-1 flex-col items-start gap-4 md:items-center md:gap-0 md:text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 shrink-0 text-ln-orange">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
            <div className="md:mt-4">
              <div className="text-ln-label-md text-ln-gray-600 dark:text-ln-gray-400">E-ticaret &amp; Platform</div>
              <div className="mt-1 text-ln-title-h4 text-ln-gray-900 dark:text-ln-gray-0">30+</div>
            </div>
          </div>
          <div className="hidden w-px bg-ln-gray-200 dark:bg-ln-gray-800 md:block" />
          <div className="flex flex-1 flex-col items-start gap-4 md:items-center md:gap-0 md:text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 shrink-0 text-ln-orange">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div className="md:mt-4">
              <div className="text-ln-label-md text-ln-gray-600 dark:text-ln-gray-400">Sektör Deneyimi</div>
              <div className="mt-1 text-ln-title-h4 text-ln-gray-900 dark:text-ln-gray-0">10+</div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-[564px] md:mt-32">
          <div className="text-[24px]/[32px] font-medium -tracking-[0.01em] text-ln-gray-500 dark:text-ln-gray-400 xl:text-[32px]/[40px] xl:-tracking-[0.015em]">
            Misyon ve rehberlik
          </div>
          <h2 className="mt-2 text-[40px]/[48px] font-550 -tracking-[0.02em] text-ln-gray-900 dark:text-ln-gray-0 md:mt-3 xl:text-ln-title-h2">
            Moyduz ile doğru altyapıyı kurun.
          </h2>
          <div
            className="my-8 h-1 w-full text-ln-gray-400 opacity-80 md:my-12"
            style={{
              background:
                'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 10px 1px repeat no-repeat',
            }}
            role="separator"
          />
          <p className="text-ln-paragraph-lg -tracking-[0.01em] text-ln-gray-600 dark:text-ln-gray-400 xl:text-[20px]/[32px]">
            Moyduz,{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">
              startup&apos;lardan kurumsal işletmelere
            </span>{' '}
            tüm ölçekler için e-ticaret ve web altyapısı sunar.{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">Performans ve SEO</span>{' '}
            odaklı mimariyle hem hız hem dönüşüm hedeflenir. Güncel teknoloji ve en iyi uygulamalarla{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">ölçeklenebilir ürünler</span>{' '}
            geliştiriyoruz.
            <br />
            <br />
            Moyduz,{' '}
            <span className="font-medium text-ln-gray-800 dark:text-ln-gray-200">işletmeleri doğru altyapıyla güçlendirir</span>
            — e-ticaret, pazaryeri veya kurumsal site; tek ekiple uçtan uca çözüm.
          </p>
        </div>

        <div className="-mx-4 bg-ln-gray-25 dark:bg-ln-gray-900/50 mt-8 md:mx-0 md:mt-12 px-4 rounded-2xl md:rounded-3xl">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row xl:gap-6 py-8 md:py-12">
            <div className="flex max-w-[428px] flex-1 flex-col gap-6 rounded-[28px] bg-ln-gray-0 dark:bg-ln-gray-900 p-6 shadow-ln-xs ring-1 ring-ln-gray-100 dark:ring-ln-gray-800 xl:gap-7 xl:p-8">
              <div className="flex size-11 items-center justify-center rounded-[13px] bg-ln-orange/10 text-ln-orange">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-ln-title-h5 text-ln-gray-800 dark:text-ln-gray-100">Güçlendirmek</span>
                  <span className="flex h-5 items-center rounded-md px-[7px] text-[11px] font-semibold text-ln-gray-600 dark:text-ln-gray-400 bg-ln-gray-100 dark:bg-ln-gray-800">MİSYON</span>
                </div>
                <p className="mt-4 text-ln-label-lg text-ln-gray-700 dark:text-ln-gray-300">
                  Moyduz olarak, işletmelere en uygun ve ölçeklenebilir dijital altyapıyı sunmayı hedefliyoruz.
                  <br /><br />
                  Startup&apos;lardan kurumsal markalara kadar her ölçekte e-ticaret, pazaryeri ve kurumsal web projeleri için tek noktadan çözüm sağlıyoruz.
                  <br /><br />
                  Modüler yapı ve performans odaklı mimariyle iş süreçlerinizi hızlandırıyor, müşteri deneyimini iyileştiriyoruz.
                </p>
              </div>
              <div className="text-balance text-ln-paragraph-sm text-ln-gray-500 dark:text-ln-gray-450">
                Doğru altyapı ile büyümenizi destekliyoruz.
              </div>
            </div>
            <div className="flex max-w-[428px] flex-1 flex-col gap-6 rounded-[28px] bg-ln-gray-0 dark:bg-ln-gray-900 p-6 shadow-ln-xs ring-1 ring-ln-gray-100 dark:ring-ln-gray-800 xl:gap-7 xl:p-8">
              <div className="flex size-11 items-center justify-center rounded-[13px] bg-ln-orange/10 text-ln-orange">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-ln-title-h5 text-ln-gray-800 dark:text-ln-gray-100">Doğruluk ve kalite</span>
                  <span className="flex h-5 items-center rounded-md px-[7px] text-[11px] font-semibold text-ln-gray-600 dark:text-ln-gray-400 bg-ln-gray-100 dark:bg-ln-gray-800">REHBERLİK</span>
                </div>
                <p className="mt-4 text-ln-label-lg text-ln-gray-700 dark:text-ln-gray-300">
                  Sektördeki deneyimimizi kullanarak, projelerin doğru mimari ve en iyi uygulamalarla hayata geçmesini sağlıyoruz.
                  <br /><br />
                  Sürekli araştırma ve güncel teknoloji takibiyle çözümlerimizi güncel tutuyoruz.
                  <br /><br />
                  Net süreçler ve şeffaf iletişimle proje yönetimini kolaylaştırıyoruz.
                </p>
              </div>
              <div className="text-balance text-ln-paragraph-sm text-ln-gray-500 dark:text-ln-gray-450">
                Doğru kararlar için veri ve uzmanlık sunuyoruz.
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-10 md:mt-24">
          <div className="relative flex flex-col justify-center gap-6 xl:mt-10 xl:flex-row xl:gap-16">
            <div className="flex flex-col items-start gap-5 xl:w-[292px] xl:items-center xl:gap-0 xl:text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 text-ln-orange" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
              <div className="xl:mt-4">
                <div className="text-ln-label-md text-ln-gray-800 dark:text-ln-gray-200">İhtiyaç Analizi</div>
                <div className="mt-1 text-pretty text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400">
                  İşletmenizin hedeflerini ve teknik ihtiyaçlarını detaylı analiz ediyoruz.
                </div>
              </div>
            </div>
            <div className="h-px w-full text-ln-gray-300 dark:text-ln-gray-700 xl:hidden" style={{ background: 'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat' }} role="separator" />
            <div className="flex flex-col items-start gap-5 xl:w-[292px] xl:items-center xl:gap-0 xl:text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 text-ln-orange" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <div className="xl:mt-4">
                <div className="text-ln-label-md text-ln-gray-800 dark:text-ln-gray-200">Sürekli Geliştirme</div>
                <div className="mt-1 text-pretty text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400">
                  Müşteri geri bildirimleri ve güncel teknolojilerle çözümlerimizi sürekli iyileştiriyoruz.
                </div>
              </div>
            </div>
            <div className="h-px w-full text-ln-gray-300 dark:text-ln-gray-700 xl:hidden" style={{ background: 'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat' }} role="separator" />
            <div className="flex flex-col items-start gap-5 xl:w-[292px] xl:items-center xl:gap-0 xl:text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 text-ln-orange" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
              <div className="xl:mt-4">
                <div className="text-ln-label-md text-ln-gray-800 dark:text-ln-gray-200">Hızlı İletişim</div>
                <div className="mt-1 text-pretty text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400">
                  Soru ve taleplerinize hızlı yanıt veriyoruz; proje sürecinde şeffaf iletişim kuruyoruz.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pb-16 text-center">
          <p className="text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400 mb-4">
            Projenizi konuşalım — fiyatlandırma ve süreç için
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex h-10 items-center justify-center rounded-10 bg-ln-orange px-5 text-ln-label-sm font-medium text-ln-gray-0 hover:bg-ln-orange/90">
              İletişime Geç
            </Link>
            <Link href="/pricing" className="inline-flex h-10 items-center justify-center rounded-10 border border-ln-gray-300 dark:border-ln-gray-700 px-5 text-ln-label-sm font-medium text-ln-gray-700 dark:text-ln-gray-300 hover:bg-ln-gray-50 dark:hover:bg-ln-gray-800">
              Fiyatlandırma
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
