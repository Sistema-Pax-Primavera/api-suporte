import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Funcao from 'App/Models/Funcao'
import CreateFuncaoValidator from 'App/Validators/CreateFuncaoValidator'

export default class FuncaoController {

    /**
     * Método para cadastrar função.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateFuncaoValidator)

            // Insere o registro no banco de dados.
            const funcao = await Funcao.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: funcao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar função.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o função pelo id informado.
            const funcao = await Funcao.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateFuncaoValidator)

            // Atualiza o objeto com os dados novos.
            funcao.descricao = descricao
            funcao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await funcao.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: funcao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar função.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a função pelo id informado.
            const funcao = await Funcao.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            funcao.ativo = !funcao.ativo
            funcao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await funcao.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${funcao.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: funcao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos as funções.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as funções existentes.
            const funcoes = await Funcao.query()

            // Verifica se não foi retornado nenhum registro.
            if (funcoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: funcoes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as funções ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as funções ativos.
            const funcoes = await Funcao.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (funcoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: funcoes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a função por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a função pelo id informado.
            const funcao = await Funcao.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: funcao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
