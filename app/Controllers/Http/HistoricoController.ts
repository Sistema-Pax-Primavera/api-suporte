import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import HistoricoService from "App/Services/HistoricoService";

export default class HistoricoController {

    private historicoService = new HistoricoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.historicoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.historicoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.historicoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const historico = request.all()
        return response.status(200).send(await this.historicoService.cadastrar(historico))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const historico = request.all()
        return response.status(200).send(await this.historicoService.atualizar(historico, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.historicoService.ativar(id))
    }

}
