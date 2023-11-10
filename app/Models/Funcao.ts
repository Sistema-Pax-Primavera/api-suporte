import { BaseModel, ManyToMany, beforeSave, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { formatarExtras, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'
import Modulo from './Modulo'

export default class Funcao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.funcao'

  @column({ isPrimary: true })
  public id: number

  // Nome da função.
  @column()
  public descricao: string | null

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column({ serializeAs: null })
  public createdBy: string | null

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  // Nome do responsável pela atualização do registro.
  @column({ serializeAs: null })
  public updatedBy: string | null

  // Relacionamento para buscar os módulos vinculados a função.
  @manyToMany(() => Modulo, {
    pivotTable: 'public.modulo_funcao',
    localKey: 'id',
    pivotForeignKey: 'funcao_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'modulo_id',
    pivotColumns: ['acao'],
    onQuery: (query) => {
      query.where('public.modulo.ativo', true)
    }
  })
  public modulos: ManyToMany<typeof Modulo>

  /**
   * Método toJSON personalizado para formatar o retorno das informações adicionais.
   *
   * @return {Object} 
   * @memberof Unidade
   */
  public toJSON(): Object {
    return {
      id: this.id,
      descricao: this.descricao,
      ativo: this.ativo,
      modulos: this.modulos ? this.modulos.map((item) => {
        const extras = formatarExtras(item.$extras)
        return {
          ...item.toJSON(),
          acao: extras.acao
        }
      }) : []
    }
  }

  /**
  * Método de gancho (hook) que formata os campos do registro antes de salvá-los.
  *
  * @param {Funcao} funcao - O objeto Funcao a ser formatado.
  *
  * @memberOf Funcao
  */
  @beforeSave()
  public static async formatFields(funcao: Funcao) {
    funcao.descricao = formatarString(funcao.descricao)
    funcao.createdBy = formatarString(funcao.createdBy)
    funcao.updatedBy = formatarString(funcao.updatedBy)
  }
}