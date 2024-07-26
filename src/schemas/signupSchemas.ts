import { z } from 'zod'

const nameValidation = z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name must be less than 20 characters')
    .regex(/^[A-Za-z\u00E0-\u00FC]+$/, 'Name must not contain special characters and spaces')

export const signupSchema = z.object({
    firstName: nameValidation,
    lastName: nameValidation,
    email: z
        .string()
        .email('Invalid email')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
})