import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class SituacaoModulo extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.situacao_modulo'

  @column({ isPrimary: true })
  public id: number

  // ID da situação a ser liberada.
  @column()
  public situacaoId: number
  
  // ID do módulo a ser liberado.
  @column()
  public moduloId: number

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column()
  public createdBy: string | null

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null

  /**
  * Método de gancho (hook) que formata os campos do registro antes de salvá-los.
  *
  * @param {SituacaoModulo} situacaoModulo - O objeto SituacaoModulo a ser formatado.
  *
  * @memberOf SituacaoModulo
  */
  @beforeSave()
  public static async formatFields(situacaoModulo: SituacaoModulo) {
    situacaoModulo.createdBy = formatarString(situacaoModulo.createdBy)
    situacaoModulo.updatedBy = formatarString(situacaoModulo.updatedBy)
  }
}
