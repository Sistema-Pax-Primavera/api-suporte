import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import CategoriaItem from 'App/Models/CategoriaItem'
import CreateCategoriaItemValidator from 'App/Validators/CreateCategoriaItemValidator'

export default class CategoriaItemController {

    /**
     * Método para cadastrar categoria item.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaItemController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateCategoriaItemValidator)

            // Insere o registro no banco de dados.
            const categoriaItem = await CategoriaItem.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: categoriaItem
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar categoria item.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaItemController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a categoria item pelo id informado.
            const categoriaItem = await CategoriaItem.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateCategoriaItemValidator)

            // Atualiza o objeto com os dados novos.
            categoriaItem.descricao = descricao
            categoriaItem.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await categoriaItem.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: categoriaItem
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar categoria item.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaItemController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a categoria item pelo id informado.
            const categoriaItem = await CategoriaItem.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            categoriaItem.ativo = !categoriaItem.ativo
            categoriaItem.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await categoriaItem.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${categoriaItem.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: categoriaItem
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todas as categorias.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaItemController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as categorias existentes.
            const categorias = await CategoriaItem.query()

            // Verifica se não foi retornado nenhum registro.
            if (categorias.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: categorias
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as categorias ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaItemController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as categorias ativas.
            const categorias = await CategoriaItem.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (categorias.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: categorias
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a categoria item por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaItemController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a categoria item pelo id informado.
            const categoriaItem = await CategoriaItem.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: categoriaItem
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
