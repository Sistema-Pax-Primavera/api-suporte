import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import AdicionalUnidadeService from "App/Services/AdicionalUnidadeService";

export default class AdicionalController {

    private adicionalUnidadeService = new AdicionalUnidadeService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.adicionalUnidadeService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.adicionalUnidadeService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.adicionalUnidadeService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const adicional = request.all()
        return response.status(200).send(await this.adicionalUnidadeService.cadastrar(adicional))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const adicional = request.all()
        return response.status(200).send(await this.adicionalUnidadeService.atualizar(adicional, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.adicionalUnidadeService.ativar(id))
    }

}
