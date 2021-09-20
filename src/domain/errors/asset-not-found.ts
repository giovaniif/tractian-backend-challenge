export class AssetNotFoundError extends Error {
  constructor () {
    super('asset not found')
    this.name = 'AssetNotFoundError'
  }
}
