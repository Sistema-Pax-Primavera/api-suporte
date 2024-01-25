import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Pagamento extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'pagamento.pagamento'

  @column({ isPrimary: true })
  public id: number

  // ID da unidade vinculada ao pagamento.
  @column()
  public unidadeId: number

  // ID do usuário que realizou o pagamento.
  @column()
  public usuarioId: number

  // ID do associado vinculado ao pagamento.
  @column()
  public associadoId: number

  // ID da movimentação associada ao pagamento.
  @column()
  public financeiroId: number | null | undefined

  // ID do cheque vinculado ao pagamento.
  @column()
  public chequeId: number | null | undefined

  // ID da forma de pagamento vinculada ao pagamento.
  @column()
  public formaPagamentoId: number

  // ID da conta vinculada ao pagamento.
  @column()
  public contaId: number

  // ID do tipo de caixa vinculado ao pagamento.
  @column()
  public tipoCaixaId: number

  // ID do fornecedor vinculado a movimentação.
  @column()
  public fornecedorId: number

  // Valor do pagamento.
  @column()
  public valor: number | null

  // Quantidade de parcelas associadas ao pagamento.
  @column()
  public quantidadeParcelas: number

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