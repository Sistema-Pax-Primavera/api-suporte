import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import PlanoService from "App/Services/PlanoService";

export default class PlanoController {

    private planoService = new PlanoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.planoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.planoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.planoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const plano = request.all()
        return response.status(200).send(await this.planoService.cadastrar(plano))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const plano = request.all()
        return response.status(200).send(await this.planoService.atualizar(plano, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.planoService.ativar(id))
    }

}
