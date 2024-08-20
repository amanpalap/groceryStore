'use client'
import { userUpdateSchemas } from "@/schemas/userUpdateSchemas"
import { useSession, signIn, getSession, signOut } from "next-auth/react";
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
import { Loader2, Mail, Slice } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from 'zod';
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import axios, { AxiosError } from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ApiResponse } from "@/types/ApiResponse"
import { UserData } from "@/types/UserData"


const page = () => {
    const { data: session, update } = useSession();
    const [active, setActive] = useState(false)
    const [password, setPassword] = useState("")
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState<UserData | null>(null)
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


    const { reset } = form;

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }

    const onSubmit = async (data: z.infer<typeof userUpdateSchemas>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.put('/api/update', data);
            toast({
                title: 'User updated successfully',
                description: "User updated successfully"
            })
            setActive(true)
            reset(data)
        } catch (error) {
            console.log("Error while verifying", error)

            let axiosError = error as AxiosError<ApiResponse>

            let errorMessage = axiosError.response?.data.message ||
                ('There was a problem in updating user. Please try again.');

            toast({
                title: 'Password Incorrect',
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
            setActive(false)
        }
    }

    useEffect(() => {
        const handleData = async () => {
            try {
                const response = await axios.get('/api/profile')
                const data = response.data.data
                setData(data)
                reset(data)
            } catch (error) {
                console.log("Error while login", error)

                let axiosError = error as AxiosError<ApiResponse>

                let errorMessage = axiosError.response?.data.message ||
                    ('There was error while getting profile. Please try again.');

                toast({
                    title: 'Updation Failed',
                    description: errorMessage,
                    variant: 'destructive',
                });
            }
        }
        handleData()
    }, [reset])

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="border-2 p-10 bg-slate-800 rounded-xl justify-center flex flex-wrap space-y-8 max-w-xl">
                {data &&
                    <div className="w-full flex flex-wrap justify-center items-center space-y-2">
                        <h1 className="px-4 w-full font-bold text-center text-3xl font-serif bg-white text-black rounded-xl">Welcome : {capitalizeFirstLetter(data.firstName) + " " + capitalizeFirstLetter(data.lastName)}
                        </h1>
                        <p className="flex w-full justify-center items-center"><Mail size={20} className="mr-2" /> : {data.email} </p>
                    </div>
                }
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 justify-between w-full flex flex-wrap">

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
                </Form>
            </div>

        </div>
    )
}

export default page
