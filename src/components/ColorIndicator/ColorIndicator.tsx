import React from 'react'

import css from './ColorIndicator.module.scss'

interface ColorIndicatorProps {
    label: string
    color: string
}

const ColorIndicator: React.FC<ColorIndicatorProps> = ({ label, color }) => (
    <div className={css.container}>
        <div className={css.dot} style={{ backgroundColor: color }}></div>
        <div className={css.label}>{label}</div>
    </div>
)

export default ColorIndicator
