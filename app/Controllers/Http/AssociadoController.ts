import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import AssociadoService from "App/Services/AssociadoService";

export default class AssociadoController {

    private associadoService = new AssociadoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.associadoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.associadoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.associadoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const associado = request.all()
        return response.status(200).send(await this.associadoService.cadastrar(associado))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const associado = request.all()
        return response.status(200).send(await this.associadoService.atualizar(associado, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.associadoService.ativar(id))
    }

}
