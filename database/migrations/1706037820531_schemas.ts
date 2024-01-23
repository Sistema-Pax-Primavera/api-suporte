import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Definição dos esquemas!
  protected publicSchema = 'public'
  protected associadoSchema = 'associado'
  protected cobrancaSchema = 'cobranca'
  protected financeiroSchema = 'financeiro'
  protected vendaSchema = 'venda'
  protected arquivoSchema = 'arquivo'

  // Função para criação dos schemas!
  public async up () {
    // Cria o esquema caso ele não exista!
    this.schema.createSchemaIfNotExists(this.publicSchema)
    this.schema.createSchemaIfNotExists(this.associadoSchema)
    this.schema.createSchemaIfNotExists(this.cobrancaSchema)
    this.schema.createSchemaIfNotExists(this.vendaSchema)
    this.schema.createSchemaIfNotExists(this.financeiroSchema)
    this.schema.createSchemaIfNotExists(this.arquivoSchema)
  }
}
