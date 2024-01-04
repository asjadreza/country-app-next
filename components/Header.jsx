import React from 'react'
import styles from '../src/app/page.module.css'


const Header = () => {
    
  return (
    <div className={`container-md ${styles.containerMedium}`}
    style={{marginTop: '25px'}}
    >
        <h1>Countries</h1>
    </div>
  )
}

export default Header