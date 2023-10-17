import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Fornecedor from 'App/Models/Fornecedor'
import CreateFornecedorValidator from 'App/Validators/CreateFornecedorValidator'

export default class FornecedorController {
    
    /**
     * Método para cadastrar fornecedor.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FornecedorController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateFornecedorValidator)

            // Insere o registro no banco de dados.
            const fornecedor = await Fornecedor
            .create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: fornecedor
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar fornecedor.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FornecedorController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o fornecedor pelo id informado.
            const fornecedor = await Fornecedor.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateFornecedorValidator)

            // Atualiza o objeto com os dados novos.
            fornecedor.descricao = descricao
            fornecedor.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await fornecedor.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: fornecedor
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar fornecedor.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FornecedorController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o fornecedor pelo id informado.
            const fornecedor = await Fornecedor.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            fornecedor.ativo = !fornecedor.ativo
            fornecedor.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await fornecedor.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${fornecedor.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: fornecedor
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os fornecedores.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FornecedorController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os fornecedores existentes.
            const fornecedores = await Fornecedor.query()

            // Verifica se não foi retornado nenhum registro.
            if (fornecedores.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: fornecedores
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os fornecedores ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FornecedorController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os fornecedores ativos.
            const fornecedores = await Fornecedor.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (fornecedores.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: fornecedores
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o fornecedor por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FornecedorController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o fornecedor pelo id informado.
            const fornecedor = await Fornecedor.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: fornecedor
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
