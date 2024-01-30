import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import MunicipioService from "App/Services/MunicipioService";

export default class MunicipioController {

    private municipioService = new MunicipioService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.municipioService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.municipioService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.municipioService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const municipio = request.all()
        return response.status(200).send(await this.municipioService.cadastrar(municipio))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const municipio = request.all()
        return response.status(200).send(await this.municipioService.atualizar(municipio, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.municipioService.ativar(id))
    }

}
