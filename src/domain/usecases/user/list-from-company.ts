import { LoadUserFromCompanyRepository } from '@/domain/contracts/repos'

type Result = { id: string, name: string, email: string }[]

export type ListUsers = () => Promise<Result>
type Setup = (userRepo: LoadUserFromCompanyRepository) => ListUsers

export const setupListUsers: Setup = (userRepo) => {
  return async () => {
    return []
  }
} 
