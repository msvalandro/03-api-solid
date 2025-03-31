export interface CheckIn {
  id: string
  user_id: string
  gym_id: string
  created_at: Date
  validated_at?: Date
}

export interface CheckInCreateInput {
  user_id: string
  gym_id: string
  validated_at?: Date
}

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  create(data: CheckInCreateInput): Promise<CheckIn>
}
