/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { useState } from 'react'
import picture from '@/public/icon/icons-image.png'
import styles from '@/styles/products/index.module.scss'
import { Product } from '@/types/products'

const ProductImg = ({ data, id }: { data: Product[]; id: number }) => {
  const [open, setOpen] = useState<boolean>(false)
  const showPicture = () => setOpen(true)
  const closePicture = () => setOpen(false)

  const urlImg = data.find((el) => el.id === id)?.images || ''

  return (
    <>
      {!open && (
        <Image
          src={picture}
          width={48}
          height={48}
          alt="img"
          onClick={showPicture}
        />
      )}

      {open && (
        <div className={styles.img}>
          <img src={urlImg} width={100} height={100} alt="img" />
          <button className={styles.btn__close} onClick={closePicture}>
            X
          </button>
        </div>
      )}
    </>
  )
}

export default ProductImg
