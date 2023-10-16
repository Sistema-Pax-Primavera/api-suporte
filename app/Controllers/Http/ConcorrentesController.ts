import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Concorrente from 'App/Models/Concorrente'
import CreateConcorrenteValidator from 'App/Validators/CreateConcorrenteValidator'

export default class ConcorrenteController {

    /**
    * Método para cadastrar concorrente.
    *
    * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
    * @return {*} 
    * @memberof ConcorrenteController
    */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateConcorrenteValidator)

            // Insere o registro no banco de dados.
            const concorrente = await Concorrente.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: concorrente
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar concorrente.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ConcorrenteController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a concorrente pelo id informado.
            const concorrente = await Concorrente.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateConcorrenteValidator)

            // Atualiza o objeto com os dados novos.
            concorrente.descricao = descricao
            concorrente.updatedBy = auth.user?.nome ?? null


            // Persiste no banco o objeto atualizado.
            await concorrente.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: concorrente
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar concorrente.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ConcorrenteController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a concorrente pelo id informado.
            const concorrente = await Concorrente.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            concorrente.ativo = !concorrente.ativo
            concorrente.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await concorrente.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${concorrente.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: concorrente
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todas as concorrentes.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ConcorrenteController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as concorrentes existentes.
            const concorrentes = await Concorrente.query()

            // Verifica se não foi retornado nenhum registro.
            if (concorrentes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: concorrentes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as concorrentes ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ConcorrenteController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as concorrentes ativas.
            const concorrentes = await Concorrente.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (concorrentes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: concorrentes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a concorrente por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ConcorrenteController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a concorrente pelo id informado.
            const concorrente = await Concorrente.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: concorrente
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
