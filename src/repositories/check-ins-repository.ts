export interface CheckIn {
  id: string
  user_id: string
  gym_id: string
  created_at: Date
  validated_at: Date | null
}

export interface CheckInCreateInput {
  user_id: string
  gym_id: string
  validated_at?: Date
}

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  create(data: CheckInCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
}
