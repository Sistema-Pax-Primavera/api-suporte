import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import TipoCaixa from 'App/Models/TipoCaixa'
import CreateTipoCaixaValidator from 'App/Validators/CreateTipoCaixaValidator'

export default class TipoCaixaController {

    /**
     * Método para cadastrar tipo caixa.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoCaixaController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateTipoCaixaValidator)

            // Insere o registro no banco de dados.
            const tipoCaixa = await TipoCaixa.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: tipoCaixa
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar tipo caixa.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoCaixaController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o tipo caixa pelo id informado.
            const tipoCaixa = await TipoCaixa.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateTipoCaixaValidator)

            // Atualiza o objeto com os dados novos.
            tipoCaixa.descricao = descricao
            tipoCaixa.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await tipoCaixa.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: tipoCaixa
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar tipo caixa.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoCaixaController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o tipo caixa pelo id informado.
            const tipoCaixa = await TipoCaixa.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            tipoCaixa.ativo = !tipoCaixa.ativo
            tipoCaixa.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await tipoCaixa.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${tipoCaixa.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: tipoCaixa
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os tipos caixas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoCaixaController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os tipos caixas existentes.
            const tipoCaixas = await TipoCaixa.query()

            // Verifica se não foi retornado nenhum registro.
            if (tipoCaixas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: tipoCaixas
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os tipos caixas ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoCaixaController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os tipos caixas ativos.
            const tipoCaixas = await TipoCaixa.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (tipoCaixas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: tipoCaixas
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o tipo caixa por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TipoCaixaController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o tipo caixa pelo id informado.
            const tipoCaixa = await TipoCaixa.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: tipoCaixa
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
