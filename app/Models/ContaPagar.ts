import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class ContaPagar extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'financeiro.conta_pagar'

  @column({ isPrimary: true })
  public id: number

  // ID do fornecedor vinculado a despesa.
  @column()
  public fornecedorId: number

  // ID do plano de conta vinculado a despesa.
  @column()
  public planoContaId: number

  // Número do documento da despesa.
  @column()
  public numeroDocumento: string

  // Descrição da despesa.
  @column()
  public descricao: string

  // ID do usuário criador do registro.
  @column()
  public usuarioId: number

  // Data de vencimento da despesa.
  @column.date()
  public dataVencimento: DateTime

  // Valor de despesa a ser pago.
  @column()
  public valorPagar: number

  // ID da unidade vinculada a despesa.
  @column()
  public unidadeId: number

  // Status da despesa: 1-NORMAL 2-COMPARTILHADA ANTES DE LIQUIDAR AGUARDANDO 3-COMPARTILHADA ANTES DE LIQUIDAR ACEITA 4-COMPARTILHADA ANTES DE LIQUIDAR REJEITADA 5-COMPARTILHADA EM ABERTO 6-COMPARTILHADA LIQUIDADA A ACEITAR 7-COMPARTILHADA LIQUIDADA ACEITA 8-COMPARTILHADA LIQUIDADA REJEITADA 9-LIQUIDADA NORMAL 10-CONFERIDA 11-CONFERIDA COM ALERTA 12-CONFERIDA REJEITADA.
  @column()
  public status: number

  // Tipo da despesa: 1-NORMAL 2-COMPARTILHADA ANTES DE LIQUIDAR 3-COMPARTILHADA APOS LIQUIDAR 4-DESPESA PROVISORIA.
  @column()
  public tipoDespesa: number

  // Indica se a despesa possui anexo.
  @column()
  public anexo: boolean

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
  public static async format(data: ContaPagar){
    data.descricao = data.descricao?.toUpperCase()
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}