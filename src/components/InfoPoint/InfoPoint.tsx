import React from 'react'

import css from './InfoPoint.module.scss'

interface InfoPointProps {
    label: string
    value: string | number | React.ReactElement
}

const InfoPoint: React.FC<InfoPointProps> = ({ label, value }) => (
    <div className={css.container}>
        <div className={css.label}>{label}</div>
        <div className={css.value}>{value}</div>
    </div>
)

export default InfoPoint
