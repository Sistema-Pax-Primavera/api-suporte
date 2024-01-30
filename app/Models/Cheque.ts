import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Cheque extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'financeiro.cheque'

  @column({ isPrimary: true })
  public id: number

  // ID do banco vinculado ao cheque.
  @column()
  public bancoId: number

  // Número do cheque.
  @column()
  public numero: number

  // Agência do cheque.
  @column()
  public agencia: number

  // Dígito da agência do cheque.
  @column()
  public digitoAgencia: number

  // Número da conta do cheque.
  @column()
  public conta: number

  // Dígito do número da conta do cheque.
  @column()
  public digitoConta: number

  // Nome impresso no cheque.
  @column()
  public nome: string

  // Data do cheque.
  @column.dateTime()
  public data:  DateTime

  // Status do cheque: 1-Em aberto 2-Repassado 3-Depositado 4-Compensado 5-Devolvido.
  @column()
  public status: number

  // Valor do cheque.
  @column()
  public valor: number | null

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
  public static async format(data: Cheque){
    data.nome = data.nome?.toUpperCase()
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}