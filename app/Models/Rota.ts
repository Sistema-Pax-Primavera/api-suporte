import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Rota extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.rota'

  @column({ isPrimary: true })
  public id: number

  // ID da unidade vinculada a rota.
  @column()
  public unidadeId: number

  // ID do cobrador vinculado a rota.
  @column()
  public cobradorId: number

  // Nome do rota.
  @column()
  public descricao: string

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column()
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null | undefined

  @beforeSave()
  public static async format(data: Rota){
    data.descricao = data.descricao?.toUpperCase()
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}