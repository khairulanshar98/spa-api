import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useHooks } from './contexts/Root'
import { ActionType } from './reducers'
const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    //withCredentials: true,
    timeout: 60000
}
export const service = axios.create(config)
service.defaults.headers.common['Content-Type'] = 'application/json'

const requestHandler = (request: any) => {
    const { dispatch } = useHooks()
    request.headers['Content-Type'] = 'application/json'
    dispatch({ type: ActionType.SET_IS_LOADING, data: { isLoading: true } })
    return request
}
service.interceptors.request.use(requestHandler)

const errorHandler = (error: AxiosError): unknown => {
    const { dispatch } = useHooks()
    let msg: string = error.toString()
    if (error.response && error.response.data) {
        let data: any = error.response.data
        msg = data.message
    }
    dispatch({ type: ActionType.SET_ERRORMSG, data: { errorMsg: msg } })
    dispatch({ type: ActionType.SET_IS_LOADING, data: { isLoading: false } })
    if (msg === 'Cancel: axios request cancelled') return
    return Promise.reject({ ...error })
}
const successHandler = (response: AxiosResponse): AxiosResponse => {
    const { dispatch } = useHooks()
    if (response && response.headers && response.headers['token']) {
        service.defaults.headers.common['Authorization'] = `Bearer ${response.headers['token']}`
        dispatch({ type: ActionType.SET_TOKEN, data: { token: response.headers['token'], ip: response.headers['x-ip'] } })
    } else {
        //service.defaults.headers.common['X-Custom-Header'] = `Bearer d83jD63UdZ6RS6f70D0`
    }
    dispatch({ type: ActionType.SET_ERRORMSG, data: { errorMsg: undefined } })
    dispatch({ type: ActionType.SET_IS_LOADING, data: { isLoading: false } })
    return response
}
service.interceptors.response.use(successHandler, errorHandler)
