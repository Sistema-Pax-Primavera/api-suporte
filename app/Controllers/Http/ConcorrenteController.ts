import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ConcorrenteService from "App/Services/ConcorrenteService";

export default class ConcorrenteController {

    private concorrenteService = new ConcorrenteService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.concorrenteService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.concorrenteService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.concorrenteService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const concorrente = request.all()
        return response.status(200).send(await this.concorrenteService.cadastrar(concorrente))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const concorrente = request.all()
        return response.status(200).send(await this.concorrenteService.atualizar(concorrente, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.concorrenteService.ativar(id))
    }

}
