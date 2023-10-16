import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import TipoAtendimento from 'App/Models/TipoAtendimento'
import CreateTipoAtendimentoValidator from 'App/Validators/CreateTipoAtendimentoValidator'

export default class TipoAtendimentoController {

    /**
     * Método para cadastrar tipo atendimento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoAtendimentoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateTipoAtendimentoValidator)

            // Insere o registro no banco de dados.
            const tipoAtendimento = await TipoAtendimento.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: tipoAtendimento
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar tipo atendimento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoAtendimentoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o tipo atendimento pelo id informado.
            const tipoAtendimento = await TipoAtendimento.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateTipoAtendimentoValidator)

            // Atualiza o objeto com os dados novos.
            tipoAtendimento.descricao = descricao
            tipoAtendimento.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await tipoAtendimento.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: tipoAtendimento
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar tipo atendimento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoAtendimentoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o tipo atendimento pelo id informado.
            const tipoAtendimento = await TipoAtendimento.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            tipoAtendimento.ativo = !tipoAtendimento.ativo
            tipoAtendimento.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await tipoAtendimento.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${tipoAtendimento.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: tipoAtendimento
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os tipos atendimentos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoAtendimentoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os tipos atendimentos existentes.
            const tipoAtendimentos = await TipoAtendimento.query()

            // Verifica se não foi retornado nenhum registro.
            if (tipoAtendimentos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: tipoAtendimentos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os tipos atendimentos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoAtendimentoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os tipos atendimentos ativos.
            const tipoAtendimentos = await TipoAtendimento.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (tipoAtendimentos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: tipoAtendimentos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o tipo atendimento por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoAtendimentoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o tipo atendimento pelo id informado.
            const tipoAtendimento = await TipoAtendimento.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: tipoAtendimento
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
