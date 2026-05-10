import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    'Pending':      'bg-amber-100 text-amber-800 border-amber-200',
    'Under Review': 'bg-blue-100 text-blue-800 border-blue-200',
    'Approved':     'bg-green-100 text-green-800 border-green-200',
    'Rejected':     'bg-red-100 text-red-800 border-red-200',
    'Appeal':       'bg-purple-100 text-purple-800 border-purple-200',
  }
  return map[status] ?? 'bg-stone-100 text-stone-700 border-stone-200'
}

export function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    'Low':      'text-stone-400',
    'Medium':   'text-amber-500',
    'High':     'text-orange-500',
    'Critical': 'text-red-500',
  }
  return map[priority] ?? 'text-stone-400'
}

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English',  nativeName: 'English' },
  { code: 'hi', name: 'Hindi',    nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali',  nativeName: 'বাংলা' },
  { code: 'or', name: 'Odia',     nativeName: 'ଓଡ଼ିଆ' },
  { code: 'te', name: 'Telugu',   nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil',    nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi',  nativeName: 'मराठी' },
  { code: 'sa', name: 'Santali',  nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' },
] as const

export type LangCode = typeof SUPPORTED_LANGUAGES[number]['code']