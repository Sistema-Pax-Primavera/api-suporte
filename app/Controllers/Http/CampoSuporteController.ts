import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import CampoSuporte from 'App/Models/CampoSuporte'
import CreateCampoSuporteValidator from 'App/Validators/CreateCampoSuporteValidator'

export default class CampoSuporteController {

    /**
     * Método para cadastrar campo.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CampoSuporteController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { categoriaId, descricao, tipo, opcoes } = await request.validate(CreateCampoSuporteValidator)

            // Insere o registro no banco de dados.
            const campoNovo = await CampoSuporte.create({
                categoriaId, descricao, tipo, opcoes,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: campoNovo
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar campo.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CampoSuporteController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o campo pelo id informado.
            const campoAntigo = await CampoSuporte.findOrFail(params.id)

            // Valida os campos informados.
            const { categoriaId, descricao, tipo, opcoes } = await request.validate(CreateCampoSuporteValidator)

            // Atualiza o objeto com os dados novos.
            campoAntigo.categoriaId = categoriaId
            campoAntigo.descricao = descricao
            campoAntigo.tipo = tipo
            campoAntigo.opcoes = opcoes
            campoAntigo.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await campoAntigo.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: campoAntigo
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar campo.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CampoSuporteController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o campo pelo id informado.
            const campo = await CampoSuporte.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            campo.ativo = !campo.ativo
            campo.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await campo.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${campo.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: campo
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos os campos
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CampoSuporteController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os campos existentes.
            const campos = await CampoSuporte.query()

            // Verifica se não foi retornado nenhum registro.
            if (campos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: campos
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os campos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CampoSuporteController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os campos ativos.
            const campos = await CampoSuporte.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (campos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: campos
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar o campo por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CampoSuporteController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o campo pelo id informado.
            const campo = await CampoSuporte.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: campo
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
