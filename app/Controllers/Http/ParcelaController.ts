import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ParcelaService from "App/Services/ParcelaService";

export default class ParcelaController {

    private parcelaService = new ParcelaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.parcelaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.parcelaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.parcelaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const parcela = request.all()
        return response.status(200).send(await this.parcelaService.cadastrar(parcela))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const parcela = request.all()
        return response.status(200).send(await this.parcelaService.atualizar(parcela, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.parcelaService.ativar(id))
    }

}
