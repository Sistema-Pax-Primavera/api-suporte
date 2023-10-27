import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Municipio from 'App/Models/Municipio'
import CreateMunicipioValidator from 'App/Validators/CreateMunicipioValidator'

export default class MunicipioController {

    /**
     * Método para cadastrar município.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof MunicipioController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao, uf } = await request.validate(CreateMunicipioValidator)

            // Insere o registro no banco de dados.
            const municipio = await Municipio.create({
                descricao, uf,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: municipio
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar município.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof MunicipioController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o município pelo id informado.
            const municipio = await Municipio.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao, uf } = await request.validate(CreateMunicipioValidator)

            // Atualiza o objeto com os dados novos.
            municipio.descricao = descricao
            municipio.uf = uf
            municipio.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await municipio.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: municipio
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar município.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof MunicipioController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o município pelo id informado.
            const municipio = await Municipio.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            municipio.ativo = !municipio.ativo
            municipio.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await municipio.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${municipio.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: municipio
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos os municípios.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof MunicipioController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os municípios existentes.
            const municipios = await Municipio.query()

            // Verifica se não foi retornado nenhum registro.
            if (municipios.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: municipios
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os municípios ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof MunicipioController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os municípios ativos.
            const municipios = await Municipio.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (municipios.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: municipios
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar o município por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof MunicipioController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o município pelo id informado.
            const municipio = await Municipio.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: municipio
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
