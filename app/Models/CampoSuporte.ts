import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class CampoSuporte extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.campo_suporte'

  @column({ isPrimary: true })
  public id: number

  // ID da categoria vinclada ao campo. 
  @column()
  public categoriaId: number

  // Nome da categoria.
  @column()
  public descricao: string
  
  // Tipagem do campo.
  @column()
  public tipo: string

  // Opções em caso de multípla escolha.
  @column()
  public opcoes: Object[] | null | undefined

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