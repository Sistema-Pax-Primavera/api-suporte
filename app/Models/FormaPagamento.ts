import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class FormaPagamento extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.forma_pagamento'

  @column({ isPrimary: true })
  public id: number

  // Nome da forma de pagamento.
  @column()
  public descricao: string

  // Tipo da forma de pagamento: T-Tesouraria B-Bancario C-Cartão P-Provisória.
  @column()
  public tipo: string

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