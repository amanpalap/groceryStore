import mongoose, { Schema, Document, Model } from 'mongoose';

interface CartItem {
    name: string;
    price: string;
    amount: number;
    cost: string;
}

export interface OrderDocument extends Document {
    customer: string;
    address: string;
    phoneNumber: string;
    cartItems: CartItem[];
    total: string;
    orderDate: Date;
}

const CartItemSchema: Schema = new Schema<CartItem>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
});

const OrderSchema: Schema<OrderDocument> = new Schema<OrderDocument>({
    customer: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    cartItems: {
        type: [CartItemSchema],
        required: true
    },
    total: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
});

const OrdersModel: Model<OrderDocument> = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);

export default OrdersModel;
