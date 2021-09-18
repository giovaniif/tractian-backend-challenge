import { LoadUserFromCompanyRepository } from '@/domain/contracts/repos'

type Result = { id: string, name: string, email: string }[]
type Params = { companyId: string }

export type ListUsers = (params: Params) => Promise<Result>
type Setup = (userRepo: LoadUserFromCompanyRepository) => ListUsers

export const setupListUsers: Setup = (userRepo) => {
  return async ({ companyId }) => userRepo.load({ companyId })
} 
