import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'

import Level from './Level'

export default class Developer extends BaseModel {
  @column({ isPrimary: true })
  public developer_id: number

  @column()
  public level_id: number

  @column()
  public developer_name: string

  @column()
  public gender: 'f' | 'm'

  @column({
    serialize: (value?: Date | string) => {
      if (!value) return null
      if (typeof value === 'string') return value
      return (
        value.getFullYear() +
        '-' +
        (value.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        value.getDate().toString().padStart(2, '0')
      )
    },
  })
  public birthday: Date

  @column()
  public hobby: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @computed()
  public get age() {
    const now = new Date()
    const birthday = new Date(this.birthday)
    let age = now.getFullYear() - birthday.getFullYear()
    if (
      now.getMonth() < birthday.getMonth() ||
      (now.getMonth() === birthday.getMonth() && now.getDate() < birthday.getDate())
    ) {
      age = age - 1
    }
    return age
  }

  @computed()
  public get level_name() {
    return this.level?.level_name
  }

  @belongsTo(() => Level, {
    localKey: 'level_id',
    foreignKey: 'level_id',
  })
  public level: BelongsTo<typeof Level>
}
