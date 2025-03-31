/* eslint-disable camelcase */

import { randomUUID } from 'node:crypto'

import {
  FindManyNearbyParams,
  Gym,
  GymCreateInput,
  GymsRepository,
} from '../gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    return gym ?? null
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        { latitude: gym.latitude, longitude: gym.longitude },
      )

      return distance < 10
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymCreateInput): Promise<Gym> {
    const gym = {
      id: randomUUID(),
      title,
      description,
      phone,
      latitude,
      longitude,
      created_at: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }
}
