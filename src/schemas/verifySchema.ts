import { z } from 'zod'

export const verifyUserSchema = z.object({
    email: z.string().email(),
    otp: z.string().min(6, { message: 'OTP must be 6 digits' }), // OTP must be 6 digits
})