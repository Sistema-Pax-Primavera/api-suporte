import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import AtendimentoService from "App/Services/AtendimentoService";

export default class AtendimentoController {

    private atendimentoService = new AtendimentoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.atendimentoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.atendimentoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.atendimentoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const atendimento = request.all()
        return response.status(200).send(await this.atendimentoService.cadastrar(atendimento))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const atendimento = request.all()
        return response.status(200).send(await this.atendimentoService.atualizar(atendimento, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.atendimentoService.ativar(id))
    }

}
