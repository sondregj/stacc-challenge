import React from 'react'

import styles from './GraphBar.module.scss'

interface GraphBarProps {
    values: number[]
    color: string
}

const GraphBar: React.FC<GraphBarProps> = ({ values, color }) => {
    const max = values.reduce((max, value) => (value > max ? value : max))

    return (
        <div className={styles.graphBar}>
            {values.map(value => (
                <div
                    className={styles.bar}
                    style={{
                        height: (value / max) * 100 + '%',
                        opacity: 0.9,
                        backgroundColor: color,
                    }}
                ></div>
            ))}
        </div>
    )
}

export default GraphBar
