import React, { ReactElement } from 'react'
import { Store, initialData } from '../stores'
import { IAction, reducers } from '../reducers'


interface Hooks {
    store: Store
    subscribers: Object
    subscribe: (key: string, fn: Function) => void
    unSubscribe: (key: string) => void
    setStore: (store: Store) => void
    getStore: () => Store
    dispatch: React.Dispatch<IAction>
    setDispatch: (dispacth: React.Dispatch<IAction>) => void
    getDispatch: () => React.Dispatch<IAction>
}

export const hooks: Hooks = {
    store: initialData,
    subscribers: {},
    subscribe(key, fn) {
        this.subscribers[key] = fn
    },
    unSubscribe(key) {
        delete this.subscribers[key]
    },
    dispatch: (): void => undefined,
    setDispatch: function (dispatch: React.Dispatch<IAction>) {
        this.dispatch = dispatch
    },
    getDispatch: function () {
        return this.dispatch
    },
    setStore: function (store: Store) {
        this.store = store
        Object.keys(this.subscribers).forEach(key => {
            this.subscribers[key]()
        });
    },
    getStore: function () {
        return this.store
    }
}

export const useHooks = () => hooks

export const AppContext = React.createContext<[Store, React.Dispatch<IAction>]>([initialData, () => { }])
export const useContext = (): [Store, React.Dispatch<IAction>] => React.useContext(AppContext)

export const Provider: React.FC = (props): ReactElement => {
    const [store, dispatch] = React.useReducer(reducers, initialData)
    React.useEffect(() => {
        hooks.setDispatch(dispatch)
        hooks.setStore(store)
    }, [])
    React.useEffect(() => {
        // console.info("Provider store", store)
        hooks.setStore(store)
    }, [store])
    return (
        <AppContext.Provider value={[store, dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}

export default Provider