import { InvalidEmailError } from '@/application/errors'
import { Validator } from '@/application/validations'

export class EmailValidator implements Validator {
  private readonly regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  
  constructor (private readonly value: string, private readonly fieldName: string) {}
  
  validate (): Error | undefined {
    if (!this.regex.test(this.value)) return new InvalidEmailError(this.fieldName)
  }
}
