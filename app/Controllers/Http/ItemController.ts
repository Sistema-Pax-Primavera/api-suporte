import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ItemService from "App/Services/ItemService";

export default class ItemController {

    private itemService = new ItemService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.itemService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.itemService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.itemService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const item = request.all()
        return response.status(200).send(await this.itemService.cadastrar(item))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const item = request.all()
        return response.status(200).send(await this.itemService.atualizar(item, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.itemService.ativar(id))
    }

}
