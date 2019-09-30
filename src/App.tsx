import React from 'react'

import { Header, Footer } from './components'

import css from './App.module.scss'

const App = () => (
    <div className={css.app}>
        <Header />

        <main className={css.content}>
        </main>

        <Footer />
    </div>
)

export default App
