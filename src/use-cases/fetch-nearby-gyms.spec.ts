import { beforeEach, describe, expect, it } from 'vitest'

import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

describe('UseCases: FetchNearbyGyms', () => {
  let gymsRepository: GymsRepository
  let sut: FetchNearbyGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch naerby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: 41.1576144,
      longitude: -8.6299028,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: 41.6948383,
      longitude: -8.8432351,
    })

    const { gyms } = await sut.execute({
      userLatitude: 41.1576144,
      userLongitude: -8.6299028,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
