/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
const ProductsController = () => import('#controllers/products_controller')
import { middleware } from './kernel.js'
const NewsCategoriesController = () => import('#controllers/news_categories_controller')
const NewsController = () => import('#controllers/news_controller')

router.get('/', async () => {
  return {
    message: 'hello world',
  }
})

router.get('/products', [ProductsController, 'index']).use(middleware.token())
router.post('/products', [ProductsController, 'store'])
router.get('/products/:id', [ProductsController, 'show'])
router.put('/products/:id', [ProductsController, 'update'])
router.delete('/products/:id', [ProductsController, 'destroy'])

router.post('/user/register', [AuthController, 'register'])
router.post('/user/login', [AuthController, 'login'])
router.get('/user', [AuthController, 'getuser']).use(middleware.token())

router.get('/news', [NewsController, 'index'])
router.get('/category', [NewsCategoriesController, 'index'])
