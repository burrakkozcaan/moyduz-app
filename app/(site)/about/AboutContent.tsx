import Link from 'next/link'

export function AboutContent() {
  return (
    <main className="flex-1">
      <div className="container pt-11 md:pt-[72px] mx-auto px-4 md:px-0">
        <div className="relative mx-auto w-full max-w-[564px]">
          <img
            src="https://alignui.com/images/landing/cursor-ersad-purple.png"
            width={92.5}
            height={74.5}
            alt=""
            className="pointer-events-none absolute hidden object-contain lg:block"
            style={{ left: -178, top: 109 }}
          />
          <img
            src="https://alignui.com/images/landing/cursor-tolunay-green.png"
            width={113.5}
            height={74.5}
            alt=""
            className="pointer-events-none absolute hidden object-contain lg:block"
            style={{ right: -133, top: 192 }}
          />
          <div className="text-[24px]/[32px] font-medium -tracking-[0.01em] text-ln-gray-500 xl:text-[32px]/[40px] xl:-tracking-[0.015em]">
            Who are we?
          </div>
          <h1 className="mt-2 text-[40px]/[48px] font-550 -tracking-[0.02em] text-ln-gray-900 md:mt-3 xl:text-ln-title-h2">
            Shaping the future of design.
          </h1>
          <div
            className="my-8 h-1 w-full text-ln-gray-400 opacity-80 md:my-12"
            style={{
              background:
                'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 10px 1px repeat no-repeat',
            }}
            role="separator"
          />
          <p className="text-ln-paragraph-lg -tracking-[0.01em] text-ln-gray-600 xl:text-[20px]/[32px]">
            AlignUI is a{' '}
            <span className="font-medium text-ln-gray-800">
              powerful design system
            </span>{' '}
            for Figma that helps create great-looking websites and apps. We
            offer a wide range of{' '}
            <span className="font-medium text-ln-gray-800">
              ready-to-use design
            </span>{' '}
            pieces, adjustable dashboards, and templates for different
            industries and needs.
            <br />
            <br />
            What makes AlignUI special is how{' '}
            <span className="font-medium text-ln-gray-800">easy it is to use</span>
            . You can{' '}
            <span className="font-medium text-ln-gray-800">
              quickly change and customize
            </span>{' '}
            our designs to fit your project. We&apos;re always{' '}
            <span className="font-medium text-ln-gray-800">
              researching and improving
            </span>{' '}
            to make sure designers have the best design and layouts to work
            with.
            <br />
            <br />
            We keep up with all the{' '}
            <span className="font-medium text-ln-gray-800">
              latest Figma updates
            </span>
            , so you&apos;re always using the newest features. Plus, you only
            need to{' '}
            <span className="font-medium text-ln-gray-800">
              pay once to use AlignUI forever
            </span>
            , which saves you money in the long run.
            <br />
            <br />
            We&apos;ve recently added a new feature that gives you access to over{' '}
            <span className="font-medium text-ln-gray-800">40 free design</span>{' '}
            pieces and{' '}
            <span className="font-medium text-ln-gray-800">
              many professional-grade layouts
            </span>{' '}
            in our{' '}
            <span className="font-medium text-ln-gray-800">React</span> version.
            This means you can easily use our designs in your{' '}
            <span className="font-medium text-ln-gray-800">coding projects</span>{' '}
            too.
            <br />
            <br />
            With AlignUI, we aim to make{' '}
            <span className="font-medium text-ln-gray-800">
              design easier and better for everyone
            </span>
            , whether you&apos;re a beginner or an expert.
          </p>
          <div className="mt-10 md:mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 109 70"
              width={109}
              height={70}
            >
              <path
                stroke="#707070"
                strokeDasharray="2 3"
                strokeLinejoin="round"
                d="M8.112 56.534c20.141-6.58 38.911-18.41 51.927-35.297 3.46-4.485 6.58-10.681 3.723-15.589-2.76-4.75-9.37-5.173-14.736-4.258C27.816 4.98 9.23 21.345 2.786 42.106 1.454 46.394.598 50.928 1.19 55.383c.593 4.456 2.78 8.842 6.503 11.29 4.005 2.646 9.196 2.745 13.881 1.732 9.128-1.977 17.332-7.967 22.056-16.11 1.448-2.498 2.605-5.271 2.605-8.173 0-2.891-1.341-5.92-3.869-7.287-3.859-2.085-8.563.285-12.014 3-2.907 2.281-5.745 5.104-6.416 8.762-.923 5.055 2.975 10.16 7.845 11.645s10.235-.05 14.483-2.872c4.248-2.832 7.572-6.835 10.829-10.78-.68.837-.972 2.47-.71 3.522a3.5 3.5 0 0 0 2.051 2.36c1.594.65 3.422 0 4.88-.924a13.9 13.9 0 0 0 5.58-6.983c-1.42 1.22-1.4 3.777-.292 5.3 1.108 1.525 3.091 2.204 4.957 2.086 1.857-.118 3.616-.944 5.191-1.947a22.8 22.8 0 0 0 7.504-7.927c1.147-2.026 2.003-4.456 1.274-6.668-.525-1.603-1.837-2.862-3.334-3.61s-3.189-1.032-4.851-1.16a28.6 28.6 0 0 0-15.708 3.314c-.603.325-1.283.806-1.274 1.495 0 .728.749 1.2 1.43 1.436 1.856.64 3.878.55 5.841.433 12.822-.748 25.594-2.194 38.367-3.63"
              />
            </svg>
          </div>
          <div className="mt-5">
            <div className="text-ln-label-sm text-ln-gray-500">
              AlignUI Design System
            </div>
            <div className="mt-1 font-mono text-sm text-ln-gray-400">
              Design &amp; development perfectly aligned.
            </div>
          </div>
        </div>

        <div className="relative mt-12 flex flex-col justify-center gap-6 md:flex-row md:py-7 xl:mt-24 xl:gap-8 before:absolute before:left-0 before:top-0 before:hidden before:h-px before:w-full before:bg-ln-gray-200 md:before:block after:absolute after:bottom-0 after:left-0 after:hidden after:h-px after:w-full after:bg-ln-gray-200 md:after:block">
          <img
            src="https://alignui.com/images/landing/dot.png"
            width={9}
            height={9}
            alt=""
            className="absolute -top-1 -left-px z-30 hidden min-h-[9px] min-w-[9px] md:block"
          />
          <img
            src="https://alignui.com/images/landing/dot.png"
            width={9}
            height={9}
            alt=""
            className="absolute -right-px -top-1 z-30 hidden min-h-[9px] min-w-[9px] md:block"
          />
          <img
            src="https://alignui.com/images/landing/dot.png"
            width={9}
            height={9}
            alt=""
            className="absolute -bottom-1 -left-px z-30 hidden min-h-[9px] min-w-[9px] md:block"
          />
          <img
            src="https://alignui.com/images/landing/dot.png"
            width={9}
            height={9}
            alt=""
            className="absolute -bottom-1 -right-px z-30 hidden min-h-[9px] min-w-[9px] md:block"
          />
          <div
            className="h-px w-full text-ln-gray-300 md:hidden"
            style={{
              background:
                'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat',
            }}
          />
          <div className="flex flex-1 flex-col items-start gap-4 md:items-center md:gap-0 md:text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 25 24"
              className="size-6 shrink-0 text-template-hr"
            >
              <path
                stroke="currentColor"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m8.46 12-4.488 2.234a1.01 1.01 0 0 0 0 1.807l8.249 4.105c.28.139.607.139.886 0l8.25-4.105c.743-.37.743-1.438 0-1.807L16.867 12m-8.406 0L3.97 9.766c-.743-.37-.743-1.437 0-1.807l8.25-4.105a1 1 0 0 1 .886 0l8.25 4.105c.743.37.743 1.437 0 1.807L16.867 12m-8.406 0 3.76 1.871c.28.139.607.139.886 0L16.867 12"
              />
            </svg>
            <div className="md:mt-4">
              <div className="text-ln-label-md text-ln-gray-600">
                Widgets &amp; Examples
              </div>
              <div className="mt-1 text-ln-title-h4 text-ln-gray-900">400+</div>
            </div>
          </div>
          <div className="hidden w-px bg-ln-gray-200 md:block" />
          <div
            className="h-px w-full text-ln-gray-300 md:hidden"
            style={{
              background:
                'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat',
            }}
          />
          <div className="flex flex-1 flex-col items-start gap-4 md:items-center md:gap-0 md:text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="size-6 shrink-0 text-template-ai"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m8.957 5.043 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0L8.957 6.457a1 1 0 0 1 0-1.414Zm0 12.5 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0l-2.336-2.336a1 1 0 0 1 0-1.414Zm-6.25-6.25 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0l-2.336-2.336a1 1 0 0 1 0-1.414Zm12.5 0 2.336-2.336a1 1 0 0 1 1.414 0l2.336 2.336a1 1 0 0 1 0 1.414l-2.336 2.336a1 1 0 0 1-1.414 0l-2.336-2.336a1 1 0 0 1 0-1.414Z"
              />
            </svg>
            <div className="md:mt-4">
              <div className="text-ln-label-md text-ln-gray-600">
                Components &amp; Variant
              </div>
              <div className="mt-1 text-ln-title-h4 text-ln-gray-900">
                8000+
              </div>
            </div>
          </div>
          <div className="hidden w-px bg-ln-gray-200 md:block" />
          <div
            className="h-px w-full text-ln-gray-300 md:hidden"
            style={{
              background:
                'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat',
            }}
          />
          <div className="flex flex-1 flex-col items-start gap-4 md:items-center md:gap-0 md:text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 25 24"
              className="size-6 shrink-0 text-template-marketing"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.329 3.077a2 2 0 0 1 2 0l6.227 3.596a2 2 0 0 1 1 1.732v7.19a2 2 0 0 1-1 1.732l-6.227 3.596a2 2 0 0 1-2 0l-6.227-3.595a2 2 0 0 1-1-1.733v-7.19a2 2 0 0 1 1-1.732z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.578 12h1.5m.75 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
              />
            </svg>
            <div className="md:mt-4">
              <div className="text-ln-label-md text-ln-gray-600">
                Styles, Variable &amp; Tokens
              </div>
              <div className="mt-1 text-ln-title-h4 text-ln-gray-900">400+</div>
            </div>
          </div>
          <div
            className="h-px w-full text-ln-gray-300 md:hidden"
            style={{
              background:
                'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat',
            }}
          />
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-[564px] md:mt-32">
          <img
            src="https://alignui.com/images/landing/cursor-bora-red.png"
            width={84.5}
            height={74.5}
            alt=""
            className="pointer-events-none absolute hidden object-contain lg:block"
            style={{ left: -144, top: -7 }}
          />
          <img
            src="https://alignui.com/images/landing/cursor-halil-blue.png"
            width={82.5}
            height={74.5}
            alt=""
            className="pointer-events-none absolute hidden object-contain lg:block"
            style={{ right: 99, top: 167 }}
          />
          <div className="text-[24px]/[32px] font-medium -tracking-[0.01em] text-ln-gray-500 xl:text-[32px]/[40px] xl:-tracking-[0.015em]">
            Mission and guidance.
          </div>
          <h1 className="mt-2 text-[40px]/[48px] font-550 -tracking-[0.02em] text-ln-gray-900 md:mt-3 xl:text-ln-title-h2">
            AlignUI helps you design well.
          </h1>
          <div
            className="my-8 h-1 w-full text-ln-gray-400 opacity-80 md:my-12"
            style={{
              background:
                'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 10px 1px repeat no-repeat',
            }}
            role="separator"
          />
          <p className="text-ln-paragraph-lg -tracking-[0.01em] text-ln-gray-600 xl:text-[20px]/[32px]">
            AlignUI is a{' '}
            <span className="font-medium text-ln-gray-800">
              comprehensive figma design system
            </span>{' '}
            for all designer levels. Our{' '}
            <span className="font-medium text-ln-gray-800">
              advanced component library
            </span>{' '}
            enhances workflows, enabling efficient creation of exceptional
            designs. With a{' '}
            <span className="font-medium text-ln-gray-800">
              user-friendly interface
            </span>{' '}
            and up-to-date practices, we guide users to create accurate,
            appealing designs.
            <br />
            <br />
            AlignUI{' '}
            <span className="font-medium text-ln-gray-800">empowers designers</span>
            , elevating the design process for everyone in the field.
          </p>
        </div>

        <div className="-mx-4 bg-ln-gray-25 mt-8 md:mx-0 md:mt-12 px-4">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row xl:gap-6">
            <div className="flex max-w-[428px] flex-1 flex-col gap-6 rounded-[28px] bg-ln-gray-50 p-6 shadow-ln-badge-gray xl:gap-7 xl:p-8">
              <div className="flex size-11 items-center justify-center rounded-[13px] bg-ln-gray-50 shadow-ln-badge-gray">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="size-6 text-ln-gray-500"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12.632 3.442c2.101-1.19 4.817-1.698 8.44-1.44a1 1 0 0 1 .925.927c.26 3.622-.249 6.338-1.44 8.439-1.088 1.92-2.689 3.226-4.557 4.239v1.473a3 3 0 0 1-1.048 2.278l-2.801 2.401a1 1 0 0 1-1.599-.44l-.002-.007-.01-.027a20 20 0 0 0-.2-.543 24 24 0 0 0-.6-1.425c-.526-1.142-1.215-2.378-1.947-3.11s-1.968-1.421-3.11-1.948a24 24 0 0 0-1.968-.8l-.027-.01-.007-.001a1.002 1.002 0 0 1-.44-1.599l2.401-2.801A3 3 0 0 1 6.92 8h1.473c1.013-1.868 2.318-3.47 4.239-4.558M15.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                    clipRule="evenodd"
                  />
                  <path
                    fill="currentColor"
                    d="M5.207 16.793a1 1 0 0 1 0 1.414l-2.5 2.5a1 1 0 0 1-1.414-1.414l2.5-2.5a1 1 0 0 1 1.414 0m2 3.414a1 1 0 1 0-1.414-1.414l-1.5 1.5a1 1 0 1 0 1.414 1.414z"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-ln-title-h5 text-ln-gray-800">
                    Empowering
                  </span>
                  <div className="flex h-5 items-center rounded-md px-[7px] text-[11px] font-semibold text-ln-gray-600 shadow-ln-badge-gray">
                    MISSION
                  </div>
                </div>
                <p className="mt-4 text-ln-label-lg text-ln-gray-700">
                  At AlignUI, we are dedicated to providing UI/UX designers
                  using Figma with the best and most advanced design system.
                  <br />
                  <br />
                  Our mission is to empower designers at all levels, from
                  juniors to senior designers, with a comprehensive component
                  library and more.
                  <br />
                  <br />
                  By offering a comprehensive design system, we enhance
                  workflows and enable designers to create exceptional designs
                  efficiently.
                </p>
              </div>
              <div className="text-balance text-ln-paragraph-sm text-ln-gray-450">
                We aim to empower designers at all levels with a comprehensive
                design system.
              </div>
            </div>
            <div className="flex max-w-[428px] flex-1 flex-col gap-6 rounded-[28px] bg-ln-gray-50 p-6 shadow-ln-badge-gray xl:gap-7 xl:p-8">
              <div className="flex size-11 items-center justify-center rounded-[13px] bg-ln-gray-50 shadow-ln-badge-gray">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="size-6 text-ln-gray-500"
                >
                  <path
                    fill="currentColor"
                    d="M18.577 2.568a1.25 1.25 0 0 0-2.07-.488l-2.628 2.628A3 3 0 0 0 13 6.829v2.757l-1.707 1.707a1 1 0 0 0 1.414 1.415L14.414 11h2.758a3 3 0 0 0 2.12-.879l2.63-2.628a1.25 1.25 0 0 0-.49-2.07l-2.141-.714-.714-2.142Z"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 0 1 8-8 1 1 0 1 0 0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10a1 1 0 1 0-2 0 8 8 0 1 1-16 0"
                  />
                  <path
                    fill="currentColor"
                    d="M10.8 8.183a1 1 0 1 0-.6-1.908A6.002 6.002 0 0 0 12 18a6 6 0 0 0 5.725-4.2 1 1 0 1 0-1.908-.6A4.002 4.002 0 0 1 8 12a4 4 0 0 1 2.8-3.817"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-ln-title-h5 text-ln-gray-800">
                    Accuracy
                  </span>
                  <div className="flex h-5 items-center rounded-md px-[7px] text-[11px] font-semibold text-ln-gray-600 shadow-ln-badge-gray">
                    GUIDANCE
                  </div>
                </div>
                <p className="mt-4 text-ln-label-lg text-ln-gray-700">
                  With over 10 years of experience in the field, we leverage our
                  expertise to guide and inspire users towards creating accurate
                  and visually appealing designs.
                  <br />
                  <br />
                  Through thorough research, we ensure that our offerings stay
                  up-to-date with the design trends and best practices.
                  <br />
                  <br />
                  Our organized approach and user-friendly interface make it
                  easy for designers to navigate our system and elevate their
                  design process.
                </p>
              </div>
              <div className="text-balance text-ln-paragraph-sm text-ln-gray-450">
                We guide and inspire users to create accurate, appealing
                designs.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 px-2 md:mt-24 md:px-2.5">
          <div className="overflow-hidden rounded-3xl bg-ln-gray-0 shadow-ln-xs xl:rounded-[28px]">
            <div className="relative px-5 md:container">
            
            </div>
          </div>
        </div>

        <div className="container mt-10">
          <div className="relative flex flex-col justify-center gap-6 xl:mt-10 xl:flex-row xl:gap-16">
            <div className="flex flex-col items-start gap-5 xl:w-[292px] xl:items-center xl:gap-0 xl:text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="size-6 text-template-ai"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.75 5.75a2 2 0 0 1 2-2h12.5a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2h-2.874a1 1 0 0 0-.638.23l-2.098 1.738a1 1 0 0 1-1.28-.003l-2.066-1.731a1 1 0 0 0-.642-.234H5.75a2 2 0 0 1-2-2z"
                />
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.253 10.668c0 2.077-2.98 3.612-3.252 3.612-.27 0-3.251-1.535-3.251-3.612 0-1.445.903-2.168 1.806-2.168s1.445.542 1.445.542.542-.542 1.445-.542c.904 0 1.807.723 1.807 2.168Z"
                />
              </svg>
              <div className="xl:mt-4">
                <div className="text-ln-label-md text-ln-gray-800">
                  Understanding Needs
                </div>
                <div className="mt-1 text-pretty text-ln-paragraph-sm text-ln-gray-600">
                  We research extensively to deeply understand designers&apos;
                  needs.
                </div>
              </div>
            </div>
            <div
              className="h-px w-full text-ln-gray-300 xl:hidden"
              style={{
                background:
                  'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat',
              }}
              role="separator"
            />
            <div className="flex flex-col items-start gap-5 xl:w-[292px] xl:items-center xl:gap-0 xl:text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="size-6 text-template-crypto"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="m2.75 10.964 1.026 2.434c.358.852 1.577.805 1.869-.072L6.91 9.533c.308-.922 1.612-.91 1.902.018l3.126 9.996c.304.973 1.693.923 1.927-.07l3.52-14.954c.23-.974 1.583-1.048 1.916-.105l1.949 5.518"
                />
              </svg>
              <div className="xl:mt-4">
                <div className="text-ln-label-md text-ln-gray-800">
                  Continuous Improvement
                </div>
                <div className="mt-1 text-pretty text-ln-paragraph-sm text-ln-gray-600">
                  We shape our solutions through customer feedback to ensure
                  continuous quality and innovation.
                </div>
              </div>
            </div>
            <div
              className="h-px w-full text-ln-gray-300 xl:hidden"
              style={{
                background:
                  'linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 8px 1px repeat no-repeat',
              }}
              role="separator"
            />
            <div className="flex flex-col items-start gap-5 xl:w-[292px] xl:items-center xl:gap-0 xl:text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="size-6 text-template-finance"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.75 9.75V9.5c0-3.728 3.246-6.75 7.25-6.75s7.25 3.022 7.25 6.75v.25M12 19.643v.607a1 1 0 0 0 1 1h2a4.5 4.5 0 0 0 4.5-4.5m-15.25-7h1.5v6.5h-1.5a1.5 1.5 0 0 1-1.5-1.5v-3.5a1.5 1.5 0 0 1 1.5-1.5m14 0h1.5a1.5 1.5 0 0 1 1.5 1.5v3.5a1.5 1.5 0 0 1-1.5 1.5h-1.5z"
                />
              </svg>
              <div className="xl:mt-4">
                <div className="text-ln-label-md text-ln-gray-800">
                  Responsive Communication
                </div>
                <div className="mt-1 text-pretty text-ln-paragraph-sm text-ln-gray-600">
                  We provide prompt responses to customer inquiries via various
                  channels.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
