import React from 'react'

import styles from './Graph.module.scss'

const Graph: React.FC = ({ children }) => {
    return <div className={styles.graph}>{children}</div>
}

export default Graph
