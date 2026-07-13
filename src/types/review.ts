// Review types
export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  helpful: number
  notHelpful: number
  images?: string[]
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface ReviewInput {
  rating: number
  title: string
  comment: string
  images?: File[]
}
