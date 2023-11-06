import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import UnidadeFinanceira from 'App/Models/UnidadeFinanceira'
import CreateUnidadeFinanceiraValidator from 'App/Validators/CreateUnidadeFinanceiraValidator'

export default class UnidadeFinanceiraController {

    /**
     * Método para cadastrar unidade financeira.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeFinanceiraController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateUnidadeFinanceiraValidator)

            // Insere o registro no banco de dados.
            const unidadeFinanceira = await UnidadeFinanceira.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: unidadeFinanceira
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar unidade financeira.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeFinanceiraController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o unidade financeira pelo id informado.
            const unidadeFinanceira = await UnidadeFinanceira.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateUnidadeFinanceiraValidator)

            // Atualiza o objeto com os dados novos.
            unidadeFinanceira.descricao = descricao
            unidadeFinanceira.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await unidadeFinanceira.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: unidadeFinanceira
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar unidade financeira.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeFinanceiraController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a unidade financeira pelo id informado.
            const unidadeFinanceira = await UnidadeFinanceira.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            unidadeFinanceira.ativo = !unidadeFinanceira.ativo
            unidadeFinanceira.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await unidadeFinanceira.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${unidadeFinanceira.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: unidadeFinanceira
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos as unidades financeiras.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeFinanceiraController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as unidades financeiras existentes.
            const unidadesFinanceiras = await UnidadeFinanceira.query()

            // Verifica se não foi retornado nenhum registro.
            if (unidadesFinanceiras.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: unidadesFinanceiras
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar as unidades financeiras ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeFinanceiraController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as unidades financeiras ativas.
            const unidadesFinanceiras = await UnidadeFinanceira.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (unidadesFinanceiras.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: unidadesFinanceiras
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar a unidade financeira por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeFinanceiraController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a unidade financeira pelo id informado.
            const unidadeFinanceira = await UnidadeFinanceira.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: unidadeFinanceira
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
