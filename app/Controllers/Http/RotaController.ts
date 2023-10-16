import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Rota from 'App/Models/Rota'
import CreateRotaValidator from 'App/Validators/CreateRotaValidator'

export default class RotaController {

    /**
    * Método para cadastrar rota.
    *
    * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
    * @return {*} 
    * @memberof RotaController
    */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                descricao, unidadeId, cobradorId
            } = await request.validate(CreateRotaValidator)

            // Insere o registro no banco de dados.
            const rota = await Rota.create({
                descricao, unidadeId, cobradorId,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: rota
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar rota.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RotaController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a rota pelo id informado.
            let rota = await Rota.findOrFail(params.id)

            // Valida os campos informados.
            const {
                descricao, unidadeId, cobradorId
            } = await request.validate(CreateRotaValidator)

            // Atualiza o objeto com os dados novos.
            rota = {
                ...rota,
                descricao, unidadeId, cobradorId,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await rota.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: rota
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar rota.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RotaController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a rota pelo id informado.
            const rota = await Rota.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            rota.ativo = !rota.ativo
            rota.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await rota.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${rota.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: rota
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todas as rotas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RotaController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as rotas existentes.
            const rotas = await Rota.query()

            // Verifica se não foi retornado nenhum registro.
            if (rotas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: rotas
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as rotas ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RotaController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as rotas ativas.
            const rotas = await Rota.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (rotas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: rotas
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a rota por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RotaController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a rota pelo id informado.
            const rota = await Rota.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: rota
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
