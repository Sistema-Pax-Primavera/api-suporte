import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Unidade extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.unidade'

  @column({ isPrimary: true })
  public id: number

  // Nome da unidade.
  @column()
  public descricao: string

  // Razão social da unidade.
  @column()
  public razaoSocial: string

  // CNPJ da unidade.
  @column()
  public cnpj: string

  // Telefone da unidade.
  @column()
  public telefone: string

  // Email da unidade.
  @column()
  public email: string

  // CEP da unidade.
  @column()
  public cep: string

  // UF da unidade.
  @column()
  public uf: string

  // Município da unidade.
  @column()
  public municipio: string

  // Bairro da unidade.
  @column()
  public bairro: string

  // Rua da unidade.
  @column()
  public rua: string

  // Número residencial da unidade.
  @column()
  public numero: string

  // Complemento residencial da unidade.
  @column()
  public complemento: string | null | undefined

  // Inscrição estadual da unidade.
  @column()
  public inscricaoEstadual: string | null | undefined

  // Inscrição municipal da unidade.
  @column()
  public inscricaoMunicipal: string | null | undefined

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column({ serializeAs: null })
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column({ serializeAs: null })
  public updatedBy: string | null | undefined
}