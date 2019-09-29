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

const annuityLoan: LoanCalculator = (loanAmount, terms, termInterest, termFee) => {
    const totalOwed: number = loanAmount * Math.pow(1 + termInterest, terms)
    const termAmount: number = totalOwed / terms

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

const serialLoan: LoanCalculator = (loanAmount, terms, termInterest, termFee) => {
    const deductionAmount = loanAmount / terms

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
