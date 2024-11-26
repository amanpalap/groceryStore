import mongoose, { Schema, Document } from "mongoose";

export interface bucket extends Document {
    name: string
    weight: number
    price: number
    total: number
    createAt: Date
}

const bucketSchema: Schema<bucket> = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

export interface User extends Document {
    firstName: string
    lastName: string
    email: string
    password: string
    //TODO: Address should contain more detail like pincode, landmark, locality etc
    address: string
    number: string
    otp: string
    otpExpiry: Date
    isVerified: boolean
    isAdmin: boolean
    buckets: bucket[]
}

const UserSchema: Schema<User> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: String,
        default: null
    },
    number: {
        type: String,
        unique: false,
        default: null,
    },
    otp: {
        type: String,
        required: [true, 'OTP Code is required'],
    },
    otpExpiry: {
        type: Date,
        required: [true, 'OTP Expiry is required'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    buckets: {
        type: [bucketSchema],
    }
})

const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema)

export default userModel