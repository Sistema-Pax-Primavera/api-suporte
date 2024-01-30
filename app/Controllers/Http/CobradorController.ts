import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import CobradorService from "App/Services/CobradorService";

export default class CobradorController {

    private cobradorService = new CobradorService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.cobradorService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.cobradorService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.cobradorService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const cobrador = request.all()
        return response.status(200).send(await this.cobradorService.cadastrar(cobrador))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const cobrador = request.all()
        return response.status(200).send(await this.cobradorService.atualizar(cobrador, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.cobradorService.ativar(id))
    }

}
