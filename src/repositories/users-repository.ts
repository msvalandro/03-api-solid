export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
}

export interface UserCreateInput {
  name: string
  email: string
  password_hash: string
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
}
