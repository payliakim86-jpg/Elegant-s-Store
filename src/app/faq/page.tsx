'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Як оформити замовлення?',
    answer: 'Вибірте товари, додайте їх до кошика, перейдіть на сторінку кошика та натисніть "Оформити замовлення". Заповніть необхідні дані та оберіть спосіб оплати.',
  },
  {
    question: 'Яких розмірів доставки витрати?',
    answer: 'Доставка безплатна для замовлень від $50. Для замовлень менше ніж $50, вартість доставки складає $10.',
  },
  {
    question: 'Як відстежити мене замовлення?',
    answer: 'Після розміщення замовлення, ви отримаєте email з номером відстеження. Ви можете використовувати цей номер для відстеження вашого посилання на сайті кур'єра.',
  },
  {
    question: 'Які способи оплати ви приймаєте?',
    answer: 'Ми приймаємо кредитні карти, PayPal та банківські переводи. Всі платежі захищені з використанням SSL-шифрування.',
  },
  {
    question: 'Яка ваша політика повернення?',
    answer: 'Ви можете повернути товар протягом 30 днів після покупки, якщо він не було використано. Оригінальна упаковка повинна бути збережена.',
  },
  {
    question: 'Як скидать скидку чи промокод?',
    answer: 'На сторінці кошика ви знайдете поле для введення промокоду. Введіть ваш код та натисніть "Застосувати".',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <MainLayout className="py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Часто задавані питання</h1>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index}>
              <CardHeader
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                  <svg
                    className={`w-6 h-6 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </CardHeader>
              {openIndex === index && (
                <CardContent>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
