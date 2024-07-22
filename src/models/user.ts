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
    name: string
    email: string
    password: string
    address: string
    number: number
    otp: number
    otpExpiry: Date
    isVerified: boolean
    buckets: bucket[]
}

const UserSchema: Schema<User> = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: [true, 'Verify Code is required'],
    },
    otpExpiry: {
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    buckets: {
        type: [bucketSchema],
    }
})

const userModel = (mongoose.model.)