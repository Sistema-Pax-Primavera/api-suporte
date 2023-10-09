import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class SubCategoriaHistorico extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.sub_categoria_historico'

  @column({ isPrimary: true })
  public id: number

  // ID da categoria.
  @column()
  public categoriaHistoricoId: number

  // Nome da categoria do histórico.
  @column()
  public descricao: string | null

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
  * @param {SubCategoriaHistorico} subCategoriaHistorico - O objeto SubCategoriaHistorico a ser formatado.
  *
  * @memberOf SubCategoriaHistorico
  */
  @beforeSave()
  public static async formatFields(subCategoriaHistorico: SubCategoriaHistorico) {
    subCategoriaHistorico.descricao = formatarString(subCategoriaHistorico.descricao)
    subCategoriaHistorico.createdBy = formatarString(subCategoriaHistorico.createdBy)
    subCategoriaHistorico.updatedBy = formatarString(subCategoriaHistorico.updatedBy)
  }
}
