import { IncomingMessage, ServerResponse } from 'http'
import { type } from 'os'

interface Params {
    [key: string]: string
}

interface CodeMsg {
    code: number
    msg: string
}

export interface SuperHttpRequest<T1 = any, T2 = Params> extends IncomingMessage {
    data?: T1
    params?: T2
}

type reqJson = (data: Object) => void
type reqNotFound = () => void
type reqSuccess = (data?: Object) => void
type reqFail = (code: number, msg: string, data?: object) => void
type failWithError = (err: CodeMsg) => void

export interface SuperHttpResponse extends ServerResponse {
    json?: reqJson
    notFound?: reqNotFound
    success?: reqSuccess
    fail?: reqFail
    failWithError?: failWithError
}

export type callback<T1 = any, T2 = any> = (req: SuperHttpRequest<T1, T2>, res: SuperHttpResponse) => void

export interface Route {
    method: string
    path: string
    callback: callback
}