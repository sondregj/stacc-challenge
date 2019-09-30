import React from 'react'

import css from './Button.module.scss'

interface ButtonProps {
    onClick: () => void
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, disabled, onClick }) => (
    <div
        className={css.container + (disabled ? ' ' + css.disabled : '')}
        onClick={!disabled ? onClick : () => undefined}
    >
        {children}
    </div>
)

export default Button
