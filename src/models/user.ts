import mongoose, { Schema, Document } from "mongoose";

export interface bucket extends Document {
    name: string
    weight: number
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
    password: string
    address: string
    number: number
    otp: number
    otpExpiry: Date
    isVerified: boolean
    buckets: bucket[]
}

const UserSchema: Schema<User> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: String,
    },
    number: {
        type: Number,
        required: [true, 'Mobile number is required'],
        unique: true
    },
    otp: {
        type: Number,
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
    buckets: {
        type: [bucketSchema],
    }
})

const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema)

export default userModel