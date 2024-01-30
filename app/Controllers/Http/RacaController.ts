import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import RacaService from "App/Services/RacaService";

export default class RacaController {

    private racaService = new RacaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.racaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.racaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.racaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const raca = request.all()
        return response.status(200).send(await this.racaService.cadastrar(raca))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const raca = request.all()
        return response.status(200).send(await this.racaService.atualizar(raca, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.racaService.ativar(id))
    }

}
