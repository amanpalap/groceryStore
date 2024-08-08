import { z } from 'zod'

export const cartSchema = z.object({
    weight: z.number().max(20, 'Must be 10 or less'),
})