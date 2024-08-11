import { z } from 'zod'

export const cartSchema = z.object({
    weight: z.number(),
    name: z.string(),
    price: z.string(),
    amount: z.number()
})