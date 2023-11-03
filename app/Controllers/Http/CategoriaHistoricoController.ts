import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import CategoriaHistorico from 'App/Models/CategoriaHistorico'
import CreateCategoriaHistoricoValidator from 'App/Validators/CreateCategoriaHistoricoValidator'

export default class CategoriaHistoricoController {

    /**
     * Método para cadastrar categoria histórico.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaHistoricoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateCategoriaHistoricoValidator)

            // Insere o registro no banco de dados.
            const categoriaHistorico = await CategoriaHistorico.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: categoriaHistorico
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar categoria histórico.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaHistoricoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a categoria histórico pelo id informado.
            const categoriaHistorico = await CategoriaHistorico.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateCategoriaHistoricoValidator)

            // Atualiza o objeto com os dados novos.
            categoriaHistorico.descricao = descricao
            categoriaHistorico.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await categoriaHistorico.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: categoriaHistorico
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar categoria histórico.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaHistoricoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a categoria histórico pelo id informado.
            const categoriaHistorico = await CategoriaHistorico.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            categoriaHistorico.ativo = !categoriaHistorico.ativo
            categoriaHistorico.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await categoriaHistorico.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${categoriaHistorico.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: categoriaHistorico
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todas as categorias.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaHistoricoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as categorias existentes.
            const categorias = await CategoriaHistorico.query()

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
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar as categorias ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaHistoricoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as categorias ativas.
            const categorias = await CategoriaHistorico.query().where('ativo', true)

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
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar a categoria histórico por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaHistoricoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a categoria histórico pelo id informado.
            const categoriaHistorico = await CategoriaHistorico.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: categoriaHistorico
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
