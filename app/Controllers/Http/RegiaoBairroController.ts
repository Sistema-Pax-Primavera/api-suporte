import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import RegiaoBairroService from "App/Services/RegiaoBairroService";

export default class RegiaoBairroController {

    private regiaoBairroService = new RegiaoBairroService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.regiaoBairroService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.regiaoBairroService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.regiaoBairroService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const regiaoBairro = request.all()
        return response.status(200).send(await this.regiaoBairroService.cadastrar(regiaoBairro))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const regiaoBairro = request.all()
        return response.status(200).send(await this.regiaoBairroService.atualizar(regiaoBairro, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.regiaoBairroService.ativar(id))
    }

}
