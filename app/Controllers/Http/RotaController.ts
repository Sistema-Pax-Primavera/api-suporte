import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import RotaService from "App/Services/RotaService";

export default class RotaController {

    private rotaService = new RotaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.rotaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.rotaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.rotaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const rota = request.all()
        return response.status(200).send(await this.rotaService.cadastrar(rota))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const rota = request.all()
        return response.status(200).send(await this.rotaService.atualizar(rota, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.rotaService.ativar(id))
    }

}
