import type { HttpContext } from '@adonisjs/core/http'
import { AuthValidator, messagesProvider } from '#validators/form_validate'
import User from '#models/user'
// import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  /**
   * Display a list of resource
   */
  async getuser({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()
      return response.status(200).json({
        user: user,
      })
    } catch (error) {
      return response.status(200).json({
        message: 'Failed Get User',
        error: error.messages,
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
  async register({ request, response }: HttpContext) {
    try {
      const validateData = await request.validateUsing(AuthValidator, {
        messagesProvider,
      })

      await User.create({
        fullName: validateData.full_name,
        email: validateData.email,
        password: validateData.password,
      })

      return response.status(200).json({
        message: 'Register Success',
      })
    } catch (error) {
      return response.status(422).json({
        message: 'Register Failed',
        error: error.messages,
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async login({ response, request }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // const user = await User.findBy('email', email)
      // if (!user) {
      //   return response.status(422).json({
      //     message: 'Invalid Credentials',
      //   })
      // }

      // const verifyPassword = await hash.verify(user.password, password)
      // if (!verifyPassword) {
      //   return response.status(422).json({
      //     message: 'Invalid Credentials',
      //   })
      // }

      const user = await User.verifyCredentials(email, password)
      if (!user) {
        return response.status(422).json({
          message: 'Invalid Credentials',
        })
      }

      const token = await User.accessTokens.create(user)
      return response.status(200).json({
        message: 'Login Success',
        token: token,
      })
    } catch (error) {
      return response.status(422).json({
        message: 'Invalid Credentials',
        error: error.messages,
      })
    }
  }
}
