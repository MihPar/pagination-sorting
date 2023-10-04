export {Request} from 'express'

export type RequestWithQuery<T> = Request<{}, {}, {}, T>
