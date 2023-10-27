import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Bairro from 'App/Models/Bairro'
import CreateBairroValidator from 'App/Validators/CreateBairroValidator'

export default class BairroController {

    /**
     * Método para cadastrar bairro.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BairroController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { municipioId, regiaoBairroId, descricao } = await request.validate(CreateBairroValidator)

            // Insere o registro no banco de dados.
            const bairro = await Bairro.create({
                municipioId, regiaoBairroId, descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: bairro
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar bairro.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BairroController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o bairro pelo id informado.
            const bairro = await Bairro.findOrFail(params.id)

            // Valida os campos informados.
            const { municipioId, regiaoBairroId, descricao } = await request.validate(CreateBairroValidator)

            // Atualiza o objeto com os dados novos.
            bairro.municipioId = municipioId
            bairro.regiaoBairroId = regiaoBairroId
            bairro.descricao = descricao
            bairro.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await bairro.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: bairro
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar bairro.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BairroController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o bairro pelo id informado.
            const bairro = await Bairro.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            bairro.ativo = !bairro.ativo
            bairro.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await bairro.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${bairro.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: bairro
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos os bairros.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BairroController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os bairros existentes.
            const bairros = await Bairro.query()

            // Verifica se não foi retornado nenhum registro.
            if (bairros.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: bairros
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os bairros ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BairroController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os bairros ativos.
            const bairros = await Bairro.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (bairros.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: bairros
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar o bairro por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof BairroController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o bairro pelo id informado.
            const bairro = await Bairro.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: bairro
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
