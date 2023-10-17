import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import SubCategoriaHistorico from 'App/Models/SubCategoriaHistorico'
import CreateSubCategoriaHistoricoValidator from 'App/Validators/CreateSubCategoriaHistoricoValidator'

export default class SubCategoriaHistoricoController {

    /**
     * Método para cadastrar sub categoria histórico.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubCategoriaHistoricoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateSubCategoriaHistoricoValidator)

            // Insere o registro no banco de dados.
            const subCategoriaHistorico = await SubCategoriaHistorico.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: subCategoriaHistorico
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar sub categoria histórico.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubCategoriaHistoricoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a sub categoria histórico pelo id informado.
            const subCategoriaHistorico = await SubCategoriaHistorico.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateSubCategoriaHistoricoValidator)

            // Atualiza o objeto com os dados novos.
            subCategoriaHistorico.descricao = descricao
            subCategoriaHistorico.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await subCategoriaHistorico.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: subCategoriaHistorico
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar sub categoria histórico.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubCategoriaHistoricoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a sub categoria histórico pelo id informado.
            const subCategoriaHistorico = await SubCategoriaHistorico.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            subCategoriaHistorico.ativo = !subCategoriaHistorico.ativo
            subCategoriaHistorico.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await subCategoriaHistorico.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${subCategoriaHistorico.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: subCategoriaHistorico
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todas as sub categorias.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubCategoriaHistoricoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as sub categorias existentes.
            const subCategorias = await SubCategoriaHistorico.query()

            // Verifica se não foi retornado nenhum registro.
            if (subCategorias.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: subCategorias
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as sub categorias ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubCategoriaHistoricoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as sub categorias ativas.
            const subCategorias = await SubCategoriaHistorico.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (subCategorias.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: subCategorias
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a sub categoria histórico por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubCategoriaHistoricoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a sub categoria histórico pelo id informado.
            const subCategoriaHistorico = await SubCategoriaHistorico.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: subCategoriaHistorico
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
