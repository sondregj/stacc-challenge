import React from 'react'

interface CurrencyProps {
    amount: number
    currency: string
    decimals?: number
    locale?: string
}

const Currency: React.FC<CurrencyProps> = ({
    amount,
    currency,
    decimals = 2,
    locale = 'nb-NO',
}) => {
    const formatter = Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
    })

    return <>{formatter.format(amount)}</>
}

export default Currency
