// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

export const validatePhoneNumber = (phone: string): boolean => {
  // Simple phone validation
  const phoneRegex = /^[\d+\-\s()]{10,}$/
  return phoneRegex.test(phone)
}

export const validatePostalCode = (postalCode: string, country = 'US'): boolean => {
  if (country === 'US') {
    return /^\d{5}(-\d{4})?$/.test(postalCode)
  }
  return true // Add more country-specific validations as needed
}

export const validateCreditCard = (cardNumber: string): boolean => {
  const cardRegex = /^\d{13,19}$/
  return cardRegex.test(cardNumber.replace(/\s/g, ''))
}

export interface ValidationError {
  field: string
  message: string
}

export const validateForm = (data: Record<string, unknown>, rules: Record<string, (value: unknown) => boolean | string>): ValidationError[] => {
  const errors: ValidationError[] = []

  Object.entries(rules).forEach(([field, rule]) => {
    const result = rule(data[field])
    if (result !== true) {
      errors.push({
        field,
        message: typeof result === 'string' ? result : `${field} is invalid`,
      })
    }
  })

  return errors
}
