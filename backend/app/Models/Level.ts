import { DateTime } from 'luxon'
import { BaseModel, column, computed, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import Developer from './Developer'

export default class Level extends BaseModel {
  @column({ isPrimary: true })
  public level_id: number

  @column()
  public level_name: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @computed()
  public get developers_count() {
    return this.$extras.developers_count
  }

  @hasMany(() => Developer, {
    localKey: 'level_id',
    foreignKey: 'level_id',
  })
  public developers: HasMany<typeof Developer>
}
