import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ReligiaoService from "App/Services/ReligiaoService";

export default class ReligiaoController {

    private religiaoService = new ReligiaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.religiaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.religiaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.religiaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const religiao = request.all()
        return response.status(200).send(await this.religiaoService.cadastrar(religiao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const religiao = request.all()
        return response.status(200).send(await this.religiaoService.atualizar(religiao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.religiaoService.ativar(id))
    }

}
