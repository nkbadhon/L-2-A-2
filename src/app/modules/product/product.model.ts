import { Schema, model } from 'mongoose';
import { TProduct, TVariants, TInventory } from './product.interface';

const variantsSchema = new Schema<TVariants>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<TProduct>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: variantsSchema, required: true },
  inventory: { type: inventorySchema, required: true },
});

// Creating model for productSchema

export const ProductModel = model<TProduct>('Product', productSchema);
