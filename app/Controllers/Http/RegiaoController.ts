import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import RegiaoService from "App/Services/RegiaoService";

export default class RegiaoController {

    private regiaoService = new RegiaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.regiaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.regiaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.regiaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const regiao = request.all()
        return response.status(200).send(await this.regiaoService.cadastrar(regiao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const regiao = request.all()
        return response.status(200).send(await this.regiaoService.atualizar(regiao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.regiaoService.ativar(id))
    }

}
