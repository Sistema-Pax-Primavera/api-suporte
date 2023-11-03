import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import SubTipoAtendimento from 'App/Models/SubTipoAtendimento'
import CreateSubTipoAtendimentoValidator from 'App/Validators/CreateSubTipoAtendimentoValidator'

export default class SubTipoAtendimentoController {

    /**
     * Método para cadastrar o sub tipo atendimento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubTipoAtendimentoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { tipoAtendimentoId, descricao } = await request.validate(CreateSubTipoAtendimentoValidator)

            // Insere o registro no banco de dados.
            const subTipoAtendimento = await SubTipoAtendimento.create({
                tipoAtendimentoId, descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: subTipoAtendimento
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar sub tipo atendimento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubTipoAtendimentoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o sub tipo atendimento pelo id informado.
            const subTipoAtendimento = await SubTipoAtendimento.findOrFail(params.id)

            // Valida os campos informados.
            const { tipoAtendimentoId, descricao } = await request.validate(CreateSubTipoAtendimentoValidator)

            // Atualiza o objeto com os dados novos.
            subTipoAtendimento.tipoAtendimentoId = tipoAtendimentoId
            subTipoAtendimento.descricao = descricao
            subTipoAtendimento.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await subTipoAtendimento.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: subTipoAtendimento
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar sub tipo atendimento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubTipoAtendimentoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o sub tipo atendimento pelo id informado.
            const subTipoAtendimento = await SubTipoAtendimento.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            subTipoAtendimento.ativo = !subTipoAtendimento.ativo
            subTipoAtendimento.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await subTipoAtendimento.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${subTipoAtendimento.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: subTipoAtendimento
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos os sub tipos atendimentos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubTipoAtendimentoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os sub tipos atendimentos existentes.
            const subTipoAtendimentos = await SubTipoAtendimento.query()

            // Verifica se não foi retornado nenhum registro.
            if (subTipoAtendimentos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: subTipoAtendimentos
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os sub tipos atendimentos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubTipoAtendimentoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os sub tipos atendimentos ativos.
            const subTipoAtendimentos = await SubTipoAtendimento.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (subTipoAtendimentos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: subTipoAtendimentos
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar o sub tipo atendimento por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof SubTipoAtendimentoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o sub tipo atendimento pelo id informado.
            const subTipoAtendimento = await SubTipoAtendimento.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: subTipoAtendimento
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
