// API utility functions
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...fetchOptions } = options
  const url = `${API_URL}${endpoint}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(error.message || `API Error: ${response.statusText}`)
  }

  return response.json()
}

// GET request
export function apiGet<T>(endpoint: string, token?: string) {
  return apiCall<T>(endpoint, { method: 'GET', token })
}

// POST request
export function apiPost<T>(endpoint: string, data?: unknown, token?: string) {
  return apiCall<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    token,
  })
}

// PUT request
export function apiPut<T>(endpoint: string, data?: unknown, token?: string) {
  return apiCall<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
    token,
  })
}

// DELETE request
export function apiDelete<T>(endpoint: string, token?: string) {
  return apiCall<T>(endpoint, { method: 'DELETE', token })
}
