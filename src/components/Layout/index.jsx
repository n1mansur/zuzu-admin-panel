import { Outlet } from 'react-router'
import Header from '../UI/Header'
import styles from './Styles.module.scss'

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  )
}
