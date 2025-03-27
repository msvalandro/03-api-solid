/* eslint-disable camelcase */
import { randomUUID } from 'node:crypto'

import {
  CheckIn,
  CheckInCreateInput,
  CheckInsRepository,
} from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkInOnSameDate = this.checkIns.find(
      (checkIn) => checkIn.user_id === userId,
    )

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create({
    user_id,
    gym_id,
    validated_at,
  }: CheckInCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id,
      gym_id,
      created_at: new Date(),
      validate_at: validated_at ? new Date(validated_at) : null,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
