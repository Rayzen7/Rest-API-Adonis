import { SimpleMessagesProvider } from '@vinejs/vine'
import vine from '@vinejs/vine'

export const messagesProvider = new SimpleMessagesProvider({
  required: 'The {{ field }} field is required',
  string: 'The {{ field }} field must be string',
  number: 'The {{ field }} field must be number',
  email: 'The {{ field }} field must be email',
})

export const ProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    category: vine.string(),
    desc: vine.string(),
    quantity: vine.number(),
    price: vine.number(),
  })
)

export const AuthValidator = vine.compile(
  vine.object({
    full_name: vine.string(),
    email: vine.string().email(),
    password: vine.string(),
  })
)

export const NewsValidator = vine.compile(
  vine.object({
    name: vine.string(),
    desc: vine.string(),
    id_category: vine.number(),
  })
)
