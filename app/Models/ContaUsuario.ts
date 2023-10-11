import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class ContaUsuario extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.conta_usuario'

  // ID da conta.
  @column()
  public contaId: number

  // ID do usuário.
  @column()
  public usuarioId: number

  // ID da unidade.
  @column()
  public unidadeId: number

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
  * @param {ContaUsuario} contaUsuario - O objeto ContaUsuario a ser formatado.
  *
  * @memberOf ContaUsuario
  */
  @beforeSave()
  public static async formatFields(contaUsuario: ContaUsuario) {
    contaUsuario.createdBy = formatarString(contaUsuario.createdBy)
    contaUsuario.updatedBy = formatarString(contaUsuario.updatedBy)
  }
}
