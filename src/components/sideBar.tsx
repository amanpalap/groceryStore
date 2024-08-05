"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconBrandTabler,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2, LogIn, LogOut, ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { useToast } from "./ui/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";


export function SidebarDemo() {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const items = useAppSelector((state) => state.cart)
    const links = [
        {
            label: "Home",
            href: '/home',
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Profile",
            href: "/user/profile",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Login",
            href: "/login",
            icon: (
                <LogIn className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />

            ),
        },
        {
            label: "Sign-up",
            href: "/sign-up",
            icon: (
                <LogIn className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];


    const handleLogout = async () => {
        setIsSubmitting(true)
        try {
            const response = await axios.get('/api/logout')
            toast({
                title: 'success',
                description: 'Logged out Successfully'
            })
            router.push('/login')
            console.log("pushing to logout")
        } catch (error) {
            console.error('Error during sign-up:', error); // eslint-disable-line no-console

            const axiosError = error as AxiosError<ApiResponse>;

            let errorMessage = axiosError.response?.data.message ||
                ('There was a while logging Out. Please try again.');
            toast({
                title: 'Logout Failed',
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false)
        }
    }
    const [open, setOpen] = useState(false);
    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between min-h-screen gap-10">
                <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="mt-8 flex flex-col gap-2">

                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                        <div className="mt-3 flex space-x-6">
                            <span className="flex">
                                <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                            </span>
                            <div onClick={() => signOut()} className="text-sm hover:translate-x-1 animation-tanslate duration-150" >
                                {isSubmitting ? (
                                    <div className="w-full flex">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </div>
                                ) : (
                                    <span className="cursor-pointer">
                                        LogOut
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-6">
                            <span className="flex">
                                <ShoppingCart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                {items.length > 0 && <span className="w-1 relative bottom-0 rounded-full p-2 text-center justify-center flex items-center h-1 bg-red-500 -translate-x-2 translate-y-3 font-bold text-xs -mr-4">
                                    {items.length}
                                </span>}
                            </span>
                            <Link className="text-sm hover:translate-x-1 animation-tanslate duration-150" href="/user/cart">Cart</Link>
                        </div>

                    </div>
                </div>



                <div>
                    <SidebarLink
                        link={{
                            label: "Manu Arora",
                            href: "#",
                            icon: (
                                <Image
                                    src="https://assets.aceternity.com/manu.png"
                                    className="h-7 w-7 flex-shrink-0 rounded-full"
                                    width={50}
                                    height={50}
                                    alt="Avatar"
                                />
                            ),
                        }}
                    />
                </div>
            </SidebarBody>
        </Sidebar>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Green Grocers
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};

// Dummy dashboard component with content
const Dashboard = () => {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <div className="flex gap-2">
                    {[...new Array(4)].map((i) => (
                        <div
                            key={"first-array" + i}
                            className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
                <div className="flex gap-2 flex-1">
                    {[...new Array(2)].map((i) => (
                        <div
                            key={"second-array" + i}
                            className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
