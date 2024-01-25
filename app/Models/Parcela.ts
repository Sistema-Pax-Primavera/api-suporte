import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Parcela extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.parcela'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado a parcela.
  @column()
  public associadoId: number

  // ID da negociação vinculada a parcela.
  @column()
  public negociacaoId: number | null | undefined

  // Array dos IDs de pagamentos.
  @column()
  public pagamento: number[] | null | undefined

  // Data de vencimento da parcela.
  @column.date()
  public dataVencimento: DateTime

  // Data de pagamento da parcela.
  @column.date()
  public dataPagamento: DateTime | null | undefined

  // Valor a ser pago.
  @column()
  public valorPagar: number

  // Valor da parcela.
  @column()
  public valorParcela: number

  // Valor adicional a parcela.
  @column()
  public valorAdicional: number

  // Valor da adesão.
  @column()
  public valorAdesao: number

  // Valor pago da parcela.
  @column()
  public valorPago: number | null | undefined

  // Tipo da parcela: 1-Parcela 2-Avulso 3-Adesão.
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
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null | undefined
}
  