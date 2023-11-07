import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Item from 'App/Models/Item'
import CreateItemValidator from 'App/Validators/CreateItemValidator'

export default class ItemController {
    
    /**
     * Método para cadastrar item.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ItemController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { categoriaItemId, descricao } = await request.validate(CreateItemValidator)

            // Insere o registro no banco de dados.
            const item = await Item
            .create({
                categoriaItemId, descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: item
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar item.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ItemController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o item pelo id informado.
            const item = await Item.findOrFail(params.id)

            // Valida os campos informados.
            const { categoriaItemId, descricao } = await request.validate(CreateItemValidator)

            // Atualiza o objeto com os dados novos.
            item.categoriaItemId = categoriaItemId
            item.descricao = descricao
            item.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await item.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: item
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar item.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ItemController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o item pelo id informado.
            const item = await Item.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            item.ativo = !item.ativo
            item.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await item.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${item.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: item
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos os itens.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ItemController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os itens existentes.
            const itens = await Item.query()

            // Verifica se não foi retornado nenhum registro.
            if (itens.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: itens
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os itens ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ItemController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os itens ativos.
            const itens = await Item.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (itens.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: itens
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar o item por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ItemController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o item pelo id informado.
            const item = await Item.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: item
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
