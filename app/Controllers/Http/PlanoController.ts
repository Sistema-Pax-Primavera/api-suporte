import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Plano from 'App/Models/Plano'
import CreatePlanoValidator from 'App/Validators/CreatePlanoValidator'

export default class PlanoController {

    /**
     * Método para cadastrar plano.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreatePlanoValidator)

            // Insere o registro no banco de dados.
            const plano = await Plano.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: plano
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar plano.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o plano pelo id informado.
            const plano = await Plano.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreatePlanoValidator)

            // Atualiza o objeto com os dados novos.
            plano.descricao = descricao
            plano.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await plano.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: plano
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar plano.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o plano pelo id informado.
            const plano = await Plano.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            plano.ativo = !plano.ativo
            plano.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await plano.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${plano.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: plano
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os planos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os planos existentes.
            const planos = await Plano.query()

            // Verifica se não foi retornado nenhum registro.
            if (planos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: planos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os planos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os planos ativos.
            const planos = await Plano.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (planos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: planos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o plano por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o plano pelo id informado.
            const plano = await Plano.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: plano
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
