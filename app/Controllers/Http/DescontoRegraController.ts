import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import DescontoRegra from 'App/Models/DescontoRegra'
import CreateDescontoRegraValidator from 'App/Validators/CreateDescontoRegraValidator'

export default class DescontoRegraController {

    /**
     * Método para cadastrar desconto.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DescontoRegraController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { tipo, quantidade, operador, desconto } = await request.validate(CreateDescontoRegraValidator)

            // Insere o registro no banco de dados.
            const descontoNovo = await DescontoRegra.create({
                tipo, quantidade, operador, desconto,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: descontoNovo
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar desconto.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DescontoRegraController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o desconto pelo id informado.
            const descontoAntigo = await DescontoRegra.findOrFail(params.id)

            // Valida os campos informados.
            const { tipo, quantidade, operador, desconto } = await request.validate(CreateDescontoRegraValidator)

            // Atualiza o objeto com os dados novos.
            descontoAntigo.tipo = tipo
            descontoAntigo.quantidade = quantidade
            descontoAntigo.operador = operador
            descontoAntigo.desconto = desconto
            descontoAntigo.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await descontoAntigo.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: descontoAntigo
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar desconto.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DescontoRegraController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o desconto pelo id informado.
            const desconto = await DescontoRegra.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            desconto.ativo = !desconto.ativo
            desconto.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await desconto.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${desconto.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: desconto
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os descontos
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DescontoRegraController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os descontos existentes.
            const descontos = await DescontoRegra.query()

            // Verifica se não foi retornado nenhum registro.
            if (descontos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: descontos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os descontos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DescontoRegraController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os descontos ativos.
            const descontos = await DescontoRegra.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (descontos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: descontos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o desconto por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DescontoRegraController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o desconto pelo id informado.
            const desconto = await DescontoRegra.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: desconto
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
