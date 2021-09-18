export class CompanyNotFoundError extends Error {
  constructor () {
    super('company not found')
    this.name = 'CompanyNotFoundError'
  }
}
