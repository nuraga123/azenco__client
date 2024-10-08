import { createEffect, Effect } from 'effector-next'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import { ISingUpFx, ISignInFx } from '@/types/auth'
import api from '../axiosClient'
import { HTTPStatus } from '@/constans'
import { IForgotPassword } from '@/pages/forgot-password'
import { setUser } from '@/context/user'
import { showAuthError } from '@/utils/errors'

export const singUpFx = createEffect(
  async ({ url, username, password, email }: ISingUpFx) => {
    const { data } = await api.post(url, { username, password, email })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }
    toast.success('Qeydiyyat uğurla başa çatdı!')
    return data
  }
)

export const singInFx = createEffect(
  async ({ url, username, password }: ISignInFx) => {
    const { data } = await api.post(url, { username, password })

    console.log(data)
    if (data) {
      setUser(data)
      return data
    }
  }
)

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)
    console.log(data)
    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }
    toast.error((error as Error).message)
  }
})

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
    return 'out'
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const getTokenFx = createEffect(async (token: string) => {
  try {
    const { data } = await api.post(
      '/users/validate-token',
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios səhvi
      if (error.response) {
        toast.error(
          `server işləmir: ${error.response.status} - ${error.response.statusText}`
        )
      } else if (error.request) {
        toast.error(
          'server işləmir. Xahiş edirik, daha sonra yenidən cəhd edin.'
        )
      } else {
        toast.error(`server işləmir: ${error.message}`)
      }
    } else {
      // Tanınmayan səhv tipi
      toast.error('server işləmir')
    }
    console.log(error)
    return 'not server'
  }
})

// methodName: `server bağlantısı`,
export const getWorkingServerFx = createEffect(async () => {
  try {
    const { data } = await api.get('/users/work')

    console.log(data)
    return data
  } catch (error) {
    showAuthError(error)
  }
})

export const getUsersNamesServer = createEffect(async () => {
  try {
    const { data } = await api.get('/users/names')
    console.log(data)
    return data
  } catch (error) {
    showAuthError(error)
  }
})

export interface IUpdateUserPassword {
  secret: string
  id: number
  newPassword: string
}

export const updateUserPasswordServer: Effect<
  IUpdateUserPassword,
  IForgotPassword | undefined,
  Error
> = createEffect(async ({ secret, id, newPassword }: IUpdateUserPassword) => {
  try {
    const { data } = await api.post('users/secret-word', {
      secret,
      id,
      newPassword,
    })

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getDoneSecret = createEffect(async (secret: string) => {
  try {
    const { data } = await api.post('users/secret', { secret })

    console.log(data)
    return data
  } catch (error) {
    showAuthError(error)
  }
})
