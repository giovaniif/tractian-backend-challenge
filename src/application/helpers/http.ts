export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => {
  return {
    statusCode: 200,
    data
  }
}

export const badRequest = (error: Error): HttpResponse<Error> => {
  return {
    statusCode: 400,
    data: error
  }
}
