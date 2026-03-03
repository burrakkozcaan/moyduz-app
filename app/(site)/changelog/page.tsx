import Link from 'next/link';
import { CHANGELOG_ENTRIES } from '@/lib/changelog';

const DOT_IMG = '/images/landing/dot-gray-25.svg';

export default function ChangelogPage() {
  return (
    <div className="container px-6 md:px-0">
      <div className="flex flex-col items-start pt-11 md:items-center md:pt-[72px]">
        <div className="hidden size-10 items-center justify-center rounded-[13px] bg-ln-gray-50 shadow-ln-badge-gray md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="size-6 text-ln-gray-500"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12 5a7 7 0 0 0-4 12.745V15a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1H4a1 1 0 1 1 0-2h2.343a9 9 0 0 1 9.032-15.345 1 1 0 1 1-.75 1.853A7 7 0 0 0 12 5"
              clipRule="evenodd"
            />
            <path
              fill="currentColor"
              d="M13 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2m8-10a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-1.07 3.268a1 1 0 1 1-1 1.732 1 1 0 0 1 1-1.732m-2.563 5.026a1 1 0 1 0-1-1.732 1 1 0 0 0 1 1.732M18.926 8a1 1 0 1 1-1-1.732 1 1 0 0 1 1 1.732"
            />
          </svg>
        </div>
        <h1 className="mt-3 text-[28px]/[36px] font-550 -tracking-[0.02em] text-ln-gray-900 md:mt-6 md:text-center xl:text-[40px]/[48px]">
          Güncellemeler
        </h1>
        <p className="mt-3 text-pretty text-ln-paragraph-md text-ln-gray-600 md:mt-2 md:max-w-md md:px-4 md:text-center xl:text-ln-paragraph-lg">
          Moyduz özellikleri, yeni ürünler ve güncellemeler hakkında en son duyuruları takip edin.
        </p>
      </div>

      <div className="mt-11 divide-y divide-ln-gray-200 md:mt-[58px] xl:divide-y-0">
        {CHANGELOG_ENTRIES.map((entry, index) => (
          <ChangelogEntry
            key={entry.id}
            entry={entry}
            isFirst={index === 0}
            isLast={index === CHANGELOG_ENTRIES.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function ChangelogEntry({
  entry,
  isFirst,
  isLast,
}: {
  entry: (typeof CHANGELOG_ENTRIES)[number];
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col xl:flex-row border-ln-gray-200 ${isFirst ? 'xl:border-t' : ''
        } ${isLast ? 'xl:!border-b' : ''}`}
    >
      {/* Corner dots - top right */}
      <img
        src={DOT_IMG}
        width={9}
        height={9}
        alt=""
        className="absolute -right-[5px] -top-[5px] z-30 hidden min-h-[9px] min-w-[9px] xl:block"
      />
      <img
        src={DOT_IMG}
        width={9}
        height={9}
        alt=""
        className="absolute -bottom-[5px] -right-1 z-30 hidden min-h-[9px] min-w-[9px] xl:block"
      />

      {/* Author sidebar */}
      <div className="relative flex shrink-0 flex-col items-center xl:w-[196px] xl:pr-6 xl:pt-16">
        <img
          src={DOT_IMG}
          width={9}
          height={9}
          alt=""
          className="absolute -left-px -top-[5px] z-30 hidden min-h-[9px] min-w-[9px] xl:block"
        />
        <img
          src={DOT_IMG}
          width={9}
          height={9}
          alt=""
          className="absolute -right-[5px] -top-[5px] z-30 hidden min-h-[9px] min-w-[9px] xl:block"
        />
        <img
          src={DOT_IMG}
          width={9}
          height={9}
          alt=""
          className="absolute -left-px -bottom-[5px] z-30 hidden min-h-[9px] min-w-[9px] xl:block"
        />
        <img
          src={DOT_IMG}
          width={9}
          height={9}
          alt=""
          className="absolute -bottom-[5px] -right-[5px] z-30 hidden min-h-[9px] min-w-[9px] xl:block"
        />
        <div className="flex w-full flex-row items-center gap-3 py-4 bleed-ln-gray-200 bleed-border xl:flex-col xl:gap-4 xl:py-0 xl:bleed-none">
          <img
            src="/images/team/moyduz.svg"
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full object-cover"
          />
          <div className="flex-1 xl:text-center">
            <div className="text-ln-label-sm text-ln-gray-800 xl:text-ln-label-md">
              Moyduz
            </div>
            <div className="mt-1 text-ln-paragraph-xs text-ln-gray-500 xl:text-ln-paragraph-sm">
              @moyduz
            </div>
          </div>
          <a
            href="https://x.com/moyduz"
            target="_blank"
            rel="noopener nofollow"
            className="group relative flex h-7 items-center gap-[5px] whitespace-nowrap rounded-lg bg-ln-gray-0 pl-2 pr-3 text-ln-label-xs text-ln-gray-700 shadow-ln-button-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 16"
              className="size-4 shrink-0 text-ln-gray-500"
            >
              <path
                fill="currentColor"
                d="M11.163 3h1.687L9.165 7.236 13.5 13h-3.394L7.447 9.504 4.405 13H2.717L6.66 8.47 2.5 3h3.48l2.404 3.195zm-.592 8.985h.935L5.473 3.962H4.47z"
              />
            </svg>
            Takip et
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex justify-center border-ln-gray-200 pb-10 xl:border-l xl:px-[98px] xl:pb-16 xl:pt-[70px]">
        {/* Timeline node */}
        <div className="absolute left-0 top-[70px] hidden size-7 -translate-x-1/2 items-center justify-center rounded-[9px] bg-ln-gray-50 shadow-ln-badge-gray xl:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="size-5 text-ln-gray-500"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="M10 5v5m0 0v5m0-5H5m5 0h5"
            />
          </svg>
          <div className="absolute left-full top-1/2 w-28 border-t border-ln-gray-200" />
        </div>
        <div className="relative z-10 w-full xl:max-w-[564px]">
          <div className="flex items-center justify-between py-5 xl:mb-6 xl:py-0">
            <div className="flex h-7 items-center rounded-[9px] bg-ln-gray-50 px-2.5 text-ln-label-sm text-ln-gray-600 shadow-ln-badge-gray">
              {entry.date}
            </div>
            <div className="flex items-center gap-1.5 text-ln-label-sm text-ln-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
                className="size-4 text-ln-gray-400"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.25"
                  d="M8 5.166V8l1.833 1.833M14.167 8A6.167 6.167 0 1 1 1.833 8a6.167 6.167 0 0 1 12.334 0"
                />
              </svg>
              {entry.readTime}
            </div>
          </div>
          <img
            src={entry.image}
            alt=""
            width={1024}
            height={651}
            loading="lazy"
            className="-mx-4 w-auto max-w-[calc(100%+32px)] rounded-2xl object-contain xl:mx-0 xl:max-w-full xl:w-full xl:rounded-20"
          />
          <div className="mt-6 xl:mt-8">
            <h2 className="text-ln-title-h6 text-ln-gray-800 xl:text-ln-title-h5">
              {entry.title}
            </h2>
            <p className="mt-3 text-ln-label-md text-ln-gray-600 xl:text-ln-label-lg">
              {entry.description}
            </p>
            <div className="mt-6 flex">
              <Link
                href={`/changelog/${entry.id}`}
                className="group relative flex h-9 items-center gap-1 whitespace-nowrap rounded-[11px] bg-ln-gray-0 pl-3.5 pr-2 text-ln-label-sm text-ln-gray-700 shadow-ln-button-white focus:outline-none"
              >
                Güncellemeyi oku
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  className="size-5 shrink-0 text-ln-gray-500 transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
