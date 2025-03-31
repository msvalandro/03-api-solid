export interface Gym {
  id: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export interface GymCreateInput {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: GymCreateInput): Promise<Gym>
}
