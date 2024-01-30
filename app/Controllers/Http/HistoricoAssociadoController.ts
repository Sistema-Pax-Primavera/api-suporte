import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import HistoricoAssociadoService from "App/Services/HistoricoAssociadoService";

export default class HistoricoAssociadoController {

    private historicoAssociadoService = new HistoricoAssociadoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.historicoAssociadoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.historicoAssociadoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.historicoAssociadoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const historicoAssociado = request.all()
        return response.status(200).send(await this.historicoAssociadoService.cadastrar(historicoAssociado))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const historicoAssociado = request.all()
        return response.status(200).send(await this.historicoAssociadoService.atualizar(historicoAssociado, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.historicoAssociadoService.ativar(id))
    }

}
