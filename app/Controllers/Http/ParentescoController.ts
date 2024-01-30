import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ParentescoService from "App/Services/ParentescoService";

export default class ParentescoController {

    private parentescoService = new ParentescoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.parentescoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.parentescoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.parentescoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const parentesco = request.all()
        return response.status(200).send(await this.parentescoService.cadastrar(parentesco))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const parentesco = request.all()
        return response.status(200).send(await this.parentescoService.atualizar(parentesco, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.parentescoService.ativar(id))
    }

}
