import { DataRequest, DataResponse, Payment } from '../data/types'

interface LoanPayment {
    interestAmount: number
    deductionAmount: number
    fee: number

    totalAmount: number

    remainingDebt: number
}

type LoanCalculator = (
    loanAmount: number,
    terms: number,
    termInterest: number,
    termFee: number,
) => LoanPayment[]

export const calculateLoanPayments = (data: DataRequest): DataResponse => {
    const loanAmount = data.laanebelop
    const interest = data.nominellRente
    const fee = data.terminGebyr

    const dateOfLoanReceived = new Date(data.saldoDato)
    // const dateOfFirstPayment = new Date(data.datoForsteInnbetaling)
    const dateOfLastPayment = new Date(data.utlopsDato)

    // const ಠ_ಠ = data.ukjentVerdi

    // Intermediate calculations
    const years = dateOfLastPayment.getFullYear() - dateOfLoanReceived.getFullYear()
    const months =
        dateOfLastPayment.getMonth() - dateOfLoanReceived.getMonth() + 1 + years * 12

    const monthlyInterest = interest / 100 / 12
    const terms = months

    const payments: Payment[] = annuityLoan(
        loanAmount,
        terms,
        monthlyInterest,
        fee,
    ).map((loanPayment, i) => ({
        innbetaling: loanPayment.deductionAmount,
        renter: loanPayment.interestAmount,
        gebyr: loanPayment.fee,
        total: loanPayment.totalAmount,

        restgjeld: loanPayment.remainingDebt,
        dato: new Date(dateOfLoanReceived.getFullYear() + Math.floor(i / 12), i % 12, 0)
            .toISOString()
            .substring(0, 10), // '2044-12-01',
    }))

    return {
        aarligGruppertInnbetalinger: null,
        metadata: null,
        valideringsfeilmeldinger: null,
        nedbetalingsplan: { innbetalinger: payments },
    }
}

export const annuityLoan: LoanCalculator = (
    loanAmount,
    terms,
    termInterest,
    termFee,
) => {
    const totalOwed: number = loanAmount * Math.pow(1 + termInterest, terms - 1)
    const termAmount: number = totalOwed / (terms - 1)

    const payments: LoanPayment[] = [
        {
            interestAmount: 0,
            deductionAmount: 0,
            fee: 0,

            totalAmount: 0,

            remainingDebt: loanAmount,
        },
    ]

    let remainingDebt = loanAmount

    for (let i = 1; i < terms; i++) {
        const interestAmount = remainingDebt * termInterest
        const deductionAmount = termAmount - interestAmount

        const totalAmount = termAmount + termFee

        remainingDebt -= deductionAmount

        const payment: LoanPayment = {
            interestAmount,
            deductionAmount,
            fee: termFee,

            totalAmount,

            remainingDebt,
        }

        payments.push(payment)
    }

    return payments
}

export const serialLoan: LoanCalculator = (
    loanAmount,
    terms,
    termInterest,
    termFee,
) => {
    const deductionAmount = loanAmount / (terms - 1)

    const payments: LoanPayment[] = [
        {
            deductionAmount: 0,
            interestAmount: 0,
            fee: 0,

            totalAmount: 0,

            remainingDebt: loanAmount,
        },
    ]

    let remainingDebt = loanAmount

    for (let i = 0; i < terms; i++) {
        const interestAmount = remainingDebt * termInterest
        const totalAmount = deductionAmount + interestAmount + termFee

        remainingDebt -= deductionAmount

        const payment: LoanPayment = {
            deductionAmount,
            interestAmount,
            fee: termFee,

            totalAmount,

            remainingDebt,
        }

        payments.push(payment)
    }

    return payments
}
