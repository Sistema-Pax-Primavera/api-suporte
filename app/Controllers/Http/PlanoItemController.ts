import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import PlanoItemService from "App/Services/PlanoItemService";

export default class PlanoItemController {

    private planoItemService = new PlanoItemService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.planoItemService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.planoItemService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.planoItemService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const planoItem = request.all()
        return response.status(200).send(await this.planoItemService.cadastrar(planoItem))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const planoItem = request.all()
        return response.status(200).send(await this.planoItemService.atualizar(planoItem, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.planoItemService.ativar(id))
    }

}
