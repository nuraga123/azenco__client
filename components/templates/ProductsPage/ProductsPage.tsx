import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProductsFx } from '@/app/api/products'
import { IProductsResponse } from '@/types/products'
import ProductTable from '@/components/modules/ProductsPage/ProductTable'
import { getLocalStorageUser } from '@/localStorageUser'
import styles from '@/styles/products/index.module.scss'

const ProductsPage = () => {
  const { usernameStorage } = getLocalStorageUser()
  const adminCheck = usernameStorage === `${process.env.NEXT_PUBLIC_ADMIN_NAME}`
  console.log(`admin check = ${adminCheck}`)

  const [products, setProducts] = useState<IProductsResponse>({
    count: 0,
    rows: [],
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data: IProductsResponse = await getProductsFx(
        '/products?limit=20&offset=0&sortBy=asc'
      )

      if (data?.rows) {
        setProducts(data)
      } else {
        console.log('Failed to fetch data')
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <div>
      <div className={styles.products__header}>
        <h1 className={styles.title}>Materiallar</h1>
        {adminCheck && (
          <Link href={'/products/add-form'} legacyBehavior passHref>
            <button className={styles.add__button}>Yeni Material Yarat</button>
          </Link>
        )}
      </div>

      <ProductTable data={products} />
    </div>
  )
}

export default ProductsPage
