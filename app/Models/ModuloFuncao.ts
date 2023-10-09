import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class ModuloFuncao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.modulo_funcao'

  // ID do módulo a ser liberado.
  @column()
  public moduloId: number

  // ID da função a ser liberada.
  @column()
  public funcaoId: number

  // Aceita os valores (LER, GRAVAR). Especificando a ação que o usuário com determinada função poderá realizar no módulo.
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
  * @param {ModuloFuncao} moduloFuncao - O objeto ModuloFuncao a ser formatado.
  *
  * @memberOf ModuloFuncao
  */
  @beforeSave()
  public static async formatFields(moduloFuncao: ModuloFuncao) {
    moduloFuncao.createdBy = formatarString(moduloFuncao.createdBy)
    moduloFuncao.updatedBy = formatarString(moduloFuncao.updatedBy)
  }
}
