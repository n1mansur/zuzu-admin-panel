import React from 'react'
import styles from './Styles.module.scss'
import Button from '../Button'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'

import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.header__left}>
            <div className={styles.logo} id="headerLogo">
              <Link to="/">
                <img src="/Images/Logo.png" alt="LOGO" />
              </Link>
            </div>
          </div>
          <div className={styles.header__right}>
            <Button
              ico={<PermIdentityIcon />}
              text={'Войти'}
              className={styles.join}
            />
            <button className={styles.user}>{<PermIdentityIcon />}</button>
          </div>
        </header>
      </div>
    </div>
  )
}
