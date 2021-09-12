export class InvalidNameError extends Error {
  constructor() {
    super('Company name must have at least 2 characters')
    this.name = 'InvalidNameError'
  }
}