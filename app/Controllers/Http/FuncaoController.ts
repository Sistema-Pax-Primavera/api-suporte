import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Funcao from 'App/Models/Funcao'
import CreateFuncaoValidator from 'App/Validators/CreateFuncaoValidator'

export default class FuncaoController {

    /**
     * Método para cadastrar função.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateFuncaoValidator)

            // Insere o registro no banco de dados.
            const modulo = await Funcao.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: modulo
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar função.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o função pelo id informado.
            const modulo = await Funcao.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateFuncaoValidator)

            // Atualiza o objeto com os dados novos.
            modulo.descricao = descricao
            modulo.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await modulo.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: modulo
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar função.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o função pelo id informado.
            const modulo = await Funcao.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            modulo.ativo = !modulo.ativo
            modulo.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await modulo.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${modulo.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: modulo
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os funçãos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os funçãos existentes.
            const modulos = await Funcao.query()

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
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os funçãos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os funçãos ativos.
            const modulos = await Funcao.query().where('ativo', true)

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
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o função por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o função pelo id informado.
            const modulo = await Funcao.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: modulo
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
