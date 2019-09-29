import React from 'react'

import { Currency } from '..'
import { Payment } from '../../data/types'

import css from './PaymentList.module.scss'

interface PaymentListProps {
    payments: Payment[]
}

const PaymentList: React.FC<PaymentListProps> = ({ payments }) => (
    <div className={css.container}>
        <div className={css.title}>
            <b>Betalinger</b>
        </div>
        <div className={css.list}>
            {payments.map((payment, i) => (
                <div key={i} className={css.paymentItem}>
                    <div>{new Date(payment.dato).toLocaleDateString()}</div>
                    <div>
                        <Currency amount={payment.total} currency={'NOK'} />
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default PaymentList
