import React from 'react'

import css from './GraphBar.module.scss'

interface GraphBarProps {
    values: number[]
    color: string
    max: number
}

const GraphBar: React.FC<GraphBarProps> = ({ values, color, max }) => {
    const maxValue =
        max || values.reduce((max, value) => (value > max ? value : max), 0)

    return (
        <div className={css.container}>
            {values.map((value, i) => (
                <div
                    key={i}
                    className={css.bar}
                    style={{
                        height: (value / maxValue) * 100 + '%',
                        opacity: 0.9,
                        backgroundColor: color,
                    }}
                ></div>
            ))}
        </div>
    )
}

export default GraphBar
