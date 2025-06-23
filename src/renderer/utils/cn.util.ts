import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {}
  }
})

export const cn = (...args: Array<ClassValue>) => twMerge(clsx(args))
