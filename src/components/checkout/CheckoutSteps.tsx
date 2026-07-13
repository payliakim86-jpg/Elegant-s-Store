'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { cn } from '@/utils/cn'

interface Step {
  id: string
  label: string
}

interface CheckoutStepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function CheckoutSteps({ steps, currentStep, className }: CheckoutStepsProps) {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
                  index <= currentStep
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-600'
                )}
              >
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm mt-2 text-center font-medium">
                {step.label}
              </p>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-1 mx-2 transition-all',
                  index < currentStep ? 'bg-black' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
