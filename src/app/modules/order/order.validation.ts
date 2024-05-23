import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  productId: z.string().min(1, 'Product ID is required and must be unique.'),
  quantity: z.number().int().min(0, 'Quantity must be a non-negative integer.'),
  price: z.number().min(0, 'Please enter a valid price (numeric value).'),
});

export default orderValidationSchema;
