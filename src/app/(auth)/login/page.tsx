'use client'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as z from 'zod'
import { ApiResponse } from '@/types/ApiResponse'
import { loginSchema } from '@/schemas/loginSchemas'
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
import Link from 'next/link'

export default function LoginPage() {

    const router = useRouter()
    const { toast } = useToast()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setIsSubmitting(true)

        try {
            const response = await axios.post('/api/login', data)

            toast({
                title: "loggedin successfully",
                description: response.data.message
            })
            router.push("/home")
        } catch (error) {
            console.log("Error while login", error)

            let axiosError = error as AxiosError<ApiResponse>

            let errorMessage = axiosError.response?.data.message ||
                ('There was a problem with your login. Please try again.');

            toast({
                title: 'Login Failed',
                description: errorMessage,
                variant: 'destructive',
            });


        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="border-2 p-10 bg-slate-800 rounded-xl justify-center flex flex-wrap space-y-8 max-w-xl">
                <h1 className="w-1/2 text-center text-3xl font-mono bg-white text-black rounded-xl font-bold">LOGIN</h1>

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
                                            {...field}
                                        />
                                    </FormControl>
                                    {error?.message && <FormMessage className="text-xs"> {error.message}</FormMessage>}
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Password</FormLabel>
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
                            'Login'
                        )}
                        </Button>
                    </form>
                    <div className="text-center mt-4">
                        <p>
                            Already a member?{' '}
                            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                                Sign up
                            </Link>
                        </p>
                    </div>

                </Form>
            </div >
        </div >
    )
}


