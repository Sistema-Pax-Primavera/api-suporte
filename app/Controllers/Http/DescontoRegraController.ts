import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import DescontoRegraService from "App/Services/DescontoRegraService";

export default class DescontoRegraController {

    private descontoRegraService = new DescontoRegraService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.descontoRegraService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.descontoRegraService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.descontoRegraService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const descontoRegra = request.all()
        return response.status(200).send(await this.descontoRegraService.cadastrar(descontoRegra))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const descontoRegra = request.all()
        return response.status(200).send(await this.descontoRegraService.atualizar(descontoRegra, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.descontoRegraService.ativar(id))
    }

}
