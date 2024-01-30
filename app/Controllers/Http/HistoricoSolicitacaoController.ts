import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import HistoricoSolicitacaoService from "App/Services/HistoricoSolicitacaoService";

export default class HistoricoSolicitacaoController {

    private historicoSolicitacaoService = new HistoricoSolicitacaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.historicoSolicitacaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.historicoSolicitacaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.historicoSolicitacaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const historicoSolicitacao = request.all()
        return response.status(200).send(await this.historicoSolicitacaoService.cadastrar(historicoSolicitacao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const historicoSolicitacao = request.all()
        return response.status(200).send(await this.historicoSolicitacaoService.atualizar(historicoSolicitacao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.historicoSolicitacaoService.ativar(id))
    }

}
