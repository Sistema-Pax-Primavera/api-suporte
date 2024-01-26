import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Dependente extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.dependente'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado ao dependente.
  @column()
  public associadoId: number

  // ID do parentesco vinculado ao dependente.
  @column()
  public parentescoId: number | null | undefined

  // ID da raça vinculado ao dependente(PET).
  @column()
  public racaId: number | null | undefined

  // ID da espécie vinculado ao dependente(PET).
  @column()
  public especieId: number | null | undefined

  // ID da situação do dependente.
  @column()
  public situacaoId: number

  // Nome do dependente.
  @column()
  public nome: string

  // CPF do dependente.
  @column()
  public cpf: string | null | undefined

  // Altura do dependente(PET). 
  @column()
  public altura: number | null | undefined

  // Peso do dependente(PET). 
  @column()
  public peso: number | null | undefined

  // Cor do dependente(PET).
  @column()
  public cor: string | null | undefined

  // Porte do dependente(PET).
  @column()
  public porte: string | null | undefined

  // Data de nascimento do dependente.
  @column.date()
  public dataNascimento: DateTime

  // Data de filiação do dependente.
  @column.date()
  public dataFiliacao: DateTime

  // Data de falecimento do dependente.
  @column.date()
  public dataFalecimento: DateTime | null | undefined

  // Data início da carência do dependente.
  @column.date()
  public dataInicioCarencia: DateTime | null | undefined

  // Data fim da carência do dependente.
  @column.date()
  public dataFimCarencia: DateTime | null | undefined

  // Tipo dependente: 1-Humano 2-Pet
  @column()
  public tipo: number

  // Indica se o dependente possui direito a cremação.
  @column()
  public cremacao: boolean

  // Data de filiação da cremação do dependente.
  @column.date()
  public filiacaoCremacao: DateTime | null | undefined

  // Data início da carência da cremação do dependente.
  @column.date()
  public dataInicioCarenciaCremacao: DateTime | null | undefined

  // Data fim da carência da cremação do dependente.
  @column.date()
  public dataFimCarenciaCremacao: DateTime | null | undefined

  // Data/Hora do cadastro da cremação.
  @column.dateTime()
  public cadastroCremacao: DateTime | null | undefined

  // Usuário que cadastrou a cremação.
  @column()
  public usuarioCremacao: string | null | undefined

  // ID da situação da cremação do dependente.
  @column()
  public situacaoCremacaoId: number | null | undefined

  // ID do adicional de cremação.
  @column()
  public adicionalId: number | null | undefined

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