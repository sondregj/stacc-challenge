import React from 'react'

import { Header, Footer } from './components'
import { LoanCalculator } from './views'

import css from './App.module.scss'

const App = () => (
    <div className={css.app}>
        <Header />

        <main className={css.content}>
            <LoanCalculator />
        </main>

        <Footer />
    </div>
)

export default App
