import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import BairroService from "App/Services/BairroService";

export default class BairroController {

    private bairroService = new BairroService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.bairroService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.bairroService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.bairroService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const bairro = request.all()
        return response.status(200).send(await this.bairroService.cadastrar(bairro))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const bairro = request.all()
        return response.status(200).send(await this.bairroService.atualizar(bairro, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.bairroService.ativar(id))
    }

}
