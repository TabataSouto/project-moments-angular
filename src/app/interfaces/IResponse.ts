/* Interface para respostas da API, de forma que
possa ser utilizada para todas as respostas, independente
de seu método. */
export interface IResponse<T> {
  message?: string,
  data: T,
}