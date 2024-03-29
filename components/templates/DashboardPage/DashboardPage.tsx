import { useCallback, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import { $shoppingCart } from '@/context/shopping-cart'
import { $mode } from '@/context/mode'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import styles from '@/styles/dashboard/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const DashboardPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [showAlert, setShowAlert] = useState<boolean>(!!1)
  const closeAlert = () => setShowAlert(false)

  const shoppingCart = useStore($shoppingCart)
  const countShoppingCart = shoppingCart.reduce(
    (defaultCount, item) => defaultCount + item.count,
    0
  )

  const [count, setCount] = useState<number>()
  const [spinner, setSpiner] = useState<boolean>(false)

  const simulateProductCountChange = useCallback(() => {
    setSpiner(true)

    // Задержка в 2 секунды
    setTimeout(() => {
      setCount(countShoppingCart as number)
      setSpiner(false)
    }, 2000)
  }, [countShoppingCart])

  useEffect(() => {
    simulateProductCountChange()
  }, [simulateProductCountChange])

  return (
    <section className={`${styles.dashboard}`}>
      <div className={`container`}>
        {spinner ? (
          <div
            className={spinnerStyles.spinner}
            style={{ width: 20, height: 20 }}
          />
        ) : (
          countShoppingCart !== 0 && (
            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${styles.dashboard__alert} ${darkModeClass}`}
                >
                  <CartAlert count={count || 0} closeAlert={closeAlert} />
                </motion.div>
              )}
            </AnimatePresence>
          )
        )}
      </div>
    </section>
  )
}

export default DashboardPage
