import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class FormaPagamento extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.forma_pagamento'

  @column({ isPrimary: true })
  public id: number

  // Nome da forma de pagamento.
  @column()
  public descricao: string | null

  // Tipo da forma de pagamento: T-Tesouraria B-Bancario C-Cartão P-Provisória.
  @column()
  public tipo: string | null

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
  * @param {FormaPagamento} formaPagamento - O objeto FormaPagamento a ser formatado.
  *
  * @memberOf FormaPagamento
  */
  @beforeSave()
  public static async formatFields(formaPagamento: FormaPagamento) {
    formaPagamento.descricao = formatarString(formaPagamento.descricao)
    formaPagamento.createdBy = formatarString(formaPagamento.createdBy)
    formaPagamento.updatedBy = formatarString(formaPagamento.updatedBy)
  }
}
