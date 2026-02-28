'use client';

import Link from 'next/link';
import * as Button from './ui/button';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';
import FlickeringFooter from './flickering-footer';

const navLinks = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hakkımızda', href: '/about' },
  { label: 'Hizmetler', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Rehberler', href: '/rehber' },
  { label: 'Fiyatlandırma', href: '/pricing' },
  { label: 'İletişim', href: '/contact' },
] as const;

const solutionLinks = [
  { label: 'E-Ticaret Geliştirme', href: '/services/ecommerce-website-development' },
  { label: 'Web Tasarım', href: '/services/web-design' },
  { label: 'Yazılım Şirketi', href: '/services/software-company' },
  { label: 'Araçlar', href: '/tools' },
] as const;

const socialLinks = [
  { label: 'Twitter / X', href: 'https://x.com/moyduz' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/moyduz' },
  { label: 'Facebook', href: 'https://www.facebook.com/moyduz' },
] as const;

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Responsible Disclosure', href: '/responsible-disclosure' },
  { label: 'Terms Of Service', href: '/terms-of-service' },
  { label: 'Security', href: '/security' },
] as const;

export default function Footer() {
  return (
    <div className='mt-10 overflow-hidden border-t border-ln-gray-200 xl:mt-[108px]'>
      <footer className='container relative flex-col gap-12 overflow-hidden xl:flex xl:pt-[68px]'>
        <div className='mx-auto flex w-full flex-col gap-10 py-12 md:py-16'>
          {/* Top grid */}
          <div className='col-span-2 mb-8 lg:mb-0'>
            <div className='flex items-center gap-2 lg:justify-start'>
              <Link
                href='/'
                className='flex max-h-8 items-center gap-3 focus:outline-none'
              >
                <div className='relative size-9'>
                  <img
                    src='/images/logo.svg'
                    alt='Moyduz Logo'
                    className='absolute -top-0.5 left-1/2 max-w-none -translate-x-1/2 object-contain'
                    width={42}
                    height={42}
                  />
                </div>
              </Link>
              <span className='text-ln-title-h6 font-bold text-ln-gray-900 dark:text-ln-gray-0'>
                {/* Moydus */}
              </span>
            </div>
            <div className='font-550 mt-4 max-w-lg text-[28px]/[36px] -tracking-[0.02em] text-ln-gray-900 dark:text-white'>
              We are everywhere, including{' '}
              <span className='text-ln-gray-500 dark:text-ln-gray-400'>
                your city
              </span>{' '}
              - Growth playbooks, technical delivery, and analytics built for
              operators.
            </div>
            <div className='mb-4 mt-4 space-y-7 sm:mb-0'>
              <div>
                <p className='mb-2 text-ln-paragraph-sm text-ln-gray-600 dark:text-ln-gray-400'>
                  <strong className='text-ln-gray-900 dark:text-ln-gray-100'>
                    Office Address:
                  </strong>
                  <br />
                  {/* Moyduz HQ */}
                  <br />
                  Istanbul, Turkey
                </p>
                <a
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 text-ln-label-sm text-ln-orange transition-colors hover:text-ln-orange/80'
                >
                  📍 View our location on Google Maps
                </a>
              </div>
            </div>
          </div>
          <div className='grid gap-10 md:grid-cols-5 md:gap-x-8 md:gap-y-12'>
            {/* Navigation */}
            <div className='space-y-4'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Navigation
              </p>
              <nav className='flex flex-col gap-2'>
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='block text-ln-paragraph-sm text-ln-gray-600 transition-colors hover:text-ln-gray-900 dark:text-ln-gray-400 dark:hover:text-white'
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Solutions */}
            <div className='space-y-4'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Solutions
              </p>
              <nav className='flex flex-col gap-2'>
                {solutionLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='block text-ln-paragraph-sm text-ln-gray-600 transition-colors hover:text-ln-gray-900'
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div className='space-y-4'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Social
              </p>
              <div className='flex items-center gap-2'>
                <a
                  href='https://x.com/moyduz'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Moyduz Twitter / X'
                  className='shadow-ln-button-white flex size-8 items-center justify-center rounded-[9px] bg-ln-gray-0 text-ln-gray-400 transition duration-200 ease-linear hover:bg-ln-gray-25 hover:text-ln-gray-500 hover:shadow-none'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                    className='size-[18px]'
                  >
                    <path
                      fill='currentColor'
                      d='M13.053 2.625h2.16l-4.721 5.4 5.555 7.35h-4.35l-3.406-4.457-3.899 4.457H2.23l5.05-5.777-5.329-6.973h4.46l3.08 4.074zm-.76 11.455h1.199L5.76 3.852H4.476l7.819 10.228Z'
                    />
                  </svg>
                </a>
                <a
                  href='https://www.linkedin.com/company/moyduz'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Moyduz LinkedIn'
                  className='shadow-ln-button-white flex size-8 items-center justify-center rounded-[9px] bg-ln-gray-0 text-ln-gray-400 transition duration-200 ease-linear hover:bg-ln-gray-25 hover:text-ln-gray-500 hover:shadow-none'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                    className='size-[18px]'
                  >
                    <path
                      fill='currentColor'
                      d='M4.5 6.75H2.25v9H4.5v-9Zm-1.125-3.375a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM15.75 9.9c0-2.025-1.35-3.15-3.15-3.15-1.125 0-1.8.45-2.25 1.125V6.75H8.1v9h2.25v-4.95c0-.9.675-1.575 1.575-1.575s1.575.675 1.575 1.575V15.75h2.25V9.9Z'
                    />
                  </svg>
                </a>
                <a
                  href='https://www.facebook.com/moyduz'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Moyduz Facebook'
                  className='shadow-ln-button-white flex size-8 items-center justify-center rounded-[9px] bg-ln-gray-0 text-ln-gray-400 transition duration-200 ease-linear hover:bg-ln-gray-25 hover:text-ln-gray-500 hover:shadow-none'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                    className='size-[18px]'
                  >
                    <path
                      fill='currentColor'
                      d='M9 1.5C4.86 1.5 1.5 4.86 1.5 9a7.5 7.5 0 0 0 6.328 7.395v-5.23H5.906V9H7.83V7.35c0-1.908 1.136-2.963 2.876-2.963.833 0 1.705.15 1.705.15v1.875h-.962c-.945 0-1.24.588-1.24 1.191V9h2.11l-.337 2.165H10.21v5.23A7.5 7.5 0 0 0 16.5 9c0-4.14-3.36-7.5-7.5-7.5Z'
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Legal */}
            <div className='space-y-4'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Legal
              </p>
              <nav className='flex flex-col gap-2'>
                {legalLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='block text-ln-paragraph-sm text-ln-gray-600 transition-colors hover:text-ln-gray-900'
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Newsletter form */}
            <div className='space-y-4 md:col-span-1'>
              <p className='text-ln-label-md text-ln-gray-900 dark:text-white'>
                Product updates & system insights
              </p>
              <form
                className='flex flex-col gap-3'
                onSubmit={(e) => e.preventDefault()}
              >
                <div className='w-full'>
                  <input
                    type='email'
                    required
                    placeholder='your@company.com'
                    className='w-full rounded-xl border border-ln-gray-200 bg-ln-gray-50 px-3 py-2.5 text-ln-label-sm text-ln-gray-900 outline-none transition-colors placeholder:text-ln-gray-400 focus:border-ln-orange focus:ring-2 focus:ring-ln-orange/20 dark:border-ln-gray-800 dark:bg-ln-gray-900 dark:text-ln-gray-100'
                  />
                </div>
                {/* Using a standard button here since imports might differ */}
                <button className='flex w-full items-center justify-center rounded-lg bg-ln-gray-900 py-2.5 text-ln-label-sm font-medium text-ln-gray-0 transition-colors hover:bg-ln-gray-800 dark:bg-ln-gray-0 dark:text-ln-gray-900 dark:hover:bg-ln-gray-100'>
                  Subscribe
                  <TrendingUp className='ml-2 size-4' />
                </button>
              </form>
              <p className='text-xs leading-relaxed text-ln-gray-500 dark:text-ln-gray-400'>
                By subscribing, you agree to our{' '}
                <Link
                  href='/privacy-policy'
                  className='text-ln-gray-700 underline decoration-ln-gray-300 underline-offset-2 hover:text-ln-gray-900 hover:decoration-ln-gray-500 dark:text-ln-gray-300 dark:hover:text-ln-gray-0'
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className='h-px w-full bg-ln-gray-200 dark:bg-ln-gray-800' />

          {/* Bottom row */}
          <div className='text-xs flex flex-col items-center justify-between gap-3 text-ln-gray-500 dark:text-ln-gray-400 md:flex-row'>
            <p>© 2026 Moyduz. Tüm hakları saklıdır.</p>
            <div className='flex items-center gap-1.5'>
              <Link
                href='https://moyduz.com'
                className='font-medium text-ln-gray-700 hover:text-ln-gray-900 dark:text-ln-gray-300 dark:hover:text-ln-gray-0'
              >
                moyduz.com
              </Link>
            </div>
          </div>
        </div>
        <FlickeringFooter />
      </footer>
    </div>
  );
}
