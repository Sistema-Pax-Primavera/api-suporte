import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Usuario extends BaseModel {
  public static table = 'public.usuario'

  @column({ isPrimary: true })
  public id: number

  // ID da unidade principal associada ao usuário.
  @column()
  public unidadeId: number

  // ID do setor associado ao usuário.
  @column()
  public setorId: number

  // ID da função do usuário.
  @column()
  public funcaoId: number

  // Nome do usuário.  
  @column()
  public nome: string

  // Cpf do usuário.
  @column()
  public cpf: string

  // Senha do usuário.
  @column({ serializeAs: null, columnName: 'senha' })
  public password: string

  // Porcentagem máxima de desconto que o usuário pode dar.
  @column()
  public porcentagemDesconto: number | null | undefined

  // Timestamp do ultimo acesso ao sistemas.
  @column.dateTime()
  public ultimoAcesso: DateTime | null | undefined

  // Timestamp do ultimo sincronismo, quando for cobrador ou vendedor.
  @column.dateTime()
  public ultimoSincronismo: DateTime | null | undefined

  // Timestamp do ultimo acesso ao sistemas.
  @column.dateTime()
  public hora_liberacao: DateTime | null | undefined

  // Timestamp do ultimo sincronismo, quando for cobrador ou vendedor.
  @column.dateTime()
  public hora_finalizacao: DateTime | null | undefined

  // Indica se o usuário está ativo.
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

  /**
  * Método de gancho (hook) que gera um hash da senha antes de salvá-la
  *
  * @param {Usuario} user - O objeto Usuario da senha a ser criptografada.
  *
  * @memberOf Usuario
  */
  @beforeSave()
  public static async hashPassword(user: Usuario) {
    if (user.$dirty.password) {
      user.password =hashit Hash.make(user.password)
    }
  }
}