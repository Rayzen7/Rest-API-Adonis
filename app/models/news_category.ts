import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import News from './news.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { hasMany } from '@adonisjs/lucid/orm'

export default class NewsCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare category: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => News, { foreignKey: 'id_category' })
  declare news: HasMany<typeof News>
}
