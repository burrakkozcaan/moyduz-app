'use client'

import { Angry, Check, Frown, Laugh, Loader2, Smile } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const feedback = [
  { happiness: 4, emoji: Laugh, color: 'text-green-600' },
  { happiness: 3, emoji: Smile, color: 'text-green-400' },
  { happiness: 2, emoji: Frown, color: 'text-yellow-400' },
  { happiness: 1, emoji: Angry, color: 'text-red-600' }
]

export const FeedbackWidget = ({ className }: { className?: string }) => {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [happiness, setHappiness] = useState<null | number>(null)

  const [isSubmitted, setSubmissionState] = useState(false)
  const { submitFeedback, isLoading, isSent } = useSubmitFeedback()

  useEffect(() => {
    if (!happiness) {
      if (textRef.current) textRef.current.value = ''
    }
  }, [happiness])

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    let submissionStateTimeout: NodeJS.Timeout | null = null

    if (isSent) {
      setSubmissionState(true)

      timeout = setTimeout(() => {
        setHappiness(null)
        if (textRef.current) textRef.current.value = ''
      }, 2000)

      submissionStateTimeout = setTimeout(() => {
        setSubmissionState(false)
      }, 2200)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
      if (submissionStateTimeout) {
        clearTimeout(submissionStateTimeout)
      }
    }
  }, [isSent])

  return (
    <motion.div
      layout
      initial={{ borderRadius: '2rem' }}
      animate={happiness ? { borderRadius: '0.5rem' } : { borderRadius: '2rem' }}
      className={cn(
        'w-fit overflow-hidden bg-gray-50 dark:bg-neutral-950 py-2 border border-ln-gray-200  dark:border-neutral-800',
        className
      )}>
      <span className="flex items-center justify-center gap-3 pl-4 pr-2">
        <div className="text-sm text-gray-900 dark:text-neutral-400">Bu içeriği faydalı buldunuz mu?</div>
        <div className="flex items-center text-neutral-400">
          {feedback.map((e) => {
            const EmojiIcon = e.emoji
            return (
              <button
                onClick={() => setHappiness((prev) => (e.happiness === prev ? null : e.happiness))}
                className={cn(
                  'flex h-9 w-9 items-center  justify-center rounded-full transition-all',
                  happiness === e.happiness ? e.color : 'text-neutral-500 dark:text-neutral-400 outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800'
                )}
                key={e.happiness}>
                <EmojiIcon size={18} />
              </button>
            )
          })}
        </div>
      </span>
      <motion.div
        aria-hidden={happiness ? false : true}
        initial={{ height: 0, translateY: 15 }}
        className="px-2"
        transition={{ ease: 'easeInOut', duration: 0.3 }}
        animate={happiness ? { height: '195px', width: '330px' } : {}}>
        <AnimatePresence>
          {!isSubmitted ? (
            <motion.span exit={{ opacity: 0 }} initial={{ opacity: 1 }}>
              <textarea
                ref={textRef}
                placeholder="Görüşlerinizi bizimle paylaşın..."
                className="min-h-32 w-full resize-none rounded-md border bg-transparent p-2 text-sm placeholder-neutral-400 focus:border-neutral-400 focus:outline-0 dark:border-neutral-800 focus:dark:border-white"
              />
              <div className="flex h-fit w-full justify-end">
                <button
                  onClick={() => submitFeedback(happiness!, textRef.current!.value || '')}
                  className={cn(
                    'mt-1 flex h-9 items-center text-black dark:text-white justify-center rounded-md border bg-neutral-950 px-2 text-sm text-black dark:bg-white dark:text-neutral-950',
                    {
                      'bg-neutral-500 dark:bg-white text-black dark:text-neutral-500': isLoading
                    }
                  )}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-black dark:text-neutral-950" />
                      Yükleniyor
                    </>
                  ) : (
                    'Gönder'
                  )}
                </button>
              </div>
            </motion.span>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex h-full w-full  flex-col items-center justify-start gap-2 pt-9 text-sm font-normal">
              <motion.div
                variants={item}
                className="flex h-8 min-h-8  w-8 min-w-8 items-center justify-center rounded-full bg-blue-500 dark:bg-sky-500">
                <Check strokeWidth={2.5} size={16} className="stroke-white" />
              </motion.div>
              <motion.div variants={item}>Geri bildiriminiz alındı!</motion.div>
              <motion.div variants={item}>Yardımınız için teşekkür ederiz.</motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.04
    }
  }
}

const item = {
  hidden: { y: 10 },
  show: { y: 0 }
}

const useSubmitFeedback = () => {
  const [feedback, setFeedback] = useState<{ happiness: number; feedback: string } | null>(null)
  const [isLoading, setLoadingState] = useState(false)
  const [error, setError] = useState<{ error: any } | null>(null)
  const [isSent, setRequestState] = useState(false)

  const submitFeedback = (feedback: { happiness: number; feedback: string }) =>
    new Promise((res) => setTimeout(() => res(feedback), 1000))

  useEffect(() => {
    if (feedback) {
      setLoadingState(true)
      setRequestState(false)

      submitFeedback(feedback)
        .then(() => {
          setRequestState(true)
          setError(null)
        })
        .catch(() => {
          setRequestState(false)
          setError({ error: 'some error' })
        })
        .finally(() => setLoadingState(false))
    }
  }, [feedback])

  return {
    submitFeedback: (happiness: number, feedback: string) => setFeedback({ happiness, feedback }),
    isLoading,
    error,
    isSent
  }
}
