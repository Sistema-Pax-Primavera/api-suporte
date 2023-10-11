import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class CategoriaSuporte extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.categoria_suporte'

  @column({ isPrimary: true })
  public id: number

  // Nome da categoria.
  @column()
  public descricao: string | null

  // Ordem de prioridade.
  @column()
  public prioridade: number

  // IDs dos setores liberados.
  @column()
  public setor: number[]

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
  * @param {CategoriaSuporte} categoriaSuporte - O objeto CategoriaSuporte a ser formatado.
  *
  * @memberOf CategoriaSuporte
  */
  @beforeSave()
  public static async formatFields(categoriaSuporte: CategoriaSuporte) {
    categoriaSuporte.descricao = formatarString(categoriaSuporte.descricao)
    categoriaSuporte.createdBy = formatarString(categoriaSuporte.createdBy)
    categoriaSuporte.updatedBy = formatarString(categoriaSuporte.updatedBy)
  }
}
