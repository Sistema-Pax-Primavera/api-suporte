import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import TemplateService from "App/Services/TemplateService";

export default class TemplateController {

    private templateService = new TemplateService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.templateService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.templateService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.templateService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const template = request.all()
        return response.status(200).send(await this.templateService.cadastrar(template))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const template = request.all()
        return response.status(200).send(await this.templateService.atualizar(template, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.templateService.ativar(id))
    }

}
