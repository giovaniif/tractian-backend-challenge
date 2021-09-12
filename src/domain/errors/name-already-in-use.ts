export class NameAlreadyInUseError extends Error {
  constructor() {
    super('Name already in use')
    this.name = 'NameAlreadyInUseError'
  }
}