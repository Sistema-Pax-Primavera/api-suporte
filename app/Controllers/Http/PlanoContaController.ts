import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import PlanoConta from 'App/Models/PlanoConta'
import CreatePlanoContaValidator from 'App/Validators/CreatePlanoContaValidator'

export default class PlanoContaController {

    /**
     * Método para cadastrar plano conta.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoContaController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {
            // Valida os campos informados.
            const {
                planoRaiz, descricao, codigo, tipo, nivel, visivel
            } = await request.validate(CreatePlanoContaValidator)

            // Insere o registro no banco de dados.
            const planoConta = await PlanoConta.create({
                planoRaiz, descricao, codigo, tipo, nivel, visivel,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: planoConta
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar plano conta.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoContaController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o plano conta pelo id informado.
            let planoConta = await PlanoConta.findOrFail(params.id)

            // Valida os campos informados.
            const { planoRaiz, descricao, codigo, tipo, nivel, visivel } = await request.validate(CreatePlanoContaValidator)

            // Atualiza o objeto com os dados novos.
            planoConta.planoRaiz = planoRaiz
            planoConta.descricao = descricao
            planoConta.codigo = codigo
            planoConta.tipo = tipo
            planoConta.nivel = nivel
            planoConta.visivel = visivel
            planoConta.updatedBy = auth.user?.nome ?? null


            // Persiste no banco o objeto atualizado.
            await planoConta.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: planoConta
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar plano conta.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoContaController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o plano conta pelo id informado.
            const planoConta = await PlanoConta.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            planoConta.ativo = !planoConta.ativo
            planoConta.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await planoConta.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${planoConta.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: planoConta
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos os planos de conta.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoContaController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os planos de conta existentes.
            const planoContas = await PlanoConta.query()

            // Verifica se não foi retornado nenhum registro.
            if (planoContas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: planoContas
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os planos de conta ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoContaController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os planos de conta ativos.
            const planoContas = await PlanoConta.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (planoContas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: planoContas
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar o plano conta por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof PlanoContaController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o plano conta pelo id informado.
            const planoConta = await PlanoConta.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: planoConta
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
