import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IInputs } from '@/types/auth'
import { singInFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import { setUser } from '@/context/user'
import NameInput from '@/components/elements/AuthPage/NameInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'

import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  console.log(register)

  const router = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const userData = await singInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })
      resetField('name')
      resetField('password')

      // После успешного входа
      if (userData?.user) {
        const userDataOne = userData.user

        localStorage.setItem('token', userDataOne.token)
        localStorage.setItem('userId', userDataOne.userId)
        localStorage.setItem('username', userDataOne.username)
        localStorage.setItem('email', userDataOne.email)

        setUser({
          id: userDataOne.userId,
          username: userDataOne.username,
          email: userDataOne.email,
        })

        router.push('/my')
      }

      router.push('/')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title}`}>
        {'AZENCO ASC '}
      </h2>
      <NameInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} />
        ) : (
          'giriş'.toUpperCase()
        )}
      </button>
    </form>
  )
}

export default SignInForm
