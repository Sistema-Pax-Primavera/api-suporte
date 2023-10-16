import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import EstadoCivil from 'App/Models/EstadoCivil'
import CreateEstadoCivilValidator from 'App/Validators/CreateEstadoCivilValidator'

export default class EstadoCivilController {

    /**
     * Método para cadastrar estado civil.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EstadoCivilController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateEstadoCivilValidator)

            // Insere o registro no banco de dados.
            const estadoCivi = await EstadoCivil.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: estadoCivi
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar estado civil.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EstadoCivilController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o estado civil pelo id informado.
            const estadoCivi = await EstadoCivil.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateEstadoCivilValidator)

            // Atualiza o objeto com os dados novos.
            estadoCivi.descricao = descricao
            estadoCivi.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await estadoCivi.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: estadoCivi
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar estado civil.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EstadoCivilController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o estado civil pelo id informado.
            const estadoCivi = await EstadoCivil.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            estadoCivi.ativo = !estadoCivi.ativo
            estadoCivi.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await estadoCivi.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${estadoCivi.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: estadoCivi
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os estados civis.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EstadoCivilController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os estados civis existentes.
            const estadosCivis = await EstadoCivil.query()

            // Verifica se não foi retornado nenhum registro.
            if (estadosCivis.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: estadosCivis
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os estados civis ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EstadoCivilController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os estados civis ativos.
            const estadosCivis = await EstadoCivil.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (estadosCivis.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: estadosCivis
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o estado civil por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof EstadoCivilController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o estado civil pelo id informado.
            const estadoCivi = await EstadoCivil.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: estadoCivi
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
