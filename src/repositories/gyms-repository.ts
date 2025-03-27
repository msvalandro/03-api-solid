export interface Gym {
  id: string
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
}

export interface GymCreateInput {
  title: string
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: GymCreateInput): Promise<Gym>
}
