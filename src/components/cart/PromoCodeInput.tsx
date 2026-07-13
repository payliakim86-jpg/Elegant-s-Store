'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface PromoCodeInputProps {
  onApply?: (code: string) => void
  isLoading?: boolean
  className?: string
}

export function PromoCodeInput({ onApply, isLoading, className }: PromoCodeInputProps) {
  const [code, setCode] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim()) {
      onApply?.(code)
      setCode('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      <Input
        type="text"
        placeholder="Введіть промокод"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" variant="outline" isLoading={isLoading} disabled={!code.trim()}>
        Застосувати
      </Button>
    </form>
  )
}
