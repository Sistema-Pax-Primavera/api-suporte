import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarData, formatarNumero, formatarString } from 'App/Util/Format'

export default class Associado extends BaseModel {
  public static table = 'associado.associado'

  @column({ isPrimary: true })
  public id: number

  // ID da unidade associada a este associado.
  @column()
  public unidadeId: number

  // ID da situação do associado.
  @column()
  public situacaoId: number

  // Nome do associado.
  @column()
  public nome: string | null

  // RG do associado.
  @column()
  public rg: string | null

  // CPF ou CNPJ do associado.
  @column()
  public cpfCnpj: string | null

  // Data de nascimento do associado.
  @column()
  public dataNascimento: string | Date | null

  // Data de falecimento do associado.
  @column()
  public dataFalecimento: string | Date | null

  // Estado civil do associado.
  @column()
  public estadoCivilId: number

  // Religião do associado.
  @column()
  public religiaoId: number

  // Naturalidade do associado.
  @column()
  public naturalidade: string | null

  // Nacionalidade do associado (True - Brasileiro, False - Estrangeiro).
  @column()
  public nacionalidade: boolean

  // Profissão do associado.
  @column()
  public profissao: string | null

  // Gênero do associado (1 - Masculino, 2 - Feminino, 3 - Não Binário, 4 - Indefinido)
  @column()
  public sexo: number

  // Indica se o associado possui cremação.
  @column()
  public cremacao: boolean

  // ID do adicional de cremação que o associado possui.
  @column()
  public adicionalId: number

  // Data de filiação da cremação.
  @column()
  public filiacaoCremacao: string | Date | null

  // Data inicío da carência da cremação.
  @column()
  public dataInicioCarenciaCremacao: string | Date | null

  // Data fim da carência da cremação.
  @column()
  public dataFimCarenciaCremacao: string | Date | null

  // Data cadastro da cremação.
  @column.dateTime()
  public cadastroCremacao: DateTime

  // Nome do usuário que cadastrou a cremação.
  @column()
  public usuarioCremacao: string | null

  // ID da situação da cremação do associado.
  @column()
  public situacaoCremacaoId: number

  // Número de contrato do plano.
  @column()
  public contrato: number

  // Número de contrato do plano do cemitério.
  @column()
  public contratoCemiterio: number

  // Indica se o endereço comercial é o mesmo do residencial.
  @column()
  public enderecoComercial: boolean

  // ID do município vinculado ao endereço residencial do associado.
  @column()
  public municipioId: number

  // ID do bairro vinculado ao endereço residencial do associado.
  @column()
  public bairroId: number

  // CEP do endereço residencial do associado.
  @column()
  public cep: string | null

  // Estado (UF) do endereço residencial do associado.
  @column()
  public estado: string | null

  // Rua do endereço residencial do associado.
  @column()
  public rua: string | null

  // Logradouro do endereço residencial do associado.
  @column()
  public logradouro: string | null

  // Quadra do endereço residencial do associado.
  @column()
  public quadra: string | null

  // Lote do endereço residencial do associado.
  @column()
  public lote: string | null

  // Número do endereço residencial do associado.
  @column()
  public numero: string | null

  // Complemento do endereço residencial do associado.
  @column()
  public complemento: string | null

  // ID do município vinculado ao endereço de cobrança do associado.
  @column()
  public municipioCobrancaId: number

  // ID do bairro vinculado ao endereço de cobrança do associado.
  @column()
  public bairroCobrancaId: number

  // CEP do endereço de cobrança do associado.
  @column()
  public cepCobranca: string | null

  // Estado (UF) do endereço de cobrança do associado.
  @column()
  public estadoCobranca: string | null

  // Rua do endereço de cobrança do associado.
  @column()
  public ruaCobranca: string | null

  // Logradouro do endereço de cobrança do associado.
  @column()
  public logradouroCobranca: string | null

  // Quadra do endereço de cobrança do associado.
  @column()
  public quadraCobranca: string | null

  // Lote do endereço de cobrança do associado.
  @column()
  public loteCobranca: string | null

  // Número do endereço de cobrança do associado.
  @column()
  public numeroCobranca: string | null

  // Complemento do endereço de cobrança do associado.
  @column()
  public complementoCobranca: string | null

  // ID do plano vinculado ao associado.
  @column()
  public planoId: number

  // Data de cadastro do contrato.
  @column()
  public dataContrato: string | Date | null

  // Data inicío da carência do contrato.
  @column()
  public dataInicioCarencia: string | Date | null

  // Data fim da carência do contrato.
  @column()
  public dataFimCarencia: string | Date | null

  // Data da primeia parcela a ser paga.
  @column()
  public dataPrimeiraParcela: string | Date | null

  // Dia de vencimento das parcelas.
  @column()
  public diaPagamento: number

  // Data do último pagamento realizado.
  @column()
  public ultimoPagamento: string | Date | null

  // Data do último mês pago.
  @column()
  public ultimoMesPago: string | Date | null

  // ID do cobrador associado ao plano.
  @column()
  public cobradorId: number

