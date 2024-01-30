import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Negociacao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.negociacao'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado a negociação.
  @column()
  public associadoId: number

  // ID do cobrador vinculado ao negociação.
  @column()
  public cobradorId: number | null | undefined

  // Indica o tipo do negociação: 1-Cobrador  2-Atendimento.
  @column()
  public tipo: number

  // Status do negociação: 0-Pendente  1-Finalizado.
  @column()
  public status: number

  // Motivo da negociação.
  @column()
  public motivo: string

  // Valor total da negociação sem desconto.
  @column()
  public valorTotal: number

  // Valor de desconto da negociação.
  @column()
  public valorDesconto: number

  // Porcentagem de desconto da negociação.
  @column()
  public porcentagemDesconto: number

  // Valor final a pagar.
  @column()
  public valorPagar: number

  // Porcentagem máxima permitida de desconto.
  @column()
  public porcentagemPermitida: number

  // Quantidade de parcelas negociadas.
  @column()
  public quantidadeParcela: number

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
  public static async format(data: Negociacao){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}