import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('slug').nullable()
      table.text('body').notNullable()
      table.string('image').notNullable()
      table.integer('category_id')
      .unsigned()
      .nullable()
      table.foreign('category_id')
      .references('categories.id')
      .onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
