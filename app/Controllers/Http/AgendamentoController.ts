import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import AgendamentoService from "App/Services/AgendamentoService";

export default class AgendamentoController {

    private agendamentoService = new AgendamentoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.agendamentoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.agendamentoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.agendamentoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const agendamento = request.all()
        return response.status(200).send(await this.agendamentoService.cadastrar(agendamento))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const agendamento = request.all()
        return response.status(200).send(await this.agendamentoService.atualizar(agendamento, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.agendamentoService.ativar(id))
    }

}
