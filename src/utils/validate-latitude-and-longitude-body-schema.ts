import { z } from 'zod'

export function validateLatitude() {
  return z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  })
}

export function validateLongitude() {
  return z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  })
}
