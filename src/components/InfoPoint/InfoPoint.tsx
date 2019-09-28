import React from 'react'

import styles from './InfoPoint.module.scss'

interface InfoPointProps {
    label: string
    value: string | number | React.ReactElement
}

const InfoPoint: React.FC<InfoPointProps> = ({ label, value }) => (
    <div className={styles.infoPoint}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
    </div>
)

export default InfoPoint
