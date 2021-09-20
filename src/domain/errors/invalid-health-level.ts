export class InvalidHealthLevelError extends Error {
  constructor() {
    super('Health level must be between 0 and 100')
    this.name = 'InvalidHealthLevel'
  }
}