import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Conta from 'App/Models/Conta'
import CreateContaValidator from 'App/Validators/CreateContaValidator'

export default class ContaController {

    /**
    * Método para cadastrar conta.
    *
    * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
    * @return {*} 
    * @memberof ContaController
    */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                descricao, unidadeId, bancoId, agencia, digitoAgencia,
                conta, digitoConta, tipoContaBancaria, tipo
            } = await request.validate(CreateContaValidator)

            // Insere o registro no banco de dados.
            const contaNova = await Conta.create({
                descricao, unidadeId, bancoId, agencia, digitoAgencia,
                conta, digitoConta, tipoContaBancaria, tipo,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: contaNova
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar conta.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContaController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a conta pelo id informado.
            let contaAntiga = await Conta.findOrFail(params.id)

            // Valida os campos informados.
            const {
                descricao, unidadeId, bancoId, agencia, digitoAgencia,
                conta, digitoConta, tipoContaBancaria, tipo
            } = await request.validate(CreateContaValidator)

            // Atualiza o objeto com os dados novos.
            contaAntiga = {
                ...contaAntiga,
                descricao, unidadeId, bancoId, agencia, digitoAgencia,
                conta, digitoConta, tipoContaBancaria, tipo,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await contaAntiga.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: conta
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar conta.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContaController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a conta pelo id informado.
            const conta = await Conta.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            conta.ativo = !conta.ativo
            conta.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await conta.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${conta.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: conta
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todas as contas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContaController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as contas existentes.
            const contas = await Conta.query()

            // Verifica se não foi retornado nenhum registro.
            if (contas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: contas
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as contas ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContaController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as contas ativas.
            const contas = await Conta.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (contas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: contas
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a conta por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContaController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a conta pelo id informado.
            const conta = await Conta.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: conta
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
