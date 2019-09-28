import React from 'react'

import { Header, Footer } from './components'

import styles from './App.module.scss'

const App = () => (
    <div className={styles.app}>
        <Header />

        <main className={styles.content}>
        </main>

        <Footer />
    </div>
)

export default App
