export class InvalidStatusError extends Error {
  constructor() {
    super('Status must be RUNNING | ALERTING | STOPPED')
    this.name = 'InvalidStatusError'
  }
}