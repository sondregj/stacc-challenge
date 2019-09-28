import React from 'react'

import styles from './GraphLine.module.scss'

interface GraphLineProps {
    values: number[]
    color: string
}

const GraphLine: React.FC<GraphLineProps> = ({ values, color }) => {
    const max = values.reduce((max, value) => (value > max ? value : max))

    return (
        <div className={styles.graphLine}>
            {values.map(value => (
                <div
                    className={styles.line}
                    style={{
                        height: (value / max) * 100 + '%',
                        // opacity: 1,
                        borderColor: color,
                    }}
                ></div>
            ))}
        </div>
    )
}

export default GraphLine
