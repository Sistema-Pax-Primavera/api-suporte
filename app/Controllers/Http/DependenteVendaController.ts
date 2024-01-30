import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import DependenteVendaService from "App/Services/DependenteVendaService";

export default class DependenteVendaController {

    private dependenteVendaService = new DependenteVendaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.dependenteVendaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.dependenteVendaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.dependenteVendaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const dependenteVenda = request.all()
        return response.status(200).send(await this.dependenteVendaService.cadastrar(dependenteVenda))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const dependenteVenda = request.all()
        return response.status(200).send(await this.dependenteVendaService.atualizar(dependenteVenda, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.dependenteVendaService.ativar(id))
    }

}
