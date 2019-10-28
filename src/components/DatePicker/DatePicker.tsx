import React, { useState } from 'react'

import FeatherIcon from 'feather-icons-react'

import styles from './DatePicker.module.scss'

interface DatePickerProps {
    label?: string
    value: Date
    locale?: string
    handleChange?: (e: any) => void
}

const DatePicker: React.FC<DatePickerProps> = ({
    label,
    value,
    handleChange,
    locale = 'nb-NO',
}) => {
    const [showCalendar, setShowCalendar] = useState<boolean>(false)

    // const toggleCalendar = () => setShowCalendar(!showCalendar)

    return (
        <div className={styles.datePicker}>
            <div
                className={styles.formGroup}
                onClick={() => setShowCalendar(!showCalendar)}
            >
                {label ? <label className={styles.label}>{label}</label> : null}

                <input
                    type="text"
                    value={value.toLocaleDateString(locale)}
                    onChange={handleChange}
                    placeholder="YYYY / MM / DD"
                />

                <div>
                    <FeatherIcon size="24px" icon="calendar" />
                </div>
            </div>

            <div className={styles.dropdown}></div>
        </div>
    )
}

export default DatePicker
