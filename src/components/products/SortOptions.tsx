'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating'

interface SortOptionsProps {
  value: SortOption
  onChange: (value: SortOption) => void
  className?: string
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Новинки' },
  { value: 'popular', label: 'Популярні' },
  { value: 'rating', label: 'За рейтингом' },
  { value: 'price-asc', label: 'Ціна: від низької до високої' },
  { value: 'price-desc', label: 'Ціна: від високої до низької' },
]

export function SortOptions({ value, onChange, className }: SortOptionsProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const currentLabel = sortOptions.find((opt) => opt.value === value)?.label || 'Сортувати'

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>{currentLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10 min-w-max">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={cn(
                'block w-full text-left px-4 py-2 transition',
                value === option.value ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
