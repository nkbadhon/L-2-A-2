import { Schema, model } from 'mongoose';
import { TProduct, TVariants, TInventory } from './product.interface';

const variantsSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: true,
    message: 'Variant type is required.',
  },
  value: {
    type: String,
    required: true,
    message: 'Variant value is required.',
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
    message: 'Quantity is required.',
  },
  inStock: {
    type: Boolean,
    required: true,
    message: 'In stock status is required (true or false).',
  },
});

const productSchema = new Schema<TProduct>({
  productId: {
    type: String,
    required: true,
    unique: true,
    message: 'Product ID is required and must be unique.',
  },
  name: {
    type: String,
    required: true,
    message: 'Product name is required.',
  },
  description: {
    type: String,
    required: true,
    message: 'Product description is required.',
  },
  price: {
    type: Number,
    required: true,
    message: 'Please enter a valid price (numeric value).',
  },
  category: {
    type: String,
    required: true,
    message: 'Product category is required.',
  },
  tags: {
    type: [String],
    required: true,
    message: 'Product tags are required (array of strings).',
  },
  variants: {
    type: variantsSchema,
    required: true,
    message: 'Product variants are required.',
  },
  inventory: {
    type: inventorySchema,
    required: true,
    message: 'Product inventory details are required.',
  },
});

// Creating model for productSchema

export const ProductModel = model<TProduct>('Product', productSchema);
