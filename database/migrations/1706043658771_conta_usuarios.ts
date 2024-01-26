import { BaseSchema } from "@adonisjs/lucid/schema";

/**
 * Classe de migração para criar a tabela 'conta_usuario'.
 *
 * Esta migração verifica se a tabela 'conta_usuario' já existe no banco de dados.
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
  protected tableName: string = 'conta_usuario'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'conta_usuario' se ela não existir.
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
          table.integer('conta_id').notNullable().unsigned().references('id').inTable('financeiro.conta').onDelete('CASCADE').onUpdate('CASCADE')
          table.integer('usuario_id').notNullable().unsigned().references('id').inTable('public.usuario').onDelete('CASCADE').onUpdate('CASCADE')
          table.integer('unidade_id').notNullable().unsigned().references('id').inTable('public.unidade').onDelete('CASCADE').onUpdate('CASCADE')
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas rotas de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()

          table.primary(['conta_id', 'usuario_id', 'unidade_id'])
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'conta_usuario' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}