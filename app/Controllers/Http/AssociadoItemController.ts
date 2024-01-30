import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import AssociadoItemService from "App/Services/AssociadoItemService";

export default class AssociadoItemController {

    private associadoItemService = new AssociadoItemService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.associadoItemService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.associadoItemService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.associadoItemService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const associadoItem = request.all()
        return response.status(200).send(await this.associadoItemService.cadastrar(associadoItem))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const associadoItem = request.all()
        return response.status(200).send(await this.associadoItemService.atualizar(associadoItem, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.associadoItemService.ativar(id))
    }

}
