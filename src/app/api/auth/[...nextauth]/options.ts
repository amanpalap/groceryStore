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
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.fullName = (user.firstName + " " + user.lastName).toString()
                token.email = user.email
                token.address = user.address
                token.number = user.number
                token.isAdmin = user.isAdmin
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.fullName = token.fullName
                session.user.email = token.email
                session.user.address = token.address
                session.user.number = token.number
                session.user.isAdmin = token.isAdmin
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.TOKEN_SECRET,
}