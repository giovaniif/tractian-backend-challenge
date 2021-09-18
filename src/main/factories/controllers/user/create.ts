import { CreateUserController } from '@/application/controllers'
import { makeCreateUserUseCase } from '@/main/factories/usecases/user'

export const makeCreateUserController = (): CreateUserController => new CreateUserController(makeCreateUserUseCase())
