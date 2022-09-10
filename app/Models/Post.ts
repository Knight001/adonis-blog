import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Category from './Category'

export default class Post extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title']
  })
  public slug: string

  @column()
  public body: string

  @column()
  public image: string

  @column()
  public category_id: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
