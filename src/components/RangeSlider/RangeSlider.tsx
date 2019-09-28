import React from 'react'

import styles from './RangeSlider.module.scss'

interface RangeSliderProps {
    value: number
    min: number
    max: number
    step?: number
    handleChange: (e: any) => void
}

const RangeSlider: React.FC<RangeSliderProps> = ({
    value,
    handleChange,
    min,
    max,
    step = 1,
}) => {
    return (
        <input
            className={styles.rangeSlider}
            type="range"
            placeholder="Size"
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
        />
    )
}

export default RangeSlider
