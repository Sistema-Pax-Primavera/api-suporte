import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Permissao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.permissao'

  // ID do usuário a ser liberado.
  @column({ isPrimary: true })
  public usuarioId: number

  // ID do módulo a ser liberado.
  @column({ isPrimary: true })
  public moduloId: number

  // ID da unidade a ser liberada.
  @column({ isPrimary: true })
  public unidadeId: number

  // Aceita os valores (LER, GRAVAR). Especificando a ação que o usuário poderá realizar no módulo.
  @column()
  public acao: string[]

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
  * @param {Permissao} permissao - O objeto Permissao a ser formatado.
  *
  * @memberOf Permissao
  */
  @beforeSave()
  public static async formatFields(permissao: Permissao) {
    permissao.createdBy = formatarString(permissao.createdBy)
    permissao.updatedBy = formatarString(permissao.updatedBy)
  }
}
