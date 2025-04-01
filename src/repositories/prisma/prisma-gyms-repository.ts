import { Gym as PrismaGym } from '@prisma/client'

import {
  FindManyNearbyParams,
  GymCreateInput,
  GymsRepository,
  Gym,
} from '@/repositories/gyms-repository'
import { prisma } from '@/lib/prisma'

const ITEMS_PER_PAGE = 20

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    })

    if (!gym) {
      return null
    }

    return this.mapGymLatitudeAndLongitude(gym)
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<PrismaGym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms.map(this.mapGymLatitudeAndLongitude)
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    })

    return gyms.map(this.mapGymLatitudeAndLongitude)
  }

  async create(data: GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return this.mapGymLatitudeAndLongitude(gym)
  }

  private mapGymLatitudeAndLongitude(gym: PrismaGym): Gym {
    return {
      ...gym,
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber(),
    }
  }
}
