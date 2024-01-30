import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import EstadoCivilService from "App/Services/EstadoCivilService";

export default class EstadoCivilController {

    private estadoCivilService = new EstadoCivilService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.estadoCivilService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.estadoCivilService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.estadoCivilService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const estadoCivil = request.all()
        return response.status(200).send(await this.estadoCivilService.cadastrar(estadoCivil))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const estadoCivil = request.all()
        return response.status(200).send(await this.estadoCivilService.atualizar(estadoCivil, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.estadoCivilService.ativar(id))
    }

}
