import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// This part will call controller to handle the process

// To delete
router.delete('/products/:productId', ProductControllers.deleteProducts);
// to update
router.put('/products/:productId', ProductControllers.updateSingleProducts);
// to create
router.post('/products', ProductControllers.createProduct);
// Get all
router.get('/products/:productId', ProductControllers.getAllProducts);
// search
router.get('/products', ProductControllers.getSearchProducts);

export const ProductRoutes = router;
