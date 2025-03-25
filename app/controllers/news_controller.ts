import type { HttpContext } from '@adonisjs/core/http'
import News from '#models/news'

export default class NewsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const news = await News.query().preload('category')
      console.log(news)
      return response.status(200).json({
        news: news,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Not Found',
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