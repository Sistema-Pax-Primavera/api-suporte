import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import AdicionalService from "App/Services/AdicionalService";

export default class AdicionalController {

    private adicionalService = new AdicionalService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.adicionalService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.adicionalService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.adicionalService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const adicional = request.all()
        return response.status(200).send(await this.adicionalService.cadastrar(adicional))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const adicional = request.all()
        return response.status(200).send(await this.adicionalService.atualizar(adicional, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.adicionalService.ativar(id))
    }

}
