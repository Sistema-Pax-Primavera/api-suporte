import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'api_tokens'.
 *
 * Esta migração verifica se a tabela 'api_tokens' já existe no banco de dados.
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
  protected tableName: string = 'api_tokens'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'api_tokens' se ela não existir.
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
          table.integer('user_id').unsigned().references('id').inTable('public.usuarios').onDelete('CASCADE')
          table.string('name').notNullable()
          table.string('type').notNullable()
          table.string('token', 64).notNullable().unique()
          table.timestamp('expires_at', { useTz: true }).nullable()
          table.timestamp('created_at', { useTz: true }).notNullable()
        })
    }
  }

  /**
     * Método 'down' da migração.
     * Exclui a tabela 'api_tokens' se ela existir.
     *
     * @public
     * @returns {Promise<void>}
     */
  public async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
