import React from 'react'
import styles from './Styles.module.scss'

export default function Button({ ico, text, style, children, onClick }) {
  return (
    <button className={styles.btn} style={style} onClick={onClick}>
      {ico}
      {text}
      {children}
    </button>
  )
}
