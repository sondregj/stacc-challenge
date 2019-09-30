export interface DataRequest {
    laanebelop: number
    nominellRente: number
    terminGebyr: number
    utlopsDato: string // '2045-01-01'
    saldoDato: string // '2020-01-01'
    datoForsteInnbetaling: string // '2020-02-01'
    ukjentVerdi: 'TERMINBELOP'
}

export interface DataResponse {
    nedbetalingsplan: {
        innbetalinger: Payment[]
    }
    aarligGruppertInnbetalinger: null
    metadata: null
    valideringsfeilmeldinger: null
}

export interface Payment {
    restgjeld: number
    dato: string // '2044-12-01'
    innbetaling: number
    gebyr: number
    renter: number
    total: number
}

export const exampleRequest = {
    laanebelop: 2000000,
    nominellRente: 3,
    terminGebyr: 30,
    utlopsDato: '2045-01-01',
    saldoDato: '2020-01-01',
    datoForsteInnbetaling: '2020-02-01',
    ukjentVerdi: 'TERMINBELOP',
}

export const exampleResponse = {
    nedbetalingsplan: {
        innbetalinger: [
            {
                restgjeld: 1995598.3802136178,
                dato: '2020-02-01',
                innbetaling: 4401.619786382111,
                gebyr: 30.0,
                renter: 5082.071266533372,
                total: 9513.691052915483,
            },
        ],
    },
    aarligGruppertInnbetalinger: null,
    metadata: null,
    valideringsfeilmeldinger: null,
}
