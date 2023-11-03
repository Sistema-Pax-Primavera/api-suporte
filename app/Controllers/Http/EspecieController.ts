import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Especie from 'App/Models/Especie'
import CreateEspecieValidator from 'App/Validators/CreateEspecieValidator'

export default class EspecieController {

    /**
     * Método para cadastrar espécie.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EspecieController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateEspecieValidator)

            // Insere o registro no banco de dados.
            const especie = await Especie.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: especie
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar espécie.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EspecieController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o espécie pelo id informado.
            const especie = await Especie.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateEspecieValidator)

            // Atualiza o objeto com os dados novos.
            especie.descricao = descricao
            especie.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await especie.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: especie
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar espécie.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EspecieController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a espécie pelo id informado.
            const especie = await Especie.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            especie.ativo = !especie.ativo
            especie.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await especie.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${especie.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: especie
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos as espécies.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EspecieController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as espécies existentes.
            const especies = await Especie.query()

            // Verifica se não foi retornado nenhum registro.
            if (especies.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: especies
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar as espécies ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EspecieController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as espécies ativas.
            const especies = await Especie.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (especies.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: especies
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar a espécie por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EspecieController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a espécie pelo id informado.
            const especie = await Especie.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: especie
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
