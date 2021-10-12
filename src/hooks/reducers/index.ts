import { Store, initialData } from '../stores'

export enum ActionType {
    SET_TOKEN = 'SET_TOKEN',
    SET_ERRORMSG = 'SET_ERRORMSG',
    CLEAR = 'CLEAR',
    SET_USER = 'SET_USER',
    SET_WS = 'SET_WS',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_DATA = 'SET_DATA'
}

export interface IAction {
    type: ActionType | undefined
    data: Store
}

export const reducers = (state: Store, action: IAction): Store => {
    Object.freeze(state)
    const store: Store = { ...state }
    switch (action.type) {
        case ActionType.SET_TOKEN:
            store.token = action.data.token
            store.ip = action.data.ip
            return store
        case ActionType.SET_USER:
            store.user = action.data.user
            return store
        case ActionType.SET_WS:
            store.websocket = action.data.websocket
            return store
        case ActionType.SET_ERRORMSG:
            store.errorMsg = action.data.errorMsg
            return store
        case ActionType.SET_IS_LOADING:
            store.isLoading = action.data.isLoading
            return store
        case ActionType.SET_DATA:
            store.data = action.data
            return store
        case ActionType.CLEAR:
            return initialData
        default:
            return store
    }
}

