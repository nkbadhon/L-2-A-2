import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// This part will call controller to handle the process
router.post('/products', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);

export const ProductRoutes = router;
