'use client'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as z from 'zod'
import { loginSchema } from '@/schemas/loginSchemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { signIn } from 'next-auth/react'

export default function LoginPage() {

    const router = useRouter()
    const { toast } = useToast()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setIsSubmitting(true)
        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        })

        if (result?.error) {
            setIsSubmitting(false)
            toast({
                title: 'Error',
                description: "Incorrect Credentials",
                variant: 'destructive'
            })
        }


        if (result?.url) {
            setIsSubmitting(false)
            router.replace('/home')
        }
    }

    return (
        <div className="flex justify-center items-center w-full max-h-screen min-h-screen">
            <div className="border-2 p-10 bg-slate-800 rounded-xl justify-center flex flex-wrap space-y-8 max-w-xl">
                <h1 className="w-1/2 text-center text-3xl font-mono bg-white text-black rounded-xl font-bold">LOGIN</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 justify-between w-full flex flex-wrap">
                        <FormField
                            name="identifier"
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
                            Didn't Have an Account?{' '}
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


