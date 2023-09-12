import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'modulo_funcao'.
 *
 * Esta migração verifica se a tabela 'modulo_funcao' já existe no banco de dados.
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
  protected tableName: string = 'modulo_funcao'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'modulo_funcao' se ela não existir.
   *
   * Essa tabela é apenas para fins de auxílio. Ao cadastrar um usuário com determinada função, esses valores irão ser pré-carregados, para serem alterados e assim inseridos na tabela 'permissao'.
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
          table.integer('modulo_id').notNullable().unsigned().references('id').inTable('public.modulo').onDelete('CASCADE').onUpdate('CASCADE')
          table.integer('funcao_id').notNullable().unsigned().references('id').inTable('public.funcao').onDelete('CASCADE').onUpdate('CASCADE')
          table.specificType('acao', 'character varying[]').notNullable().comment('Aceita os valores (LER, GRAVAR). Especificando a ação que o usuário com determinada função poderá realizar no módulo.')
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
   * Exclui a tabela 'modulo_funcao' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}