import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class TokenMiddleware {
  async handle({ response, auth }: HttpContext, next: NextFn) {
    try {
      const token = await auth.authenticate()
      if (!token) {
        return response.status(403).json({
          message: 'forbidden',
        })
      }

      await next()
    } catch (error) {
      return response.status(403).json({
        message: 'forbidden',
      })
    }
  }
}
