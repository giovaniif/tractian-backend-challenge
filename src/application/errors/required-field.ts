export class RequiredFieldError extends Error {
  constructor (field: string) {
    super(`param ${field} is required`)
    this.name = 'RequiredFieldError'
  }
}
