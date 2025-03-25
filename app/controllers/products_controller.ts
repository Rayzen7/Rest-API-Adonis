import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { ProductValidator, messagesProvider } from '#validators/form_validate'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const products = await Product.all()
      return response.status(200).json({
        products: products,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Failed Get Data',
        error,
      })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const validateData = await request.validateUsing(ProductValidator, {
        messagesProvider,
      })

      await Product.create(validateData)
      return response.status(201).json({
        message: 'Create Product Success',
      })
    } catch (error) {
      return response.status(401).json({
        message: 'Failed Create Product',
        error: error.messages,
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      return response.status(200).json({
        product: product,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Data not Found',
        error,
      })
    }
  }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const products = await Product.findOrFail(params.id)
      const validateData = await request.validateUsing(ProductValidator, {
        messagesProvider,
      })

      products.merge(validateData)
      await products.save()
      return response.status(200).json({
        message: 'Update Product Success',
      })
    } catch (error) {
      return response.status(401).json({
        message: 'Failed Update Product',
        error: error.messages,
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const products = await Product.findOrFail(params.id)
      products.delete()

      return response.status(200).json({
        message: 'Delete Product Success',
      })
    } catch (error) {
      return response.status(401).json({
        message: 'Failed Delete Product',
        error: error.messages,
      })
    }
  }
}
