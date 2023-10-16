import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Situacao from 'App/Models/Situacao'
import CreateSituacaoValidator from 'App/Validators/CreateSituacaoValidator'

export default class SituacaoController {

    /**
     * Método para cadastrar situação.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SituacaoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateSituacaoValidator)

            // Insere o registro no banco de dados.
            const situacao = await Situacao.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: situacao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar situação.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SituacaoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o situação pelo id informado.
            const situacao = await Situacao.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateSituacaoValidator)

            // Atualiza o objeto com os dados novos.
            situacao.descricao = descricao
            situacao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await situacao.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: situacao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar situação.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SituacaoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a situação pelo id informado.
            const situacao = await Situacao.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            situacao.ativo = !situacao.ativo
            situacao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await situacao.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${situacao.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: situacao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos as situações.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SituacaoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as situações existentes.
            const situacoes = await Situacao.query()

            // Verifica se não foi retornado nenhum registro.
            if (situacoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: situacoes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as situações ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SituacaoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as situações ativas.
            const situacoes = await Situacao.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (situacoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: situacoes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a situação por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SituacaoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a situação pelo id informado.
            const situacao = await Situacao.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: situacao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
