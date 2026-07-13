'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface FilterOption {
  id: string
  label: string
}

interface Category extends FilterOption {}
interface SizeOption extends FilterOption {}
interface Color extends FilterOption {}

interface ProductFiltersProps {
  categories: Category[]
  sizes: SizeOption[]
  colors: Color[]
  priceRange: [number, number]
  onFilterChange: (filters: {
    categories?: string[]
    sizes?: string[]
    colors?: string[]
    priceRange?: [number, number]
  }) => void
  className?: string
}

export function ProductFilters({
  categories,
  sizes,
  colors,
  priceRange,
  onFilterChange,
  className,
}: ProductFiltersProps) {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([])
  const [selectedColors, setSelectedColors] = React.useState<string[]>([])
  const [priceMin, setPriceMin] = React.useState(priceRange[0])
  const [priceMax, setPriceMax] = React.useState(priceRange[1])
  const [isOpen, setIsOpen] = React.useState(false)

  const handleCategoryChange = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((c) => c !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(updated)
    onFilterChange({ categories: updated })
  }

  const handleSizeChange = (sizeId: string) => {
    const updated = selectedSizes.includes(sizeId)
      ? selectedSizes.filter((s) => s !== sizeId)
      : [...selectedSizes, sizeId]
    setSelectedSizes(updated)
    onFilterChange({ sizes: updated })
  }

  const handleColorChange = (colorId: string) => {
    const updated = selectedColors.includes(colorId)
      ? selectedColors.filter((c) => c !== colorId)
      : [...selectedColors, colorId]
    setSelectedColors(updated)
    onFilterChange({ colors: updated })
  }

  const handlePriceChange = () => {
    onFilterChange({ priceRange: [priceMin, priceMax] })
  }

  const handleReset = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setPriceMin(priceRange[0])
    setPriceMax(priceRange[1])
    onFilterChange({})
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button onClick={() => setIsOpen(!isOpen)} variant="outline" fullWidth>
          {isOpen ? 'Приховати фільтри' : 'Показати фільтри'}
        </Button>
      </div>

      {/* Filters */}
      <div
        className={cn(
          'bg-white p-6 rounded-lg border border-gray-200',
          'md:block md:sticky md:top-20',
          isOpen ? 'block' : 'hidden',
          className
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Фільтри</h2>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-sm text-blue-600 hover:text-blue-700 transition"
            >
              Скинути
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Категорія</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-gray-700">{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Розмір</h3>
            <div className="space-y-2">
              {sizes.map((size) => (
                <label key={size.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size.id)}
                    onChange={() => handleSizeChange(size.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-gray-700">{size.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Колір</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition',
                    selectedColors.includes(color.id)
                      ? 'border-black scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  )}
                  style={{ backgroundColor: color.label.toLowerCase() }}
                  title={color.label}
                />
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Ціна</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Від: ${priceMin}</label>
              <input
                type="range"
                min={priceRange[0]}
                max={priceRange[1]}
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">До: ${priceMax}</label>
              <input
                type="range"
                min={priceRange[0]}
                max={priceRange[1]}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <Button onClick={handlePriceChange} size="sm" fullWidth>
              Застосувати
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
