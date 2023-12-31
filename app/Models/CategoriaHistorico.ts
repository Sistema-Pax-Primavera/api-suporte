import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class CategoriaHistorico extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.categoria_historico'

  @column({ isPrimary: true })
  public id: number

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
  * @param {CategoriaHistorico} categoriaHistorico - O objeto CategoriaHistorico a ser formatado.
  *
  * @memberOf CategoriaHistorico
  */
  @beforeSave()
  public static async formatFields(categoriaHistorico: CategoriaHistorico) {
    categoriaHistorico.descricao = formatarString(categoriaHistorico.descricao)
    categoriaHistorico.createdBy = formatarString(categoriaHistorico.createdBy)
    categoriaHistorico.updatedBy = formatarString(categoriaHistorico.updatedBy)
  }
}
