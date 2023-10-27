import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import RegiaoBairro from 'App/Models/RegiaoBairro'
import CreateRegiaoBairroValidator from 'App/Validators/CreateRegiaoBairroValidator'

export default class RegiaoBairroController {

    /**
     * Método para cadastrar região bairro.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoBairroController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateRegiaoBairroValidator)

            // Insere o registro no banco de dados.
            const regiaoBairro = await RegiaoBairro.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: regiaoBairro
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar região bairro.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoBairroController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a região bairro pelo id informado.
            const regiaoBairro = await RegiaoBairro.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateRegiaoBairroValidator)

            // Atualiza o objeto com os dados novos.
            regiaoBairro.descricao = descricao
            regiaoBairro.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await regiaoBairro.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: regiaoBairro
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar região bairro.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoBairroController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a região bairro pelo id informado.
            const regiaoBairro = await RegiaoBairro.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            regiaoBairro.ativo = !regiaoBairro.ativo
            regiaoBairro.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await regiaoBairro.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${regiaoBairro.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: regiaoBairro
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todas as regiões.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoBairroController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as regiões existentes.
            const regioes = await RegiaoBairro.query()

            // Verifica se não foi retornado nenhum registro.
            if (regioes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: regioes
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar as regiões ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoBairroController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as regiões ativas.
            const regioes = await RegiaoBairro.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (regioes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: regioes
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar a região bairro por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoBairroController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a região bairro pelo id informado.
            const regiaoBairro = await RegiaoBairro.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: regiaoBairro
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
