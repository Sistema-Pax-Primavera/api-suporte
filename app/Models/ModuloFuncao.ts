import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class ModuloFuncao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.modulo_funcao'

  // ID do módulo a ser liberado.
  @column({ isPrimary: true})
  public moduloId: number

  // ID da função a ser liberada.
  @column({ isPrimary: true})
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
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null | undefined

  @beforeSave()
  public static async format(data: ModuloFuncao){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}