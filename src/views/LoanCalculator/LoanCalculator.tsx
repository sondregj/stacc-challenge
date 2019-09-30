import React, { useState, useEffect } from 'react'

import {
    Button,
    Currency,
    ColorIndicator,
    RangeSlider,
    LoanData,
} from '../../components'

import { sampleResponse } from '../../data/sample'
import { DataResponse, DataRequest } from '../../data/types'

import { calculateLoanPayments } from '../../utils/loan-payment-calculator'

import css from './LoanCalculator.module.scss'

const URL =
    'https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan'

const LoanCalculatorView = () => {
    // Parameters
    const [loanAmount, setLoanAmount] = useState<number>(2000000)
    const [interest, setInterest] = useState<number>(3)

    const [fromYear, setFromYear] = useState<Date>(new Date(2019, 0, 2))
    const [toYear, setToYear] = useState<Date>(new Date(2039, 0, 2))

    const [fee, setFee] = useState<number>(30)

    // Control options
    const [useOnlineService, setUseOnlineService] = useState<boolean>(true)

    // Data view state
    const [data, setData] = useState<DataResponse>(sampleResponse)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loadingError, setLoadingError] = useState<Error>()
    const [dataFetchedOnline, setDataFetchedOnline] = useState<boolean>(true)

    // Change handlers
    const updateLoanAmount = (e: React.FormEvent<HTMLInputElement>): void =>
        setLoanAmount(parseInt(e.currentTarget.value, 10))

    const updateInterest = (e: React.FormEvent<HTMLInputElement>): void =>
        setInterest(parseFloat(e.currentTarget.value))

    const updateFeeAmount = (e: React.FormEvent<HTMLInputElement>): void =>
        setFee(parseInt(e.currentTarget.value, 10))

    const getCalculationsOnline = () => {
        const firstPaymentDate = `${fromYear.getFullYear()}-02-01`

        const data: DataRequest = {
            laanebelop: loanAmount,
            nominellRente: interest,
            terminGebyr: fee,

            saldoDato: fromYear.toISOString().substring(0, 10), //'2020-01-01',
            datoForsteInnbetaling: firstPaymentDate,
            utlopsDato: toYear.toISOString().substring(0, 10),

            ukjentVerdi: 'TERMINBELOP',
        }

        setIsLoading(true)

        let cancelled = false

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (!cancelled) {
                    setData(data)
                    setIsLoading(false)
                    setDataFetchedOnline(true)
                }
            })
            .catch(err => {
                if (!cancelled) {
                    setLoadingError(err)
                    setIsLoading(false)
                    setDataFetchedOnline(true)
                }
            })

        return () => (cancelled = true)
    }

    useEffect(() => {
        if (!useOnlineService) {
            const firstPaymentDate = `${fromYear.getFullYear()}-02-01`

            const data: DataRequest = {
                laanebelop: loanAmount,
                nominellRente: interest,
                terminGebyr: fee,

                saldoDato: fromYear.toISOString().substring(0, 10),
                datoForsteInnbetaling: firstPaymentDate,
                utlopsDato: toYear.toISOString().substring(0, 10),

                ukjentVerdi: 'TERMINBELOP',
            }

            const result = calculateLoanPayments(data)

            setData(result)
            setDataFetchedOnline(false)
        }
    }, [useOnlineService, loanAmount, interest, fromYear, toYear, fee])

    return (
        <div className={css.loanCalculator}>
            <div className={css.top}>
                <h2>Lånekalkulator</h2>
                <div></div>
            </div>

            <div className={css.description}>
                <p>Her kan du regne ut en betalingsplan for et lån.</p>
            </div>

            <div className={css.controls}>
                <div className={css.controlSection}>
                    <div>
                        <b>Lånesum</b>

                        <div className={css.value}>
                            <Currency
                                amount={loanAmount}
                                currency={'NOK'}
                                decimals={0}
                            />
                        </div>

                        <RangeSlider
                            value={loanAmount}
                            handleChange={updateLoanAmount}
                            min={100000}
                            max={10000000}
                            step={50000}
                        />
                    </div>

                    <div>
                        <b>Nominell rente</b>

                        <div className={css.value}>{interest.toFixed(2)}%</div>

                        <RangeSlider
                            value={interest}
                            handleChange={updateInterest}
                            min={0}
                            max={10}
                            step={0.05}
                        />
                    </div>
                </div>
                <div className={css.controlSection}>
                    <div>
                        <b>Fra</b>

                        <div className={css.value}>
                            1. januar {fromYear.getFullYear()}
                        </div>

                        <RangeSlider
                            value={fromYear.getFullYear()}
                            handleChange={e =>
                                setFromYear(new Date(e.currentTarget.value, 0, 1))
                            }
                            min={2019}
                            max={toYear.getFullYear()}
                        />
                    </div>

                    <div>
                        <b>Til</b>

                        <div className={css.value}>
                            1. januar {toYear.getFullYear()}
                        </div>

                        <RangeSlider
                            value={toYear.getFullYear()}
                            handleChange={e =>
                                setToYear(new Date(e.currentTarget.value, 0, 1))
                            }
                            min={fromYear.getFullYear()}
                            max={2049}
                        />
                    </div>
                </div>
                <div className={css.controlSection}>
                    <div>
                        <b>Månedlig avgift</b>

                        <div className={css.value}>
                            <Currency amount={fee} currency={'NOK'} decimals={0} />
                        </div>

                        <RangeSlider
                            value={fee}
                            handleChange={updateFeeAmount}
                            min={0}
                            max={100}
                            step={5}
                        />
                    </div>

                    <div>
                        <b>Oppsummering</b>
                        <div className={css.value}>
                            Nedbetaling over{' '}
                            {toYear.getFullYear() - fromYear.getFullYear()} år
                        </div>
                    </div>
                </div>
            </div>

            <div className={css.fetchControls}>
                <div className={css.useOnlineService}>
                    <input
                        type="checkbox"
                        checked={useOnlineService}
                        onChange={() => setUseOnlineService(!useOnlineService)}
                    />
                    <span>
                        Bruk nett-tjeneste for beregningen, hvis ikke gjøres beregninger
                        automatisk.
                    </span>
                </div>
                <div>
                    {useOnlineService ? (
                        <Button
                            onClick={getCalculationsOnline}
                            disabled={!useOnlineService}
                        >
                            BEREGN LÅN
                        </Button>
                    ) : null}
                </div>
            </div>

            <div className={css.data}>
                <div className={css.dataTopSection}>
                    <div>
                        <b>Ditt lån</b>
                    </div>
                    <div>
                        <ColorIndicator
                            label={
                                dataFetchedOnline
                                    ? 'Hentet fra nettet'
                                    : 'Kalkulert lokalt'
                            }
                            color={dataFetchedOnline ? 'green' : 'orange'}
                        />
                    </div>
                </div>

                <LoanData data={data} isLoading={isLoading} error={loadingError} />
            </div>
        </div>
    )
}

export default LoanCalculatorView
