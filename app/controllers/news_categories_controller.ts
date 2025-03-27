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
}
