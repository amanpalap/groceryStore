import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect';
import userModel from '@/models/user';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await userModel.findOne({ email: credentials.identifier })
                    if (!user) {
                        throw new Error('User Does not exists')
                    }

                    if (!user.isVerified) {
                        throw new Error('User is not verified, Please Signup again')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if (!isPasswordCorrect) {
                        throw new Error('Password is incorrect')
                    } else {
                        console.log(user)
                        return user
                    }
                } catch (error: any) {
                    console.log("Error while logging in", error)
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
            }
            return token
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.TOKEN_SECRET
}