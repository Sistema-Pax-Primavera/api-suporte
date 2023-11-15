import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { formatarNumero, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'
import Permissao from './Permissao'

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
  public nome: string | null

  // Cpf do usuário.
  @column()
  public cpf: string | null

  // Senha do usuário.
  @column({ serializeAs: null, columnName: 'senha' })
  public password: string

  // Porcentagem máxima de desconto que o usuário pode dar.
  @column()
  public porcentagemDesconto: number | null | undefined

  // Timestamp do ultimo acesso ao sistemas.
  @column.dateTime()
  public ultimoAcesso: DateTime

  // Timestamp do ultimo sincronismo, quando for cobrador ou vendedor.
  @column.dateTime()
  public ultimoSincronismo: DateTime

  // Indica se o usuário está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column({ serializeAs: null })
  public createdBy: string | null

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  // Nome do responsável pela atualização do registro.
  @column({ serializeAs: null })
  public updatedBy: string | null

  // Relacionamento de busca das permissões do usuário.
  @hasMany(() => Permissao, {
    onQuery: (query) => {
      query
        .join('public.modulo', 'permissao.modulo_id', 'modulo.id')
        .join('public.unidade', 'permissao.unidade_id', 'unidade.id')
        .preload('modulo')
        .preload('unidade')
        .where('permissao.ativo', true)
        .andWhere('public.unidade.ativo', true)
        .andWhere('public.modulo.ativo', true)
    }
  })
  public permissoes: HasMany<typeof Permissao>

  /**
  * Método toJSON personalizado para formatar o retorno das informações adicionais.
  *
  * @return {Object} 
  * @memberof Unidade
  */
  public toJSON(): Object {
    const permissoesFormatadas = this.permissoes ? {
      permissoes: this.permissoes.map((item) => {
        return {
          ...item.toJSON()
        }
      })
    } : {}

    return {
      id: this.id,
      unidade_id: this.unidadeId,
      setor_id: this.setorId,
      funcao_id: this.funcaoId,
      nome: this.nome,
      cpf: this.cpf,
      porcentagem_desconto: this.porcentagemDesconto,
      ultimo_acesso: this.ultimoAcesso,
      ultimo_sincronismo: this.ultimoSincronismo,
      ativo: this.ativo,
      ...permissoesFormatadas
    }
  }

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
      user.password = await Hash.make(user.password)
    }
  }

  /**
  * Método de gancho (hook) que formata os campos do dependente antes de salvá-los.
  *
  * @param {Usuario} usuario - O objeto Usuario a ser formatado.
  *
  * @memberOf Usuario
  */
  @beforeSave()
  public static async formatFields(usuario: Usuario) {
    usuario.nome = formatarString(usuario.nome)
    usuario.cpf = formatarNumero(usuario.cpf)
    usuario.createdBy = formatarString(usuario.createdBy)
    usuario.updatedBy = formatarString(usuario.updatedBy)
  }
}
