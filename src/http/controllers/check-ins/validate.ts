import { makeValidateCheckInUseCases } from '@/use-cases/factories/make-validate-check-in-use-cases'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCases()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
