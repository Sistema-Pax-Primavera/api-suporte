import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'usuario'.
 *
 * Esta migração verifica se a tabela 'usuario' já existe no banco de dados.
 * Se não existir, a tabela é criada com as colunas especificadas.
 * Se já existir, nada é feito no método 'up'.
 *
 * @class
 * @extends BaseSchema
 */
export default class extends BaseSchema {
  /**
   * Nome do esquema no banco de dados.
   *
   * @protected
   * @type {string}
   */
  protected schemaName: string = 'public'

  /**
   * Nome da tabela que esta migração cria.
   *
   * @protected
   * @type {string}
   */
  protected tableName: string = 'usuario'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'usuario' se ela não existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async up(): Promise<void> {
    const hasTable = await this.schema
      .withSchema(this.schemaName)
      .hasTable(this.tableName)

    if (!hasTable) {
      this.schema.withSchema(this.schemaName)
        .createTable(this.tableName, (table) => {
          table.increments('id').primary()
          table.integer('unidade_id').notNullable().unsigned().references('id').inTable('public.unidade').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('setor_id').notNullable().unsigned().references('id').inTable('public.setor').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('funcao_id').notNullable().unsigned().references('id').inTable('public.funcao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('nome', 150).notNullable()
          table.string('cpf', 150).notNullable()
          table.string('senha', 50).notNullable()
          table.decimal('porcentagem_desconto', 10, 2).nullable().defaultTo(0).comment('Porcentagem máxima de desconto que o usuário pode aplicar nos recebimentos. Caso seja definido como 0, segue o padrão das regras de desconto.')
          table.timestamp('ultimo_acesso').nullable().comment('Data/Hora do ultimo acesso do usuário.')
          table.timestamp('ultimo_sincronismo').nullable().comment('Caso seja um cobrador/vendedor. Armazena Data/Hora do ultimo sincronismo realizado.')
          table.time('hora_liberacao').nullable().comment('Caso seja um cobrador, ele terá acesso ao aplicativo apenas após esse horário. Se definido como null, a regra não se aplica.')
          table.time('hora_finalizacao').nullable().comment('Caso seja um cobrador, ele terá acesso ao aplicativo apenas antes desse horário. Se definido como null, a regra não se aplica.')
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas rotas de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'usuario' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}