import type { HttpContext } from '@adonisjs/core/http'
import News from '#models/news'
import { messagesProvider, NewsValidator } from '#validators/form_validate'

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
  async store({ request, response }: HttpContext) {
    try {
      const validateData = await request.validateUsing(NewsValidator, {
        messagesProvider,
      })

      await News.create({
        name: validateData.name,
        desc: validateData.desc,
        id_category: validateData.id_category,
      })

      return response.status(200).json({
        message: 'Create News Success',
      })
    } catch (error) {
      return response.status(401).json({
        message: 'Create News Failed',
        error: error.messages,
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const news = await News.findOrFail(params.id)
      await news.load('category')
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
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const news = await News.findOrFail(params.id)
      const validateData = await request.validateUsing(NewsValidator, {
        messagesProvider,
      })

      news.merge({
        name: validateData.name,
        desc: validateData.desc,
        id_category: validateData.id_category,
      })

      news.save()
      return response.status(200).json({
        message: 'Update News Success',
      })
    } catch (error) {
      return response.status(401).json({
        message: 'Update News Failed',
        error: error.messages,
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const news = await News.findOrFail(params.id)
      await news.delete()

      return response.status(200).json({
        message: 'Delete News Success',
      })
    } catch (error) {
      return response.status(401).json({
        message: 'Delete News Failed',
        error: error.messages,
      })
    }
  }
}
