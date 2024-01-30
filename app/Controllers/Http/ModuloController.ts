import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ModuloService from "App/Services/ModuloService";

export default class ModuloController {

    private moduloService = new ModuloService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.moduloService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.moduloService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.moduloService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const modulo = request.all()
        return response.status(200).send(await this.moduloService.cadastrar(modulo))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const modulo = request.all()
        return response.status(200).send(await this.moduloService.atualizar(modulo, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.moduloService.ativar(id))
    }

}
