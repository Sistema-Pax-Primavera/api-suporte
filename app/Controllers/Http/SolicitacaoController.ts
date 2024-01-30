import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import SolicitacaoService from "App/Services/SolicitacaoService";

export default class SolicitacaoController {

    private solicitacaoService = new SolicitacaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.solicitacaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.solicitacaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.solicitacaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const solicitacao = request.all()
        return response.status(200).send(await this.solicitacaoService.cadastrar(solicitacao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const solicitacao = request.all()
        return response.status(200).send(await this.solicitacaoService.atualizar(solicitacao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.solicitacaoService.ativar(id))
    }

}
