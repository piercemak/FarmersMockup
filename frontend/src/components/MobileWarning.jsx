import React from 'react'
import warningBackground from '../assets/images/WarningBackground.svg'
import signature from '../assets/images/Signature.svg'
import laptop from '../assets/images/LaptopBackground.svg'
import styles from './modules/MobileWarning.module.css' 


const MobileWarning = () => {
  return (
 
        <div className={styles['mobile-background']}>
            <div className={styles["signature-logo"]}>
                <img src={signature} alt="Signature" className={styles["signature-container"]}/>            
            </div>


            <div className={styles['mobile-textcontainer1']}>
                <span className={styles['mobile-textbody1']}>Access Denied</span>
                <div className={styles['mobile-textcontainer2']}>
                    <span className={styles['mobile-textbody2']}>The page you requested cannot be accessed on mobile. Please try again on desktop or</span>
                </div>
                <div className={styles['mobile-button']}>
                    <span className={styles['mobile-buttontext']}>return to main</span>
                </div>
            </div>
        </div>
   

  )
}

export default MobileWarning