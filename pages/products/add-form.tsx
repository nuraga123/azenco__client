import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import AddProductPage from '@/components/templates/FormProductPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'

import '@/styles/globals.css'

const AddForm = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const { usernameStorage } = getLocalStorageUser()
  const username = usernameStorage === `${process.env.NEXT_PUBLIC_ADMIN_NAME}`

  if (username) {
    return (
      <>
        {shouldLoadContent && (
          <Layout title={'Yeni Materiallar Yarat'}>
            <AddProductPage />
          </Layout>
        )}
      </>
    )
  } else {
    return (
      <>
        {shouldLoadContent && (
          <Layout title={'əsas səhifəyə qayidin'}>
            <Link href={'/my'}>
              <span
                style={{
                  display: 'flex',
                  width: 'max-content',
                  background: 'black',
                  color: 'red',
                  margin: '20px auto',
                  padding: '5px 10px',
                  fontSize: 18,
                  borderRadius: 10,
                }}
              >
                əsas səhifəyə qayidin
              </span>
            </Link>
          </Layout>
        )}
      </>
    )
  }
}

export default AddForm
