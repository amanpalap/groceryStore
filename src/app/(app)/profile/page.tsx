'use client'
import { userUpdateSchemas } from "@/schemas/userUpdateSchemas"
import { useParams } from "next/navigation"
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
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import axios, { AxiosError } from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ApiResponse } from "@/types/ApiResponse"



const page = () => {
    const { toast } = useToast()
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

    const { reset } = form;

    const onSubmit = async (data: z.infer<typeof userUpdateSchemas>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.put('/api/update', data);
            toast({
                title: 'User updated successfully',
                description: "User updated successfully"
            })
            console.log(data)
            reset(data)
        } catch (error) {
            console.log("Error while verifying", error)

            let axiosError = error as AxiosError<ApiResponse>

            let errorMessage = axiosError.response?.data.message ||
                ('There was a problem in updating user. Please try again.');

            toast({
                title: 'Verifying Failed',
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
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
                <h1 className="w-1/2 font-bold text-center text-3xl font-mono bg-white text-black rounded-xl">Your Profile</h1>

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
