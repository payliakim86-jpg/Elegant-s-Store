'use client'

import React from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg',
              'focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-10',
              'transition-all duration-200',
              'placeholder-gray-400',
              error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
          {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
        </div>
        {error && <p className="text-red-600 text-sm mt-1.5 font-medium">{error}</p>}
        {helperText && !error && <p className="text-gray-500 text-sm mt-1.5">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
