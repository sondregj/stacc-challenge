import React from 'react'

import { StaccSVG } from '..'

import css from './Header.module.scss'

const Header = () => (
    <header className={css.container}>
        <div className={css.topSection}>
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
