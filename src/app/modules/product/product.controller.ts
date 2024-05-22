import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { z } from 'zod';
import productValidationSchema from './product.validation';

// COntroller for creating a product
const createProduct = async (req: Request, res: Response) => {
  try {
    // getting value from user request body
    const { product } = req.body;
    // creating schema validation using Zod
    const zodParseData = productValidationSchema.parse(product);

    // will call service function to send this data
    const result = await ProductServices.createProductInDB(zodParseData);
    // send response to the user
    res.status(200).json({
      success: true,
      message: 'Product Added Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB();

    res.status(200).json({
      success: true,
      message: 'Products Retrived Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product Retrived Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProducts,
};
