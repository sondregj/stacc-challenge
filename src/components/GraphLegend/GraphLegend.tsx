import React from 'react'

import styles from './GraphLegend.module.scss'

interface GraphLegendProps {
    items: Array<{
        label: string
        color: string
    }>
}

const GraphLegend: React.FC<GraphLegendProps> = ({ items }) => {
    return (
        <div className={styles.container}>
            {items.map(item => (
                <div className={styles.graphLegendItem}>
                    <div
                        className={styles.graphLegendColor}
                        style={{ backgroundColor: item.color }}
                    ></div>
                    <div className={styles.graphLegendLabel}>{item.label}</div>
                </div>
            ))}
        </div>
    )
}

export default GraphLegend
