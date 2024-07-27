'use client'
import { useToast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as z from 'zod'
import { ApiResponse } from '@/types/ApiResponse'
import { verifyUserSchema } from '@/schemas/verifySchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {

    const router = useRouter()
    const { toast } = useToast()
    const param = useParams()


    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof verifyUserSchema>>({
        resolver: zodResolver(verifyUserSchema),
        defaultValues: {
            email: decodeURIComponent(`${param.email}`),
            otp: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof verifyUserSchema>) => {
        setIsSubmitting(true)
        const emailss = decodeURIComponent(`${param.email}`).toString()
        console.log(emailss)
        console.log(data)

        try {
            const response = await axios.post<ApiResponse>('/api/verify-email', {
                email: data.email,
                otp: data.otp
            })

            toast({
                title: "User Verified",
                description: response.data.message
            })

            router.replace('/login')

        } catch (error) {
            console.log("Error while verifying", error)

            let axiosError = error as AxiosError<ApiResponse>

            let errorMessage = axiosError.response?.data.message ||
                ('There was a problem in verifying user. Please try again.');

            toast({
                title: 'Verifying Failed',
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="border-2 bg-slate-800 p-10 rounded-xl justify-center flex flex-wrap space-y-8 max-w-xl">
                <h1 className="w-1/2 text-center text-3xl font-serif bg-white text-black rounded-xl">VERIFICATION</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 justify-between w-full flex flex-wrap">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly
                                            {...field}
                                        />
                                    </FormControl>
                                    {error?.message && <FormMessage className="text-xs"> {error.message}</FormMessage>}
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="otp"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <FormItem className="w-full">
                                    <FormLabel>OTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>
                                    {error?.message && <FormMessage className="text-xs"> {error.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">{isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Submit'
                        )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}


