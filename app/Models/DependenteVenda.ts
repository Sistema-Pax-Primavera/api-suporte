import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class DependenteVenda extends BaseModel {
  public static table = 'venda.dependente_venda'

  @column({ isPrimary: true })
  public id: number

  // ID do titular associado a este dependente.
  @column()
  public titularId: number

  // ID do tipo de parentesco com o titular.
  @column()
  public parentescoId: number | null | undefined 

  // ID da raça do dependente.
  @column()
  public racaId: number | null | undefined

  // ID da espécie do dependente.
  @column()
  public especieId: number | null | undefined

  // Nome do dependente.
  @column()
  public nome: string

  // CPF do dependente.
  @column()
  public cpf: string | null | undefined

  // Altura do dependente.
  @column()
  public altura: number | null | undefined

  // Peso do dependente.
  @column()
  public peso: number | null | undefined

  // Cor do dependente.
  @column()
  public cor: string | null | undefined

  // Porte do dependente (por exemplo, 'P', 'M', 'G', 'GG').
  @column()
  public porte: string | null | undefined

  // Data de nascimento do dependente.
  @column.date()
  public dataNascimento: DateTime

  // Tipo do dependente (um número que representa um tipo específico).
  @column()
  public tipo: number

  // Indica se o dependente pode ser cremado.
  @column()
  public cremacao: boolean

  // ID do adicional associado a este dependente.
  @column()
  public adicionalId: number

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
  public static async format(data: DependenteVenda){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}