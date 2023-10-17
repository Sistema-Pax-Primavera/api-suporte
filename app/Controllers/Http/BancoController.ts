import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Banco from 'App/Models/Banco'
import CreateBancoValidator from 'App/Validators/CreateBancoValidator'

export default class BancoController {

    /**
     * Método para cadastrar banco.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BancoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateBancoValidator)

            // Insere o registro no banco de dados.
            const banco = await Banco.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: banco
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar banco.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BancoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o banco pelo id informado.
            const banco = await Banco.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateBancoValidator)

            // Atualiza o objeto com os dados novos.
            banco.descricao = descricao
            banco.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await banco.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: banco
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar banco.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BancoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o banco pelo id informado.
            const banco = await Banco.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            banco.ativo = !banco.ativo
            banco.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await banco.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${banco.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: banco
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os bancos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BancoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os bancos existentes.
            const bancos = await Banco.query()

            // Verifica se não foi retornado nenhum registro.
            if (bancos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: bancos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os bancos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BancoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os bancos ativos.
            const bancos = await Banco.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (bancos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: bancos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o banco por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BancoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o banco pelo id informado.
            const banco = await Banco.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: banco
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
