import express from 'express';
import { OrderControllers } from './order.controllers';

const router = express.Router();

router.post('/orders', OrderControllers.createOrder);

router.get('/orders', OrderControllers.getAllOrders);

export const OrderRoutes = router;
