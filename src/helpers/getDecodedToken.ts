import jwt, { JwtPayload } from 'jsonwebtoken';

export function getDecodedToken(token: string): JwtPayload | null {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
        return decoded;
    } catch (error) {
        console.error("Failed to decode token", error);
        return null;
    }
}
