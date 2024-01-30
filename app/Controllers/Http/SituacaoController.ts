import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import SituacaoService from "App/Services/SituacaoService";

export default class SituacaoController {

    private situacaoService = new SituacaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.situacaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.situacaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.situacaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const situacao = request.all()
        return response.status(200).send(await this.situacaoService.cadastrar(situacao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const situacao = request.all()
        return response.status(200).send(await this.situacaoService.atualizar(situacao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.situacaoService.ativar(id))
    }

}
