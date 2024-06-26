import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'

import barnImg from '@/public/img/garage-icon.jpg'
import { getBarnsUsernameFx } from '@/app/api/barn'
import { $user } from '@/context/user'
import { getLocalStorageUser } from '@/localStorageUser'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/anbar/index.module.scss'

const BarnsPage = () => {
  const { username } = useStore($user)
  const { usernameStorage } = getLocalStorageUser()
  const [spinner, setSpinner] = useState<boolean>(false)

  const [barnsUsername, setBarnsUsername] = useState<
    [{ username: string; userId: number }]
  >([{ username: '', userId: 0 }])

  const adminCheckUsername: boolean =
    process.env.NEXT_PUBLIC_ADMIN_NAME === username ||
    process.env.NEXT_PUBLIC_ADMIN_NAME === usernameStorage

  useEffect(() => {
    const getAnbarServer = async () => {
      try {
        setSpinner(true)
        const { usernames } = await getBarnsUsernameFx()
        if (usernames) setBarnsUsername(usernames)
      } catch (error) {
        console.log((error as Error).message)
      } finally {
        setSpinner(false)
      }
    }

    getAnbarServer()
  }, [])

  console.log(barnsUsername)

  return (
    <div className={styles.anbar}>
      <h1 className={styles.title}>Anbar Səhifəsi</h1>
      {adminCheckUsername && (
        <div>
          <Link href={`barns/create-form`} passHref legacyBehavior>
            <a className={styles.add__form}>Anbar yaradın</a>
          </Link>
        </div>
      )}
      <div className={styles.anbar__items}>
        {spinner ? (
          <div
            className={spinnerStyles.spinner}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              background: 'gray',
            }}
          />
        ) : barnsUsername?.length ? (
          barnsUsername.map(
            (
              barn: {
                username: string
                userId: number
              },
              index: number
            ) => (
              <Link
                key={index}
                href={`/barns/user-id/${barn?.userId}`}
                passHref
                legacyBehavior
              >
                <a className={styles.anbar__item}>
                  <div className={styles.container}>
                    <Image
                      src={barnImg.src}
                      alt="barn-img"
                      width={50}
                      height={35}
                    />
                    <div>
                      {`${index + 1}) Anbar: `} <b>{barn.username}</b>
                    </div>
                  </div>
                </a>
              </Link>
            )
          )
        ) : (
          <h3 className={styles.title}>{'Anbar Siyahısı Boşdur...'}</h3>
        )}
      </div>
    </div>
  )
}

export default BarnsPage
