import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Template from 'App/Models/Template'
import CreateTemplateValidator from 'App/Validators/CreateTemplateValidator'

export default class TemplateController {
    
    /**
     * Método para cadastrar template.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TemplateController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao, template, tipo } = await request.validate(CreateTemplateValidator)

            // Insere o registro no banco de dados.
            const templateNovo = await Template
            .create({
                descricao, template, tipo,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: templateNovo
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar template.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TemplateController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o template pelo id informado.
            const templateAntigo = await Template.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao, template, tipo } = await request.validate(CreateTemplateValidator)

            // Atualiza o objeto com os dados novos.
            templateAntigo.descricao = descricao
            templateAntigo.template = template
            templateAntigo.tipo = tipo
            templateAntigo.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await templateAntigo.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: templateAntigo
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar template.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TemplateController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o template pelo id informado.
            const template = await Template.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            template.ativo = !template.ativo
            template.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await template.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${template.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: template
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os templates.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TemplateController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os templates existentes.
            const templates = await Template.query()

            // Verifica se não foi retornado nenhum registro.
            if (templates.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: templates
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os templates ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TemplateController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os templates ativos.
            const templates = await Template.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (templates.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: templates
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o template por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof TemplateController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o template pelo id informado.
            const template = await Template.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: template
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
