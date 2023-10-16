import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Adicional from 'App/Models/Adicional'
import CreateAdicionalValidator from 'App/Validators/CreateAdicionalValidator'

export default class AdicionalController {
    
    /**
     * Método para cadastrar adicional.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AdicionalController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao, pet, porte, resgate } = await request.validate(CreateAdicionalValidator)

            // Insere o registro no banco de dados.
            const adicional = await Adicional
            .create({
                descricao, pet, porte, resgate,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: adicional
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar adicional.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AdicionalController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o adicional pelo id informado.
            const adicional = await Adicional.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao, pet, porte, resgate } = await request.validate(CreateAdicionalValidator)

            // Atualiza o objeto com os dados novos.
            adicional.descricao = descricao
            adicional.pet = pet
            adicional.porte = porte
            adicional.resgate = resgate
            adicional.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await adicional.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: adicional
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar adicional.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AdicionalController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o adicional pelo id informado.
            const adicional = await Adicional.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            adicional.ativo = !adicional.ativo
            adicional.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await adicional.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${adicional.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: adicional
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os adicionais.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AdicionalController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os adicionais existentes.
            const adicionais = await Adicional.query()

            // Verifica se não foi retornado nenhum registro.
            if (adicionais.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: adicionais
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os adicionais ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AdicionalController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os adicionais ativos.
            const adicionais = await Adicional.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (adicionais.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: adicionais
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o adicional por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AdicionalController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o adicional pelo id informado.
            const adicional = await Adicional.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: adicional
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
