import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import FormaPagamento from 'App/Models/FormaPagamento'
import CreateFormaPagamentoValidator from 'App/Validators/CreateFormaPagamentoValidator'

export default class FormaPagamentoController {

    /**
     * Método para cadastrar forma pagamento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FormaPagamentoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao, tipo } = await request.validate(CreateFormaPagamentoValidator)

            // Insere o registro no banco de dados.
            const formaPagamento = await FormaPagamento.create({
                descricao, tipo,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: formaPagamento
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar forma pagamento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FormaPagamentoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a forma pagamento pelo id informado.
            const formaPagamento = await FormaPagamento.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao, tipo } = await request.validate(CreateFormaPagamentoValidator)

            // Atualiza o objeto com os dados novos.
            formaPagamento.descricao = descricao
            formaPagamento.tipo = tipo
            formaPagamento.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await formaPagamento.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: formaPagamento
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar forma pagamento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FormaPagamentoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a forma pagamento pelo id informado.
            const formaPagamento = await FormaPagamento.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            formaPagamento.ativo = !formaPagamento.ativo
            formaPagamento.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await formaPagamento.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${formaPagamento.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: formaPagamento
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todas as formas de pagamento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FormaPagamentoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as formas de pagamento existentes.
            const formasPagamento = await FormaPagamento.query()

            // Verifica se não foi retornado nenhum registro.
            if (formasPagamento.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: formasPagamento
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar as formas de pagamento ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FormaPagamentoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as formas de pagamento ativas.
            const formasPagamento = await FormaPagamento.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (formasPagamento.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: formasPagamento
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar a forma pagamento por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FormaPagamentoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a forma pagamento pelo id informado.
            const formaPagamento = await FormaPagamento.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: formaPagamento
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
