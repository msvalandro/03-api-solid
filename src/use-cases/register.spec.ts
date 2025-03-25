import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories'
import { RegisterUseCase } from './register'

describe('UseCases: Register', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
