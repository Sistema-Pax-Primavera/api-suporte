import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import TemplateUnidadeService from "App/Services/TemplateUnidadeService";

export default class TemplateUnidadeController {

    private templateUnidadeService = new TemplateUnidadeService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.templateUnidadeService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.templateUnidadeService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.templateUnidadeService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const templateUnidade = request.all()
        return response.status(200).send(await this.templateUnidadeService.cadastrar(templateUnidade))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const templateUnidade = request.all()
        return response.status(200).send(await this.templateUnidadeService.atualizar(templateUnidade, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.templateUnidadeService.ativar(id))
    }

}
