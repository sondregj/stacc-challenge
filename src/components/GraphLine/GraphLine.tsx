import React from 'react'

import css from './GraphLine.module.scss'

interface GraphLineProps {
    values: number[]
    color: string
    max: number
}

const GraphLine: React.FC<GraphLineProps> = ({ values, color, max }) => {
    const maxValue =
        max || values.reduce((max, value) => (value > max ? value : max), 0)

    return (
        <div className={css.container}>
            {values.map((value, i) => (
                <div
                    key={i}
                    className={css.line}
                    style={{
                        height: (value / maxValue) * 100 + '%',
                        // opacity: 1,
                        borderColor: color,
                    }}
                ></div>
            ))}
        </div>
    )
}

export default GraphLine
