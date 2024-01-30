import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ItemVendaService from "App/Services/ItemVendaService";

export default class ItemVendaController {

    private itemVendaService = new ItemVendaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.itemVendaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.itemVendaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.itemVendaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const itemVenda = request.all()
        return response.status(200).send(await this.itemVendaService.cadastrar(itemVenda))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const itemVenda = request.all()
        return response.status(200).send(await this.itemVendaService.atualizar(itemVenda, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.itemVendaService.ativar(id))
    }

}
