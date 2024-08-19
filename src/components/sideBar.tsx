"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, LogOut, ShoppingCart, House, UserPlus, UserPen, CircleAlert, Logs } from "lucide-react";
import { signOut } from "next-auth/react";
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks/hooks'
import { add } from "@/lib/store/features/cart/cartSlice";

export function SidebarDemo() {
    const { data: session } = useSession()
    const [getSession, setGetSession] = useState(false)
    const item = useAppSelector((state) => state.cart)

    useEffect(() => {
        if (session) {
            setGetSession(true)
            console.log(session)
        } else {
            setGetSession(false)
        }
    }, [session])

    const [open, setOpen] = useState(false);
    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between min-h-screen gap-10">
                <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="mt-8 flex flex-col gap-4">
                        <Link href={"/home"} className="w-full flex flex-grow space-x-4">
                            <span className="flex">
                                <House className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                            </span>
                            <div className="text-sm inline-block h-5 overflow-hidden hover:translate-x-1 animation-tanslate duration-150 cursor-pointer" >
                                Home
                            </div>
                        </Link>
                        {getSession &&
                            (<div className="flex flex-wrap fitems-center justify-start gap-4">
                                <Link href={"/user/profile"} className="w-full flex flex-grow space-x-4">
                                    <span className="flex">
                                        <UserPen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                    </span>
                                    <div className="text-sm inline-block h-5 overflow-hidden hover:translate-x-1 animation-tanslate duration-150 cursor-pointer" >
                                        Profile
                                    </div>
                                </Link>
                                <Link href={"/user/cart"} className="w-full flex flex-grow gap-x-4">
                                    <span className="flex">
                                        <ShoppingCart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                        {item && item.length > 0 && <span className="bg-red-500 absolute justify-center text-center rounded-full text-xs p-1.5 h-4 w-4 overflow-hidden font-bold translate-x-3 translate-y-3 flex items-center m-0">
                                            {item.length}</span>}
                                    </span>
                                    <div className="text-sm hover:translate-x-1 animation-tanslate duration-150 cursor-pointer" >
                                        Cart
                                    </div>
                                </Link>
                                <div className="w-full flex flex-grow space-x-4">
                                    <span className="flex">
                                        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                    </span>
                                    <div onClick={() => signOut()} className="text-sm hover:translate-x-1 animation-tanslate duration-150 cursor-pointer" >
                                        LogOut
                                    </div>
                                </div>
                            </div>
                            )
                        }
                        {!getSession &&
                            (<div className="flex flex-wrap fitems-center justify-start gap-4">
                                <Link href={"/sign-up"} className="w-full flex flex-grow space-x-4">
                                    <span className="flex">
                                        <UserPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                    </span>
                                    <div className="text-sm inline-block h-5 overflow-hidden hover:translate-x-1 animation-tanslate duration-150 cursor-pointer" >
                                        Sign-up
                                    </div>
                                </Link>
                                <Link href={"/login"} className="w-full flex flex-grow space-x-4">
                                    <span className="flex">
                                        <LogIn className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                    </span>
                                    <div className="text-sm hover:translate-x-1 animation-tanslate duration-150 cursor-pointer" >
                                        Login
                                    </div>
                                </Link>
                            </div>
                            )
                        }
                        {session && session.user && session.user.isAdmin && <Link href={"/orders"} className="w-full flex flex-grow space-x-4">
                            <span className="flex">
                                <Logs className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 rotate-180" />
                            </span>
                            <div className="text-sm inline-block h-5 overflow-hidden hover:translate-x-1 animation-tanslate duration-150 cursor-pointer" >
                                Orders
                            </div>
                        </Link>}
                        <Link href={"/about"} className="w-full flex flex-grow space-x-4">
                            <span className="flex">
                                <CircleAlert className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 rotate-180" />
                            </span>
                            <div className="text-sm inline-block h-5 overflow-hidden hover:translate-x-1 animation-tanslate duration-150 cursor-pointer" >
                                About
                            </div>
                        </Link>
                    </div>
                </div>



                <div>
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
