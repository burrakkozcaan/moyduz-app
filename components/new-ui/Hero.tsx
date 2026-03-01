'use client';

export default function Hero() {
  return (
    <>
      <div className='relative overflow-hidden'>
        <div className='relative flex min-h-[60vh] w-full flex-col items-start px-4 pt-11 md:items-center md:px-0 md:pt-20'>
          <div className='pointer-events-none absolute inset-0 -z-10 bg-[#f7f7f7]' />

          <div className='flex flex-col gap-3 rounded-full ring-ln-gray-200 md:flex-row md:items-center md:bg-ln-gray-25 md:px-2 md:py-1.5 md:ring-1'>
            <div className='flex shrink-0 -space-x-1'>
              <img
                src='/images/1.png'
                width={24}
                height={24}
                alt=''
                style={{ background: '#D3B496' }}
                className='size-7 rounded-full ring-2 ring-ln-gray-25 md:size-6'
              />
              <img
                src='/images/2.png'
                width={24}
                height={24}
                alt=''
                style={{ background: '#D3CC96' }}
                className='size-7 rounded-full ring-2 ring-ln-gray-25 md:size-6'
              />
              <img
                src='/images/3.png'
                width={24}
                height={24}
                alt=''
                style={{ background: '#A1BBCD' }}
                className='size-7 rounded-full ring-2 ring-ln-gray-25 md:size-6'
              />
              <img
                src='/images/4.png'
                width={24}
                height={24}
                alt=''
                style={{ background: '#A7CDAE' }}
                className='size-7 rounded-full ring-2 ring-ln-gray-25 md:size-6'
              />
            </div>
            <div className='relative hidden h-4 w-0 before:absolute before:inset-y-0 before:w-px before:bg-ln-gray-200 md:block' />
            <p className='text-ln-paragraph-sm text-ln-gray-600 md:pr-1.5'>
              <span className='text-ln-label-sm text-ln-gray-900'>100+</span>{' '}
              işletme dijital altyapısını Moyduz ile kurdu
            </p>
          </div>
          <h1 className='font-550 md:text-ln-title-h3 xl:text-ln-title-h1 mt-3 text-[34px]/[40px] -tracking-[0.022em] text-ln-gray-900 md:mt-5 md:text-center'>
            <div className='whitespace-nowrap'>
              <span>E-Ticaret & Yazılım</span>
              <span
                style={{ color: '#F05023' }}
                className='blinkingCursor blinking'
              >
                |
              </span>
            </div>
            dijital altyapınız
          </h1>
          <p className='mt-4 text-pretty text-ln-paragraph-md text-ln-gray-700 md:mt-6 md:text-center xl:text-ln-paragraph-lg'>
            Özel e-ticaret altyapısı, web tasarım ve yazılım geliştirme.
            Moyduz ile projenizi hızla hayata geçirin.
          </p>
          <div className='mt-8 flex justify-center'>
            <a
              className='group relative inline-flex h-11 items-center justify-center gap-3.5 whitespace-nowrap rounded-[13px] bg-ln-gray-900 px-[18px] text-ln-label-sm text-ln-gray-0 shadow-ln-button-gray outline-none transition duration-200 ease-out hover:bg-ln-gray-800 focus:outline-none disabled:pointer-events-none disabled:bg-ln-gray-25 disabled:text-ln-gray-450 disabled:shadow-none'
              href='/contact'
            >
              <span className='flex items-center gap-1'>
                <span>Başlayın</span>
                <span className='text-ln-paragraph-sm text-ln-gray-500'>
                  — Ücretsiz
                </span>
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
                className='-mx-1.5 size-5 shrink-0 text-ln-gray-500 group-disabled:text-ln-gray-450'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='square'
                  strokeWidth='1.25'
                  d='M8.333 13.333 11.667 10 8.333 6.667'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
