import React from 'react'

import {
    Currency,
    Graph,
    GraphBar,
    GraphLine,
    GraphLegend,
    InfoPoint,
    PaymentList,
} from '..'

import { DataResponse } from '../../data/types'

import css from './LoanData.module.scss'

interface LoanDataProps {
    data: DataResponse | undefined
    isLoading: boolean
    error: Error | undefined
}

const LoanData: React.FC<LoanDataProps> = ({ data, isLoading, error }) => {
    if (!data || isLoading || error) {
        return (
            <div className={css.loanDataView}>
                <div className={css.noGraph}>
                    <div className={css.graph}>Ingen data</div>
                </div>
            </div>
        )
    }

    const payments = data.nedbetalingsplan.innbetalinger

    const paidTotal: number[] = []
    const paidGraph = payments.map((payment, i) => {
        if (i === 1) {
            paidTotal[i] = payment.total - payment.gebyr - payment.renter
        } else {
            paidTotal[i] =
                payment.total - payment.gebyr - payment.renter + paidTotal[i - 1]
        }

        return payment.total - payment.gebyr - payment.renter + paidTotal[i]
    })

    const paidWithInterestTotal: number[] = []
    const paidWithInterestGraph = payments.map((payment, i) => {
        if (i === 1) {
            paidWithInterestTotal[i] = payment.total
        } else {
            paidWithInterestTotal[i] = payment.total + paidWithInterestTotal[i - 1]
        }

        return payment.total + paidWithInterestTotal[i]
    })

    const debtLeftGraph = data.nedbetalingsplan.innbetalinger.map(
        payment => payment.restgjeld,
    )

    const graphMax = paidWithInterestGraph.reduce<number>(
        (max, value) => (value > max ? value : max),
        0,
    )

    return (
        <div className={css.loanDataView}>
            <div className={css.infoPoints}>
                <InfoPoint
                    label="ANTALL INNBETALINGER"
                    value={data.nedbetalingsplan.innbetalinger.length}
                />

                <InfoPoint
                    label="TOTALSUM"
                    value={
                        <Currency
                            amount={data.nedbetalingsplan.innbetalinger
                                .map(payment => payment.total)
                                .reduce((sum, payment) => sum + payment, 0)}
                            currency={'NOK'}
                        />
                    }
                />
            </div>

            <div className={css.graphContainer}>
                <Graph>
                    <GraphBar
                        values={paidWithInterestGraph}
                        color={'tomato'}
                        max={graphMax}
                    />
                    <GraphBar values={paidGraph} color={'olivedrab'} max={graphMax} />
                    <GraphLine values={debtLeftGraph} color={'black'} max={graphMax} />
                </Graph>

                <PaymentList payments={payments} />
            </div>

            <GraphLegend
                items={[
                    { label: 'Resterende gjeld', color: 'black' },
                    { label: 'Nedbetalt', color: 'green' },
                    { label: 'Nedbetalt med renter', color: 'red' },
                ]}
            />
        </div>
    )
}

export default LoanData
