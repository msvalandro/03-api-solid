/* eslint-disable camelcase */

import { randomUUID } from 'node:crypto'

import { Gym, GymCreateInput, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    return gym ?? null
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
