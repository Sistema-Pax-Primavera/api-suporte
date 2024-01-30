import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import TitularVendaService from "App/Services/TitularVendaService";

export default class TitularVendaController {

    private titularVendaService = new TitularVendaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.titularVendaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.titularVendaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.titularVendaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const titularVenda = request.all()
        return response.status(200).send(await this.titularVendaService.cadastrar(titularVenda))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const titularVenda = request.all()
        return response.status(200).send(await this.titularVendaService.atualizar(titularVenda, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.titularVendaService.ativar(id))
    }

}
