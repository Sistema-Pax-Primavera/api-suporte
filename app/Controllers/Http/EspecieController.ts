import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import EspecieService from "App/Services/EspecieService";

export default class EspecieController {

    private especieService = new EspecieService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.especieService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.especieService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.especieService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const especie = request.all()
        return response.status(200).send(await this.especieService.cadastrar(especie))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const especie = request.all()
        return response.status(200).send(await this.especieService.atualizar(especie, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.especieService.ativar(id))
    }

}
