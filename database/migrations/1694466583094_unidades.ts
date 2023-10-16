import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'unidade'.
 *
 * Esta migração verifica se a tabela 'unidade' já existe no banco de dados.
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
  protected tableName: string = 'unidade'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'unidade' se ela não existir.
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
          table.string('descricao', 150).notNullable().unique()
          table.string('razao_social', 150).notNullable()
          table.string('cnpj').notNullable()
          table.string('telefone').notNullable()
          table.string('email', 150).notNullable()
          table.string('cep', 8).notNullable()
          table.string('uf', 2).notNullable()
          table.string('municipio', 150).notNullable()
          table.string('bairro', 150).notNullable()
          table.string('rua', 150).notNullable()
          table.string('numero', 50).notNullable()
          table.string('complemento', 150).nullable()
          table.string('inscricao_estadual', 50).nullable()
          table.string('inscricao_municipal', 50).nullable()
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
   * Exclui a tabela 'unidade' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}