  // ID da região associada ao plano.
  @column()
  public regiaoId: number

  // ID da rota associada ao plano.
  @column()
  public rotaId: number

  // ID do cobrador associado ao plano.
  @column()
  public cobradorTemporarioId: number

  // ID da região associada ao plano.
  @column()
  public regiaoTemporariaId: number

  // ID da rota associada ao plano.
  @column()
  public rotaTemporariaId: number

  // ID do vendedor associado ao plano.
  @column()
  public vendedorId: number

  // ID da concorrente em caso de transferência.
  @column()
  public concorrenteId: number

  // Data de cancelamento do plano.
  @column()
  public dataCancelamento: string | Date | null

  // Data de quitação do plano.
  @column()
  public dataQuitacao: string | Date | null

  // Data de cadastro do plano anterior.
  @column()
  public dataContratoAnterior: string | Date | null

  // Último mês pago do plano anterior.
  @column()
  public ultimoMesPagoAnterior: string | Date | null

  // Empresa assistencial do plano anterior.
  @column()
  public empresaAnterior: string | null

  // Observação do contrato.
  @column()
  public observacao: string | null

  // Local de cobrança ideal (1 - Escritório, 2 - Boleto, 3 - Cobrança Residencial, 4 - Cobrança Comercial, 4 - Pagamento Recorrente).
  @column()
  public localCobranca: number

  // Horário de cobrança ideal.
  @column()
  public horarioCobranca: string | Date | null

  // Indica se o termo de reajuste foi entregue.
  @column()
  public termoReajuste: boolean

  // Indica se o termo de reajuste foi entregue.
  @column()
  public boletoEntregue: boolean

  // Indica se o termo de reajuste foi entregue.
  @column()
  public tipoEntregaBoleto: boolean

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column()
  public createdBy: string | null

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null

  /**
  * Método de gancho (hook) que formata os campos do dependente antes de salvá-los.
  *
  * @param {Associado} associado - O objeto Associado a ser formatado.
  *
  * @memberOf Associado
  */
  @beforeSave()
  public static async formatFields(associado: Associado) {
    associado.nome = formatarString(associado.nome)
    associado.rg = formatarNumero(associado.rg)
    associado.cpfCnpj = formatarNumero(associado.cpfCnpj)
    associado.dataNascimento = formatarData(associado.dataNascimento)
    associado.dataFalecimento = formatarData(associado.dataFalecimento)
    associado.naturalidade = formatarString(associado.naturalidade)
    associado.profissao = formatarString(associado.profissao)
    associado.filiacaoCremacao = formatarData(associado.filiacaoCremacao)
    associado.dataInicioCarenciaCremacao = formatarData(associado.dataInicioCarenciaCremacao)
    associado.dataFimCarenciaCremacao = formatarData(associado.dataFimCarenciaCremacao)
    associado.usuarioCremacao = formatarString(associado.usuarioCremacao)
    associado.cep = formatarNumero(associado.cep)
    associado.estado = formatarString(associado.estado)
    associado.rua = formatarString(associado.rua)
    associado.logradouro = formatarString(associado.logradouro)
    associado.quadra = formatarString(associado.quadra)
    associado.lote = formatarString(associado.lote)
    associado.numero = formatarString(associado.numero)
    associado.complemento = formatarString(associado.complemento)
    associado.cepCobranca = formatarNumero(associado.cepCobranca)
    associado.estadoCobranca = formatarString(associado.estadoCobranca)
    associado.ruaCobranca = formatarString(associado.ruaCobranca)
    associado.logradouroCobranca = formatarString(associado.logradouroCobranca)
    associado.quadraCobranca = formatarString(associado.quadraCobranca)
    associado.loteCobranca = formatarString(associado.loteCobranca)
    associado.numeroCobranca = formatarString(associado.numeroCobranca)
    associado.complementoCobranca = formatarString(associado.complementoCobranca)
    associado.dataContrato = formatarData(associado.dataContrato)
    associado.dataInicioCarencia = formatarData(associado.dataInicioCarencia)
    associado.dataFimCarencia = formatarData(associado.dataFimCarencia)
    associado.dataPrimeiraParcela = formatarData(associado.dataPrimeiraParcela)
    associado.ultimoPagamento = formatarData(associado.ultimoPagamento)
    associado.ultimoMesPago = formatarData(associado.ultimoMesPago)
    associado.dataCancelamento = formatarData(associado.dataCancelamento)
    associado.dataQuitacao = formatarData(associado.dataQuitacao)
    associado.dataContratoAnterior = formatarData(associado.dataContratoAnterior)
    associado.ultimoMesPagoAnterior = formatarData(associado.ultimoMesPagoAnterior)
    associado.empresaAnterior = formatarString(associado.empresaAnterior)
    associado.observacao = formatarString(associado.observacao)
    associado.horarioCobranca = formatarData(associado.horarioCobranca)
    associado.createdBy = formatarString(associado.createdBy)
    associado.updatedBy = formatarString(associado.updatedBy)
  }
}
