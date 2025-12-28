'use client'

import Image from './Image'
import Link from './Link'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const Card = ({ title, description, imgSrc, href }) => {
  const [isImageOpen, setIsImageOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isImageOpen) {
        setIsImageOpen(false)
      }
    }

    if (isImageOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isImageOpen])

  return (
    <div className="flex flex-col items-start lg:flex-row lg:items-start">
      <div className="relative w-full lg:w-2/5">
        {imgSrc && (
          <>
            <button
              onClick={() => setIsImageOpen(true)}
              className="relative block w-full cursor-pointer overflow-hidden rounded-lg"
              aria-label={`Preview ${title} image`}
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                alt={title}
                src={imgSrc}
                className="h-full w-full object-cover transition-opacity hover:opacity-90"
                width={544}
                height={306}
              />
            </button>
            {isImageOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                onClick={() => setIsImageOpen(false)}
              >
                <button
                  className="absolute top-4 right-4 text-4xl text-white hover:text-gray-300"
                  onClick={() => setIsImageOpen(false)}
                  aria-label="Close image preview"
                >
                  ×
                </button>
                <div className="relative max-h-[90vh] max-w-[90vw]">
                  <Image
                    alt={title}
                    src={imgSrc}
                    className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
                    width={1920}
                    height={1080}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between space-y-4 py-6 lg:pt-0 lg:pl-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        {href && (
          <Link
            href={href}
            className="group inline-flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            aria-label={`Link to ${title}`}
          >
            View project
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default Card
