import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Permissao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.permissao'

  // ID do usuário a ser liberado.
  @column({ isPrimary: true, serializeAs: null })
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
  @column({ serializeAs: null })
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column({ serializeAs: null })
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column({ serializeAs: null })
  public updatedBy: string | null | undefined
}