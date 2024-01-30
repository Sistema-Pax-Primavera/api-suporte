import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import NegociacaoService from "App/Services/NegociacaoService";

export default class NegociacaoController {

    private negociacaoService = new NegociacaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.negociacaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.negociacaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.negociacaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const negociacao = request.all()
        return response.status(200).send(await this.negociacaoService.cadastrar(negociacao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const negociacao = request.all()
        return response.status(200).send(await this.negociacaoService.atualizar(negociacao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.negociacaoService.ativar(id))
    }

}
