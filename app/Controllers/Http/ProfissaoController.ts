import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Profissao from 'App/Models/Profissao'
import CreateProfissaoValidator from 'App/Validators/CreateProfissaoValidator'

export default class ProfissaoController {

    /**
     * Método para cadastrar profissão.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ProfissaoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateProfissaoValidator)

            // Insere o registro no banco de dados.
            const profissao = await Profissao.create({
                descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: profissao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar profissão.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ProfissaoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o profissão pelo id informado.
            const profissao = await Profissao.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao } = await request.validate(CreateProfissaoValidator)

            // Atualiza o objeto com os dados novos.
            profissao.descricao = descricao
            profissao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await profissao.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: profissao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar profissão.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ProfissaoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a profissão pelo id informado.
            const profissao = await Profissao.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            profissao.ativo = !profissao.ativo
            profissao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await profissao.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${profissao.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: profissao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos as profissões.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ProfissaoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as profissões existentes.
            const profissoes = await Profissao.query()

            // Verifica se não foi retornado nenhum registro.
            if (profissoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: profissoes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as profissões ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ProfissaoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as profissões ativas.
            const profissoes = await Profissao.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (profissoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: profissoes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a profissão por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ProfissaoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a profissão pelo id informado.
            const profissao = await Profissao.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: profissao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
