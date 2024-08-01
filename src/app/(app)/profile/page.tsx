'use client'
import { userUpdateSchemas } from "@/schemas/userUpdateSchemas"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from 'zod';
import { useState } from "react"
import { Button } from "@/components/ui/button"



const page = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState({})

    const form = useForm<z.infer<typeof userUpdateSchemas>>({
        resolver: zodResolver(userUpdateSchemas),
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            number: '',
            email: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof userUpdateSchemas>) => {

    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="border-2 p-10 bg-slate-800 rounded-xl justify-center flex flex-wrap space-y-8 max-w-xl">
                <h1 className="w-1/2 font-bold text-center text-3xl font-mono bg-white text-black rounded-xl">SIGN-UP</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 justify-between w-full flex flex-wrap">
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
                        <div className="justify-between w-full flex flex-wrap">
                            <FormField
                                name="firstName"
                                control={form.control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem className="w-[45%]">
                                        <FormLabel>First Name</FormLabel>
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
                                name="lastName"
                                control={form.control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem className="w-[45%]">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        {error?.message && <FormMessage className="text-xs"> {error.message}</FormMessage>}
                                    </FormItem>
                                )}
                            />
                        </div>

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
                            name="address"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <FormItem className="w-full">
                                    <FormLabel>address</FormLabel>
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
                            name="number"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Number</FormLabel>
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
                            'Update'
                        )}
                        </Button>
                    </form>
                    <div className="text-center mt-4">
                        <p>
                            Already a member?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-800">
                                Login
                            </Link>
                        </p>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default page
