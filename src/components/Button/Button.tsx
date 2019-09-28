import React from 'react'

import styles from './Button.module.scss'

interface ButtonProps {
    onClick: () => void
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, disabled, onClick }) => {
    return (
        <div
            className={styles.button + (disabled ? ' ' + styles.disabled : '')}
            onClick={!disabled ? onClick : () => undefined}
        >
            {children}
        </div>
    )
}

export default Button
