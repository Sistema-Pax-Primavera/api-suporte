import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Template extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'venda.template'

  @column({ isPrimary: true })
  public id: number

  // Nome do template.
  @column()
  public descricao: string | null

  // HTML do template a ser renderizado.
  @column()
  public template: string | null

  // Tipo do template.
  @column()
  public tipo: number

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
  * @param {Template} template - O objeto Template a ser formatado.
  *
  * @memberOf Template
  */
  @beforeSave()
  public static async formatFields(template: Template) {
    template.descricao = formatarString(template.descricao)
    template.template = formatarString(template.template)
    template.createdBy = formatarString(template.createdBy)
    template.updatedBy = formatarString(template.updatedBy)
  }
}
