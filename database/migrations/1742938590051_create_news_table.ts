import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'news'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.text('desc')
      table.integer('id_category').unsigned().notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.foreign('id_category').references('id').inTable('news_categories').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
