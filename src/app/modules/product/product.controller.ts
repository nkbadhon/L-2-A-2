import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import { TProduct } from './product.interface';

// COntroller for creating a product
const createProduct = async (req: Request, res: Response) => {
  try {
    // getting value from user request body
    const { product } = req.body;
    // creating schema validation using Zod
    const zodParseData = productValidationSchema.parse(product);

    // will call service function to send this data
    const result = await ProductServices.createProductInDB(zodParseData);

    //
    // send response to the user
    res.status(200).json({
      success: true,
      message: 'Product Added Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// Single and all product
const getAllProducts = async (req: Request, res: Response) => {
  try {
    let result;
    const { productId } = req.params;

    // Checking either it is searching for the specific product

    if (productId) {
      result = await ProductServices.getSingleProductFromDB(productId);
      res.status(200).json({
        success: true,
        message: `Product (${productId}) Retrived Successfully`,
        data: result,
      });
    } else {
      // Otherwise, fetch all products
      result = await ProductServices.getAllProductFromDB();
      res.status(200).json({
        success: true,
        message: 'All Products Retrived Successfully',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// Function for delete product
const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product Deleted Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// Function to get search result
const getSearchProducts = async (req: Request, res: Response) => {
  const searchTerm: any = req.query.searchTerm;

  const regex = new RegExp(searchTerm, 'i');
  const query = {
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { tags: { $regex: regex } },
    ],
  };
  try {
    const result = await ProductServices.getSearchProductFromDB(query);

    res.status(200).json({
      success: true,
      message: `Products  fetched successfully!`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

//Function for update a product
const updateSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const result: TProduct | null =
      await ProductServices.updateSingleProductFromDB(productId, updateData);

    res.status(200).json({
      success: true,
      message: 'Product Updated Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  deleteProducts,
  getSearchProducts,
  updateSingleProducts,
};
