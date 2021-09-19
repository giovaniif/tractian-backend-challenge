export class UnitNotFoundError extends Error {
  constructor () {
    super('unit not found')
    this.name = 'UnitNotFoundError'
  }
}
