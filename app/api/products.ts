import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { getLocalStorageUser } from '@/localStorageUser'
import { addProductFxProps } from '@/types/products'

export const getProductsFx = createEffect(async (url: string) => {
  try {
    const token = getLocalStorageUser().token
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const addProductFx = createEffect(
  async ({ url, new__product }: addProductFxProps) => {
    try {
      const token = getLocalStorageUser().token
      const { data } = await api.post(url, new__product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)