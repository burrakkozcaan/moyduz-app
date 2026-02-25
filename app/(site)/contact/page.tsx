"use client"
import React from 'react'
import * as Select from '@/components/ui/select'
import { useState } from 'react'

export default function page() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
 <>
  <div className="relative mx-2.5 mt-2.5 overflow-hidden rounded-t-2xl rounded-b-[36px] bg-gradient-to-b from-background via-background to-orange-100 lg:mx-4 dark:to-orange-900">
  <div className="flex flex-col items-start px-4 pt-11 md:items-center md:px-8 md:pt-16 md:text-center">
    <div className="hidden size-10 items-center justify-center rounded-[13px] bg-ln-gray-800 shadow-ln-branding-neutral md:flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 18"
        className="size-[18px]"
      >
        <path
          fill="url(#contact_svg__a)"
          d="M16 10.125h.125V9a7.125 7.125 0 0 0-14.25 0v1.125H3A2.875 2.875 0 0 1 5.875 13v2a2.875 2.875 0 1 1-5.75 0V9A8.875 8.875 0 0 1 9 .125h.875v.042l.111.012A8.876 8.876 0 0 1 17.875 9v6a2.875 2.875 0 1 1-5.75 0v-2A2.875 2.875 0 0 1 15 10.125z"
        />
        <path
          fill="#fff"
          fillOpacity="0.16"
          d="M16 10.125h.125V9a7.125 7.125 0 0 0-14.25 0v1.125H3A2.875 2.875 0 0 1 5.875 13v2a2.875 2.875 0 1 1-5.75 0V9A8.875 8.875 0 0 1 9 .125h.875v.042l.111.012A8.876 8.876 0 0 1 17.875 9v6a2.875 2.875 0 1 1-5.75 0v-2A2.875 2.875 0 0 1 15 10.125z"
        />
        <path
          stroke="url(#contact_svg__b)"
          strokeWidth="0.25"
          d="M16 10.125h.125V9a7.125 7.125 0 0 0-14.25 0v1.125H3A2.875 2.875 0 0 1 5.875 13v2a2.875 2.875 0 1 1-5.75 0V9A8.875 8.875 0 0 1 9 .125h.875v.042l.111.012A8.876 8.876 0 0 1 17.875 9v6a2.875 2.875 0 1 1-5.75 0v-2A2.875 2.875 0 0 1 15 10.125z"
        />
        <defs>
          <linearGradient
            id="contact_svg__a"
            x1="2.721"
            x2="16.082"
            y1="0.025"
            y2="7.598"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" stopOpacity="0.96" />
            <stop offset={1} stopColor="#fff" stopOpacity="0.72" />
          </linearGradient>
          <linearGradient
            id="contact_svg__b"
            x1={9}
            x2={9}
            y1={0}
            y2={18}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" stopOpacity={0} />
            <stop offset={1} stopColor="#fff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="text-ln-label-md text-ln-gray-500 md:hidden">
      Bizimle iletişime geçin
    </div>
    <h1 className="mt-2 text-[34px]/[40px] font-550 -tracking-[0.022em] text-ln-gray-900 md:mt-6 xl:text-[40px]/[48px] xl:-tracking-[0.028em]">
      Konuşalım, buradayız.
    </h1>
    <p className="mt-3 text-pretty text-ln-paragraph-md text-ln-gray-600 xl:mt-2 xl:text-ln-paragraph-lg">
      Yardımcı olmak için buradayız. Soru veya geri bildiriminiz için bize ulaşın.
      <br className="hidden md:inline" />
      <span className="md:hidden"> → </span>
      <a href="mailto:info@moyduz.com" className="font-medium text-ln-gray-700">
        info@moyduz.com
      </a>
    </p>
  </div>
  <div className="px-4 md:px-8">
    <div className="w-full max-w-[440px] rounded-3xl bg-ln-gray-0 p-6 shadow-ln-xs xl:rounded-[28px] mx-auto mt-8 md:mt-12">
      <div className="text-ln-label-lg text-ln-gray-900">İletişim Formu</div>
      <p className="mt-1 text-ln-paragraph-md text-ln-gray-700 xl:text-ln-paragraph-sm">
        Sorun bildirmek, geri bildirim göndermek ve daha fazlası için bize ulaşın.
      </p>
      <div
        className="h-1 w-full text-ln-gray-300 my-6"
        style={{
          background:
            "linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat"
        }}
        role="separator"
      />
      <form className="block">
        <div className="flex flex-col gap-3">
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="fullname"
              className="text-ln-label-sm text-ln-gray-800"
            >
              Ad Soyad
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
                className="pointer-events-none absolute left-[9px] top-1/2 size-[18px] -translate-y-1/2 text-ln-gray-400"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334m2-8a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-2 6.667a5.32 5.32 0 0 1-3.81-1.601C5.08 10.67 6.404 10 8 10s2.922.67 3.81 1.733a5.32 5.32 0 0 1-3.81 1.6Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="h-9 w-full rounded-[9px] bg-ln-gray-0 px-2.5 py-2 text-ln-paragraph-sm text-ln-gray-800 shadow-[0_3px_6px_-1.5px_rgba(51,51,51,.06)] ring-1 ring-ln-gray-200 caret-ln-orange transition-all duration-300 ease-out placeholder:transition-all placeholder:duration-300 placeholder:ease-out placeholder:text-ln-gray-500 hover:bg-ln-gray-25 hover:shadow-none hover:ring-transparent hover:placeholder:text-ln-gray-700 focus:bg-ln-gray-0 focus:ring-ln-orange outline-none focus:outline-none pl-[35px]"
                id="fullname"
                type="text"
                placeholder="Adınızı girin..."
                required=""
                defaultValue=""
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="email"
              className="text-ln-label-sm text-ln-gray-800"
            >
              E-posta
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
                className="pointer-events-none absolute left-[9px] top-1/2 size-[18px] -translate-y-1/2 text-ln-gray-400"
              >
                <path
                  fill="currentColor"
                  d="M1.502 5.162A2.25 2.25 0 0 1 3.75 3h10.5a2.25 2.25 0 0 1 2.25 2.162L9.336 8.744a.75.75 0 0 1-.671 0z"
                />
                <path
                  fill="currentColor"
                  d="M1.5 6.839v5.911A2.25 2.25 0 0 0 3.75 15h10.5a2.25 2.25 0 0 0 2.25-2.25V6.838l-6.494 3.247a2.25 2.25 0 0 1-2.012 0z"
                />
              </svg>
              <input
                className="h-9 w-full rounded-[9px] bg-ln-gray-0 px-2.5 py-2 text-ln-paragraph-sm text-ln-gray-800 shadow-[0_3px_6px_-1.5px_rgba(51,51,51,.06)] ring-1 ring-ln-gray-200 caret-ln-orange transition-all duration-300 ease-out placeholder:transition-all placeholder:duration-300 placeholder:ease-out placeholder:text-ln-gray-500 hover:bg-ln-gray-25 hover:shadow-none hover:ring-transparent hover:placeholder:text-ln-gray-700 focus:bg-ln-gray-0 focus:ring-ln-orange outline-none focus:outline-none pl-[35px]"
                id="email"
                type="email"
                placeholder="E-posta adresinizi girin..."
                required=""
                defaultValue=""
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="subject"
              className="text-ln-label-sm text-ln-gray-800"
            >
              Konu
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
                className="pointer-events-none absolute left-[9px] top-1/2 size-[18px] -translate-y-1/2 text-ln-gray-400"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M6.121 1.5c-.395 0-.736 0-1.017.023a2.3 2.3 0 0 0-.875.222 2.25 2.25 0 0 0-.984.984 2.3 2.3 0 0 0-.222.875C3 3.884 3 4.226 3 4.62v9.58c0 .348 0 .66.023.908.022.247.075.573.29.85a1.5 1.5 0 0 0 1.131.583c.35.013.647-.134.86-.258.216-.126.47-.307.753-.51l2.681-1.915a5 5 0 0 1 .257-.178L9 13.678l.005.003c.053.033.123.082.257.178l2.681 1.915c.284.203.538.384.753.51.213.124.51.27.86.258a1.5 1.5 0 0 0 1.132-.583c.213-.277.267-.603.29-.85.022-.248.022-.56.022-.908v-9.58c0-.395 0-.736-.023-1.017a2.3 2.3 0 0 0-.222-.875 2.25 2.25 0 0 0-.984-.984 2.3 2.3 0 0 0-.875-.222c-.28-.023-.622-.023-1.017-.023zM9 4.5a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 1 1-1.5 0v-1.5h-1.5a.75.75 0 1 1 0-1.5h1.5v-1.5A.75.75 0 0 1 9 4.5"
                  clipRule="evenodd"
                />
              </svg>
                <Select.Select value={selected || ""} onValueChange={setSelected} name="subject" required>
                  <Select.SelectTrigger
                    className="group/trigger w-full min-w-0 shrink-0 bg-ln-gray-0 shadow-[0_3px_6px_-1.5px_rgba(51,51,51,.06)] ring-1 ring-ln-gray-200 text-ln-paragraph-sm text-ln-gray-800 flex items-center text-left transition duration-200 ease-out hover:bg-ln-gray-25 hover:shadow-none hover:ring-transparent focus:outline-none focus:ring-ln-orange focus:text-ln-gray-700 data-[placeholder]:focus:text-ln-gray-700 data-[placeholder]:text-ln-gray-500 h-9 min-h-9 gap-2 rounded-[9px] px-2.5 pl-[35px]"
                  >
                   <Select.SelectValue placeholder="Bir konu seçin..." />
                  </Select.SelectTrigger>
                  <Select.SelectContent className='w-full bg-ln-gray-0'>
                    <Select.SelectItem value="Give Feedback">Geri Bildirim</Select.SelectItem>
                    <Select.SelectItem value="Report an Issue/Bug">Sorun / Hata Bildirimi</Select.SelectItem>
                    <Select.SelectItem value="Request a Feature">Özellik Talebi</Select.SelectItem>
                    <Select.SelectItem value="Ask for Technical Support">Teknik Destek Talebi</Select.SelectItem>
                    <Select.SelectItem value="Propose a Partnership">Ortaklık Önerisi</Select.SelectItem>
                    <Select.SelectItem value="Need a discount code">İndirim kodu talebi</Select.SelectItem>
                    <Select.SelectItem value="Other">Diğer</Select.SelectItem>
                  </Select.SelectContent>
                </Select.Select>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="message"
              className="text-ln-label-sm text-ln-gray-800"
            >
              Mesaj
            </label>
            <div className="group/textarea relative flex w-full flex-col rounded-[11px] bg-ln-gray-0 pb-3 shadow-[0_3px_6px_-1.5px_rgba(51,51,51,.06)] ring-1 ring-ln-gray-200 transition duration-200 ease-out hover:[&:not(:focus-within)]:bg-ln-gray-50 hover:[&:not(:focus-within)]:shadow-none hover:[&:not(:focus-within)]:ring-transparent focus-within:shadow-none focus-within:ring-ln-orange">
              <div className="grid">
                <div className="pointer-events-none relative z-10 flex flex-col gap-2 [grid-area:1/1]">
                  <textarea
                    className="block w-full resize-none text-ln-paragraph-sm text-ln-gray-800 pointer-events-auto h-full min-h-[76px] bg-transparent p-3 placeholder:select-none placeholder:text-ln-gray-500 placeholder:transition placeholder:duration-200 placeholder:ease-out group-hover/textarea:placeholder:text-ln-gray-700 focus:outline-none focus:placeholder:text-text-sub-600"
                    id="message"
                    placeholder="Mesajınızı yazın..."
                    required=""
                    defaultValue={""}
                  />
                  <div className="pointer-events-none flex items-center justify-end gap-1.5 px-3">
                    <span className="text-[11px]/[12px] tracking-[0.02em] text-ln-gray-300">
                      0{/* */}/{/* */}200
                    </span>
                    <div className="pointer-events-none size-3 cursor-s-resize">
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.11111 2L2 9.11111M10 6.44444L6.44444 10"
                          className="stroke-ln-gray-300"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="min-h-full resize-y overflow-hidden opacity-0 [grid-area:1/1]" />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="product"
              className="text-ln-label-sm text-ln-gray-800"
            >
              Ürün / Proje Adı
            </label>
            <div className="relative">
              <input
                className="h-9 w-full rounded-[9px] bg-ln-gray-0 px-2.5 py-2 text-ln-paragraph-sm text-ln-gray-800 shadow-[0_3px_6px_-1.5px_rgba(51,51,51,.06)] ring-1 ring-ln-gray-200 caret-ln-orange transition-all duration-300 ease-out placeholder:transition-all placeholder:duration-300 placeholder:ease-out placeholder:text-ln-gray-500 hover:bg-ln-gray-25 hover:shadow-none hover:ring-transparent hover:placeholder:text-ln-gray-700 focus:bg-ln-gray-0 focus:ring-ln-orange outline-none focus:outline-none"
                id="product"
                type="text"
                placeholder="Bu talebiniz hangi ürün veya proje ile ilgili?"
                defaultValue=""
              />
            </div>
          </div>
          <button
            className="group relative inline-flex items-center justify-center whitespace-nowrap transition duration-200 ease-out outline-none focus:outline-none disabled:pointer-events-none bg-ln-gray-900 text-ln-gray-0 shadow-ln-button-gray hover:bg-ln-gray-800 disabled:bg-ln-gray-25 disabled:text-ln-gray-450 disabled:shadow-none h-10 gap-2.5 rounded-[11px] px-3.5 text-ln-label-sm mt-3"
            type="submit"
          >
            <div
              className="flex items-center gap-1"
              style={{ opacity: 1, filter: "blur(0px)", transform: "none" }}
            >
              Gönder
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
</>

  )
}
