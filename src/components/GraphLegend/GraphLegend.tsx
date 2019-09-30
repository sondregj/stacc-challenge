import React from 'react'

import css from './GraphLegend.module.scss'

interface GraphLegendProps {
    items: Array<{
        label: string
        color: string
    }>
}

const GraphLegend: React.FC<GraphLegendProps> = ({ items }) => (
    <div className={css.container}>
        {items.map((item, i) => (
            <div key={i} className={css.legendItem}>
                <div
                    className={css.colorBox}
                    style={{ backgroundColor: item.color }}
                ></div>
                <div className={css.label}>{item.label}</div>
            </div>
        ))}
    </div>
)

export default GraphLegend
