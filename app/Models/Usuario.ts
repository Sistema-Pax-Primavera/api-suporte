import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Usuario extends BaseModel {
  public static table = 'public.usuario'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public cpf: string

  @column({ serializeAs: null })
  public senha: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public createdBy: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public updatedBy: string

  @beforeSave()
  public static async hashPassword (usuario: Usuario) {
    if (usuario.$dirty.senha) {
      usuario.senha = await Hash.make(usuario.senha)
    }
  }
}
