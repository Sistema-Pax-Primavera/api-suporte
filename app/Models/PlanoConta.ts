import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class PlanoConta extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'financeiro.plano_conta'

  @column({ isPrimary: true })
  public id: number

  // ID do plano raiz vinculado a este plano de conta.
  @column()
  public planoRaiz: number | null | undefined

  // Nome do plano de conta.
  @column()
  public descricao: string | null

  // Código do plano de conta.
  @column()
  public codigo: string | null

  // Tipo do plano de conta: 1-Receita 2-Despesa.
  @column()
  public tipo: number

  // Nível do plano de conta.
  @column()
  public nivel: number

  // Indica se o plano é visível para lançamento de contas.
  @column()
  public visivel: boolean

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
  * @param {PlanoConta} planoConta - O objeto PlanoConta a ser formatado.
  *
  * @memberOf PlanoConta
  */
  @beforeSave()
  public static async formatFields(planoConta: PlanoConta) {
    planoConta.descricao = formatarString(planoConta.descricao)
    planoConta.createdBy = formatarString(planoConta.createdBy)
    planoConta.updatedBy = formatarString(planoConta.updatedBy)
  }
}
