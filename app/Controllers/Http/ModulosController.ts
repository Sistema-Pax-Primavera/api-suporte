import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Modulo from 'App/Models/Modulo'
import CreateModuloValidator from 'App/Validators/CreateModuloValidator'

export default class ModulosController {

    /**
     * Método para cadastrar módulo.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ModulosController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            const { descricao } = await request.validate(CreateModuloValidator)

            const modulo = await Modulo.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: modulo
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            const modulo = await Modulo.findOrFail(params.id)

            const { descricao } = await request.validate(CreateModuloValidator)

            modulo.descricao = descricao
            modulo.updatedBy = auth.user?.nome ?? null

            await modulo.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: modulo
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    public async ativar({ response, params, auth }) {
        try {
            const modulo = await Modulo.findOrFail(params.id)

            modulo.ativo = !modulo.ativo
            modulo.updatedBy = auth.user?.nome ?? null

            await modulo.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${modulo.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: modulo
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    public async buscarTodos({ response }) {
        try {
            const modulos = await Modulo.query()

            if (modulos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: modulos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    public async buscarAtivos({ response }) {
        try {
            const modulos = await Modulo.query().where('ativo', true)

            if (modulos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: modulos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    public async buscarPorId({ response, params }) {
        try {
            const modulo = await Modulo.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: modulo
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
