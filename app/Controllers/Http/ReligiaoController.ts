import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Religiao from 'App/Models/Religiao'
import CreateReligiaoValidator from 'App/Validators/CreateReligiaoValidator'

export default class ReligiaoController {

    /**
     * Método para cadastrar religião.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ReligiaoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateReligiaoValidator)

            // Insere o registro no banco de dados.
            const religiao = await Religiao.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: religiao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar religião.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ReligiaoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a religião pelo id informado.
            const religiao = await Religiao.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateReligiaoValidator)

            // Atualiza o objeto com os dados novos.
            religiao.descricao = descricao
            religiao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await religiao.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: religiao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar religião.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ReligiaoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a religião pelo id informado.
            const religiao = await Religiao.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            religiao.ativo = !religiao.ativo
            religiao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await religiao.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${religiao.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: religiao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todas as religiões.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ReligiaoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as religiões existentes.
            const religioes = await Religiao.query()

            // Verifica se não foi retornado nenhum registro.
            if (religioes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: religioes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as religiões ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ReligiaoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as religiões ativos.
            const religioes = await Religiao.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (religioes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: religioes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a religião por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ReligiaoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a religião pelo id informado.
            const religiao = await Religiao.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: religiao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
