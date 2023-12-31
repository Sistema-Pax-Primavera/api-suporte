import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Modulo from 'App/Models/Modulo'
import CreateModuloValidator from 'App/Validators/CreateModuloValidator'

export default class ModuloController {

    /**
     * Método para cadastrar módulo.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ModuloController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateModuloValidator)

            // Insere o registro no banco de dados.
            const modulo = await Modulo.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: modulo
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar módulo.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ModuloController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o módulo pelo id informado.
            const modulo = await Modulo.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateModuloValidator)

            // Atualiza o objeto com os dados novos.
            modulo.merge({
                descricao: descricao,
                updatedBy: auth.user?.nome
            })

            // Persiste no banco o objeto atualizado.
            await modulo.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: modulo
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar módulo.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ModuloController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o módulo pelo id informado.
            const modulo = await Modulo.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            modulo.merge({
                ativo: !modulo.ativo,
                updatedBy: auth.user?.nome
            })

            // Persiste no banco o objeto atualizado.
            await modulo.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${modulo.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: modulo
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos os módulos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ModuloController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os módulos existentes.
            const modulos = await Modulo.query()
                .orderBy('descricao', 'asc')

            // Verifica se não foi retornado nenhum registro.
            if (modulos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: modulos
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os módulos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ModuloController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os módulos ativos.
            const modulos = await Modulo.query()
                .where('ativo', true)
                .orderBy('descricao', 'asc')

            // Verifica se não foi retornado nenhum registro.
            if (modulos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: modulos
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar o módulo por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ModuloController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o módulo pelo id informado.
            const modulo = await Modulo.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: modulo
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os módulos ativos por descricao.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ModuloController
     */
    public async buscarPorDescricao({ response, params }: HttpContextContract): Promise<any> {
        try {

            // Converte a string para o formato aceito.
            const descricao = params.descricao.replace('%20', ' ').toLowerCase()

            // Busca o módulo pela descrição informada.
            const modulo = await Modulo.query()
                .where('ativo', true)
                .andWhereILike('descricao', `%${descricao}%`)
                .orderBy('descricao', 'asc')

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: modulo
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
