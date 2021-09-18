export class InvalidEmailError extends Error {
  constructor (fieldName: string) {
    super(`field ${fieldName} is not a valid email`)
    this.name = 'InvalidEmailError'
  }
}
