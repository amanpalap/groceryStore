// utils/auth.ts
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

export const isAuthenticated = async (context: GetServerSidePropsContext): Promise<boolean> => {
    const session = await getSession(context);
    console.log(session)
    return !!session; // returns true if session exists, false otherwise
};
