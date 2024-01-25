import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class CartaoAssociado extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.cartao_associado'

  // ID do associado.
  @column()
  public associadoId: number

  // ID do dependente.
  @column()
  public dependenteId: number
  
  // IDs dos pagamentos associados a este cartão.
  @column()
  public pagamento: number[] | null | undefined

  // Data de pagamento deste cartão.
  @column.date()
  public dataPagamento: DateTime | null | undefined

  // Valor a ser pago.
  @column()
  public valorPagar: number

  // Status de emissão: 0-Pendente 1-Impresso.
  @column()
  public status: number

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