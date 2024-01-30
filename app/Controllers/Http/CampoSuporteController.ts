import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import CampoSuporteService from "App/Services/CampoSuporteService";

export default class CampoSuporteController {

    private campoSuporteService = new CampoSuporteService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.campoSuporteService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.campoSuporteService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.campoSuporteService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const campoSuporte = request.all()
        return response.status(200).send(await this.campoSuporteService.cadastrar(campoSuporte))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const campoSuporte = request.all()
        return response.status(200).send(await this.campoSuporteService.atualizar(campoSuporte, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.campoSuporteService.ativar(id))
    }

}
