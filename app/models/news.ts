import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import NewsCategory from './news_category.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'

export default class News extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare name: string

  @column()
  declare desc: string

  @column({ columnName: 'id_category' })
  declare id_category: number

  @belongsTo(() => NewsCategory, { foreignKey: 'id_category' })
  declare category: BelongsTo<typeof NewsCategory>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
