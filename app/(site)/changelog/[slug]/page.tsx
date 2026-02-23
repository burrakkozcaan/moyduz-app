import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CHANGELOG_ENTRIES } from '@/lib/changelog';

export function generateStaticParams() {
  return CHANGELOG_ENTRIES.map((entry) => ({ slug: entry.id }));
}

export default async function ChangelogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = CHANGELOG_ENTRIES.find((e) => e.id === slug);

  if (!entry) notFound();

  return (
    <div className="container pb-20 pt-11 md:pt-16">
      <Link
        href="/changelog"
        className="mb-8 inline-flex items-center gap-2 text-ln-label-sm text-ln-gray-600 transition hover:text-ln-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className="size-5 rotate-180"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
            d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8"
          />
        </svg>
        Back to changelog
      </Link>

      <article className="mx-auto max-w-[672px]">
        <div className="flex items-center gap-4 text-ln-label-sm text-ln-gray-600">
          <span className="flex h-7 items-center rounded-[9px] bg-ln-gray-50 px-2.5 shadow-ln-badge-gray">
            {entry.date}
          </span>
          <span className="flex items-center gap-1.5 text-ln-gray-500">
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
          </span>
        </div>

        <h1 className="mt-4 text-ln-title-h3 text-ln-gray-900">{entry.title}</h1>
        <p className="mt-3 text-ln-paragraph-lg text-ln-gray-600">
          {entry.description}
        </p>

        <div className="relative mt-8 overflow-hidden rounded-20">
          <Image
            src={entry.image}
            alt=""
            width={1024}
            height={651}
            className="w-full rounded-20 object-cover"
            unoptimized
          />
        </div>

        <div className="prose prose-ln-gray mt-10 max-w-none">
          <div className="whitespace-pre-wrap text-ln-paragraph-md leading-relaxed text-ln-gray-700">
            {entry.content}
          </div>
        </div>

        <Link
          href="/changelog"
          className="mt-12 inline-flex h-9 items-center gap-2 rounded-[11px] bg-ln-gray-0 pl-3.5 pr-2 text-ln-label-sm text-ln-gray-700 shadow-ln-button-white transition hover:shadow-none focus:outline-none"
        >
          View all updates
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
              d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8"
            />
          </svg>
        </Link>
      </article>
    </div>
  );
}
