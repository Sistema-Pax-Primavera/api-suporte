import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import DescontoUnidadeService from "App/Services/DescontoUnidadeService";

export default class DescontoUnidadeController {

    private descontoUnidadeService = new DescontoUnidadeService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.descontoUnidadeService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.descontoUnidadeService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.descontoUnidadeService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const descontoUnidade = request.all()
        return response.status(200).send(await this.descontoUnidadeService.cadastrar(descontoUnidade))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const descontoUnidade = request.all()
        return response.status(200).send(await this.descontoUnidadeService.atualizar(descontoUnidade, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.descontoUnidadeService.ativar(id))
    }

}
