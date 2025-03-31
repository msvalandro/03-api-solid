import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { Gym, GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'

describe('UseCases: CheckIn', () => {
  let checkInsRepository: CheckInsRepository
  let gymsRepository: GymsRepository
  let sut: CheckInUseCase
  let gym: Gym

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gym = await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: gym.id,
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 21, 18, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: gym.id,
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: gym.id,
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 21, 18, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: gym.id,
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2024, 0, 22, 18, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: gym.id,
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on a distant gym', async () => {
    gymsRepository.create({
      title: 'PHP Gym',
      description: null,
      phone: null,
      latitude: 41.1576144,
      longitude: -8.6299028,
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: gym.id,
        userLatitude: 41.166418,
        userLongitude: -8.6775865,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
