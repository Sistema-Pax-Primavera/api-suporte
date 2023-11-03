import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Raca from 'App/Models/Raca'
import CreateRacaValidator from 'App/Validators/CreateRacaValidator'

export default class RacaController {

    /**
     * Método para cadastrar raça.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RacaController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao, especieId } = await request.validate(CreateRacaValidator)

            // Insere o registro no banco de dados.
            const raca = await Raca.create({
                descricao, especieId,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: raca
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar raça.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RacaController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o raça pelo id informado.
            const raca = await Raca.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao, especieId } = await request.validate(CreateRacaValidator)

            // Atualiza o objeto com os dados novos.
            raca.descricao = descricao
            raca.especieId = especieId
            raca.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await raca.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: raca
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar raça.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RacaController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a raça pelo id informado.
            const raca = await Raca.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            raca.ativo = !raca.ativo
            raca.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await raca.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${raca.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: raca
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos as raças.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RacaController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as raças existentes.
            const racas = await Raca.query()

            // Verifica se não foi retornado nenhum registro.
            if (racas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: racas
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar as raças ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RacaController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as raças ativas.
            const racas = await Raca.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (racas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: racas
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar a raça por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RacaController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a raça pelo id informado.
            const raca = await Raca.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: raca
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
