import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
    message: 'Email type is required.',
  },
  productId: {
    type: String,
    required: true,
    message: 'productId is required.',
  },
  price: {
    type: Number,
    required: true,
    message: 'Price is required.',
  },
  quantity: {
    type: Number,
    required: true,
    message: 'Quantity is required.',
  },
});

export const OrderModel = model<TOrder>('Order', orderSchema);
