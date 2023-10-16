import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Regiao from 'App/Models/Regiao'
import CreateRegiaoValidator from 'App/Validators/CreateRegiaoValidator'

export default class RegiaoController {

    /**
     * Método para cadastrar região.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateRegiaoValidator)

            // Insere o registro no banco de dados.
            const regiao = await Regiao.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: regiao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar região.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o região pelo id informado.
            const regiao = await Regiao.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateRegiaoValidator)

            // Atualiza o objeto com os dados novos.
            regiao.descricao = descricao
            regiao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await regiao.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: regiao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar região.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o região pelo id informado.
            const regiao = await Regiao.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            regiao.ativo = !regiao.ativo
            regiao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await regiao.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${regiao.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: regiao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os regiãos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os regiãos existentes.
            const regiaos = await Regiao.query()

            // Verifica se não foi retornado nenhum registro.
            if (regiaos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: regiaos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os regiãos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os regiãos ativos.
            const regiaos = await Regiao.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (regiaos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: regiaos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o região por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof RegiaoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o região pelo id informado.
            const regiao = await Regiao.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: regiao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
