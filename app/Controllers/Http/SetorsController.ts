import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Setor from 'App/Models/Setor'
import CreateSetorValidator from 'App/Validators/CreateSetorValidator'

export default class SetorController {
    
    /**
     * Método para cadastrar setor.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SetorController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateSetorValidator)

            // Insere o registro no banco de dados.
            const setor = await Setor
            .create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: setor
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar setor.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SetorController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o setor pelo id informado.
            const setor = await Setor.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateSetorValidator)

            // Atualiza o objeto com os dados novos.
            setor.descricao = descricao
            setor.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await setor.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: setor
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar setor.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SetorController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o setor pelo id informado.
            const setor = await Setor.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            setor.ativo = !setor.ativo
            setor.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await setor.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${setor.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: setor
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os setors.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SetorController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os setors existentes.
            const setors = await Setor.query()

            // Verifica se não foi retornado nenhum registro.
            if (setors.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: setors
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os setors ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SetorController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os setors ativos.
            const setors = await Setor.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (setors.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: setors
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o setor por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SetorController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o setor pelo id informado.
            const setor = await Setor.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: setor
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
