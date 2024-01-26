import { BaseSchema } from "@adonisjs/lucid/schema";

/**
 * Classe de migração para criar a tabela 'plano_unidade'.
 *
 * Esta migração verifica se a tabela 'plano_unidade' já existe no banco de dados.
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
  protected schemaName: string = 'cobranca'

  /**
   * Nome da tabela que esta migração cria.
   *
   * @protected
   * @type {string}
   */
  protected tableName: string = 'plano_unidade'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'plano_unidade' se ela não existir.
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
          table.integer('plano_id').notNullable().unsigned().references('id').inTable('cobranca.plano').onDelete('CASCADE').onUpdate('CASCADE')
          table.integer('unidade_id').notNullable().unsigned().references('id').inTable('public.unidade').onDelete('CASCADE').onUpdate('CASCADE')
          table.decimal('valor_adesao', 10, 2).notNullable().defaultTo(0)
          table.decimal('valor_mensalidade', 10, 2).notNullable().defaultTo(0)
          table.decimal('valor_cartao', 10, 2).nullable().defaultTo(0)
          table.decimal('valor_adicional', 10, 2).notNullable().defaultTo(0)
          table.decimal('valor_transferencia', 10, 2).notNullable().defaultTo(0)
          table.integer('carencia_novo').nullable().defaultTo(0)
          table.integer('carencia_atraso').nullable().defaultTo(0)
          table.integer('limite_dependente').nullable().defaultTo(0)
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas rotas de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()

          table.primary(['plano_id', 'unidade_id'])
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'plano_unidade' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}