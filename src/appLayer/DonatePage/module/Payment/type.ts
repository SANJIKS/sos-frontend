export interface Payment {
        sum: number | null
        type: string | null
        user: {
            name: string
            phone: string
            email: string
            surname: string
        }
    }