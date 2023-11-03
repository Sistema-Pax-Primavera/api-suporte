import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Parentesco from 'App/Models/Parentesco'
import CreateParentescoValidator from 'App/Validators/CreateParentescoValidator'

export default class ParentescoController {

    /**
     * Método para cadastrar parentesco.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParentescoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateParentescoValidator)

            // Insere o registro no banco de dados.
            const parentesco = await Parentesco.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: parentesco
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar parentesco.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParentescoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o parentesco pelo id informado.
            const parentesco = await Parentesco.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateParentescoValidator)

            // Atualiza o objeto com os dados novos.
            parentesco.descricao = descricao
            parentesco.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await parentesco.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: parentesco
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar parentesco.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParentescoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o parentesco pelo id informado.
            const parentesco = await Parentesco.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            parentesco.ativo = !parentesco.ativo
            parentesco.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await parentesco.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${parentesco.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: parentesco
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos os parentescos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParentescoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os parentescos existentes.
            const parentescos = await Parentesco.query()

            // Verifica se não foi retornado nenhum registro.
            if (parentescos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: parentescos
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os parentescos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParentescoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os parentescos ativos.
            const parentescos = await Parentesco.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (parentescos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: parentescos
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar o parentesco por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParentescoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o parentesco pelo id informado.
            const parentesco = await Parentesco.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: parentesco
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
