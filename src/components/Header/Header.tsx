import React from 'react'

import { StaccSVG } from '..'

import styles from './Header.module.scss'

const Header = () => (
    <header className={styles.header}>
        <div className={styles.topSection}>
            <div>
                <h1>Kodeoppgave for Stacc</h1>
                <p>Av Sondre Gjellestad</p>
            </div>
        </div>
        <div>
            <StaccSVG />
        </div>
    </header>
)

export default Header
