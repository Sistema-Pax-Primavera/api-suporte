import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import CategoriaSuporte from 'App/Models/CategoriaSuporte'
import CreateCategoriaSuporteValidator from 'App/Validators/CreateCategoriaSuporteValidator'

export default class CategoriaSuporteController {

    /**
     * Método para cadastrar categoria suporte.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaSuporteController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao, prioridade, setor } = await request.validate(CreateCategoriaSuporteValidator)

            // Insere o registro no banco de dados.
            const categoriaSuporte = await CategoriaSuporte.create({
                descricao, prioridade, setor,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: categoriaSuporte
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar categoria suporte.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaSuporteController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a categoria suporte pelo id informado.
            const categoriaSuporte = await CategoriaSuporte.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao, prioridade, setor } = await request.validate(CreateCategoriaSuporteValidator)

            // Atualiza o objeto com os dados novos.
            categoriaSuporte.descricao = descricao
            categoriaSuporte.prioridade = prioridade
            categoriaSuporte.setor = setor
            categoriaSuporte.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await categoriaSuporte.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: categoriaSuporte
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar categoria suporte.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaSuporteController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a categoria suporte pelo id informado.
            const categoriaSuporte = await CategoriaSuporte.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            categoriaSuporte.ativo = !categoriaSuporte.ativo
            categoriaSuporte.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await categoriaSuporte.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${categoriaSuporte.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: categoriaSuporte
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
     * @memberof CategoriaSuporteController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as categorias existentes.
            const categorias = await CategoriaSuporte.query()

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
     * @memberof CategoriaSuporteController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as categorias ativas.
            const categorias = await CategoriaSuporte.query().where('ativo', true)

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
     * Método para buscar a categoria suporte por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CategoriaSuporteController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a categoria suporte pelo id informado.
            const categoriaSuporte = await CategoriaSuporte.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: categoriaSuporte
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
