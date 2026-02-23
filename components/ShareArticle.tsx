'use client'

import React, { useState, useEffect } from 'react'
import {
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon,
  Check,
} from 'lucide-react'

interface ShareArticleProps {
  title: string
  url?: string
}

export function ShareArticle({ title, url }: ShareArticleProps) {
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (url) {
      setCurrentUrl(url)
    } else if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [url])

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#1DA1F2]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#0A66C2]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#1877F2]',
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-y border-ln-gray-200 dark:border-ln-gray-800 my-8">
      <div className="flex items-center gap-2 text-ln-gray-600 dark:text-ln-gray-400 text-sm font-medium mr-2">
        <Share2 className="w-4 h-4" />
        <span>Share this page</span>
      </div>

      <div className="flex items-center gap-2">
        {shareLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-50 dark:bg-ln-gray-900 text-ln-gray-600 dark:text-ln-gray-400 transition-colors ${link.color} hover:border-ln-gray-300 dark:hover:border-ln-gray-700`}
              aria-label={`Share on ${link.name}`}
            >
              <Icon className="w-4 h-4" />
            </a>
          )
        })}

        <button
          onClick={handleCopy}
          className="p-2 rounded-full border border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-50 dark:bg-ln-gray-900 text-ln-gray-600 dark:text-ln-gray-400 transition-colors hover:text-ln-gray-900 dark:hover:text-ln-gray-0 hover:border-ln-gray-300 dark:hover:border-ln-gray-700 relative"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ln-gray-900 dark:bg-ln-gray-0 text-ln-gray-0 dark:text-ln-gray-900 text-xs px-2 py-1 rounded shadow-lg font-bold">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
