import { z } from 'zod'

export const firstNameValidation = z
    .string()
    .min(2, 'firstname must be at least 2 characters')
    .max(20, 'firstname must be no more than 20 characters')
    .regex(/^[A-Za-z]+$/, 'firstname must not contain special characters')

export const lastNameValidation = z
    .string()
    .min(2, 'firstname must be at least 2 characters')
    .max(20, 'firstname must be no more than 20 characters')
    .regex(/^[A-Za-z]+$/, 'firstname must not contain special characters')

export const signupSchema = z.object({
    firtName: firstNameValidation,
    lastName: lastNameValidation,
    email: z.string().email('invalid email'),
    password: z.string().min(8, 'password must be at least 8 characters'),
})