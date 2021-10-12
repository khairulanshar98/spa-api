export interface User {
    id: string
    name: string
}

export interface Store {
    user?: User | undefined
    token?: string | undefined
    ip?: string | undefined
    errorMsg?: string | undefined
    websocket?: any | undefined,
    isLoading?: boolean
    data?: any
}

export const initialData: Store = {
    user: undefined,
    token: undefined,
    ip: undefined,
    errorMsg: undefined,
    websocket: undefined,
    isLoading: false,
    data: {}
}