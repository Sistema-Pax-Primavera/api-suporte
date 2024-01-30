import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import PlanoUnidadeService from "App/Services/PlanoUnidadeService";

export default class PlanoUnidadeController {

    private planoUnidadeService = new PlanoUnidadeService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.planoUnidadeService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.planoUnidadeService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.planoUnidadeService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const planoUnidade = request.all()
        return response.status(200).send(await this.planoUnidadeService.cadastrar(planoUnidade))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const planoUnidade = request.all()
        return response.status(200).send(await this.planoUnidadeService.atualizar(planoUnidade, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.planoUnidadeService.ativar(id))
    }

}
