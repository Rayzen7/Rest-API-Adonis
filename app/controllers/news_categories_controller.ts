import NewsCategory from '#models/news_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class NewsCategoriesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const category = await NewsCategory.query().preload('news')
    return response.status(200).json({
      category: category,
    })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}