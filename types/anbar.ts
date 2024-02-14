export interface AnbarProduct {
  userId: number
  productId: number
  name: string
  type: string
  price: number
  unit: string
  azenco__code: string
  images: string
  createdAt: string
  updatedAt: string
}

export interface AnbarProductProps {
  id?: number
  userId?: number
  azenco__code?: string
  name?: string
  img?: string
  ordered?: boolean
  previous_stock?: string
  previous_total_price?: string
  price: string
  productId?: number
  stock: string
  total_price?: string
  type?: string
  unit?: string
  username?: string
  updatedAt?: string
  createdAt?: string
}

export interface AnbarUser {
  id: number
  username: string
  anbar: AnbarProduct[]
}

export interface Anbars {
  AnbarUsers: AnbarUser[]
}

export interface IOrderTransfer {
  fromUserId: number
  fromUsername: string
  toUserId: number
  toUsername: string
  product: AnbarProductProps
}

export interface ITransfer extends IOrderTransfer {
  quantity?: number
}

export interface ITransferSend {
  url: string
  transfer: ITransfer
}
