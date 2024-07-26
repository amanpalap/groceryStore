'use client'
import { useToast } from "@/components/ui/use-toast"
import { signupSchema } from "@/schemas/signupSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from 'axios'
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ApiResponse } from "@/types/ApiResponse"
import { Loader2 } from "lucide-react"


export default function SignupPage() {

    const router = useRouter()
    const { toast } = useToast()

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [message, setMessage] = useState("")


    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>('/api/sign-up', data)
            console.log(response)

            toast({
                title: 'success',
                description: response.data.message,
            })

            setMessage(response.data.message)
            // router.replace(`/verify/${firstname + " " + lastname}`)

        } catch (error) {
            console.error('Error during sign-up:', error); // eslint-disable-line no-console

            const axiosError = error as AxiosError<ApiResponse>;

            let errorMessage = axiosError.response?.data.message ||
                ('There was a problem with your sign-up. Please try again.');
            toast({
                title: 'Sign Up Failed',
                description: errorMessage,
                variant: 'destructive',
            });

        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="border-2 p-10 rounded-xl justify-center flex flex-wrap space-y-8 max-w-xl">
                <h1 className="w-1/2 text-center text-3xl font-serif p-2 bg-white text-black rounded-xl">SIGN-UP</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 justify-between w-full flex flex-wrap">
                        <div className="justify-between w-full flex flex-wrap">
                            <FormField
                                name="firstName"
                                control={form.control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem className="w-[45%]">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Aman"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    setFirstname(e.target.value)
                                                }}
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
                                                placeholder="Pal"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    setLastname(e.target.value)
                                                }}
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
                                            placeholder="example@gmail.com"
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
                                            placeholder="example@gmail.com"
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
                            'Sign Up'
                        )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}


