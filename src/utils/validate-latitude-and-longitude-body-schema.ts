import { z } from 'zod'

export function validateLatitude() {
  return z.number().refine((value) => {
    return Math.abs(value) <= 90
  })
}

export function validateLongitude() {
  return z.number().refine((value) => {
    return Math.abs(value) <= 180
  })
}
