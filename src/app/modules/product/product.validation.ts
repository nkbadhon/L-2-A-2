import { z } from 'zod';

const variantsValidationSchema = z.object({
  type: z.string().min(1, 'Variant type is required.'),
  value: z.string().min(1, 'Variant value is required.'),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be a non-negative integer.'),
  inStock: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'In stock status is required (true or false).',
  }),
});

const productValidationSchema = z.object({
  productId: z.string().min(1, 'Product ID is required and must be unique.'),
  name: z.string().min(1, 'Product name is required.'),
  description: z.string().min(1, 'Product description is required.'),
  price: z.number().min(0, 'Please enter a valid price (numeric value).'),
  category: z.string().min(1, 'Product category is required.'),
  tags: z
    .array(z.string().min(1))
    .min(1, 'Product tags are required (array of strings).'),
  variants: variantsValidationSchema,
  inventory: inventoryValidationSchema,
  isDeleted: z.boolean(),
});

export default productValidationSchema;
