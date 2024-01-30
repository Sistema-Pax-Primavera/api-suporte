import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ParentescoUnidadeService from "App/Services/ParentescoUnidadeService";

export default class ParentescoUnidadeController {

    private parentescoUnidadeService = new ParentescoUnidadeService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.parentescoUnidadeService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.parentescoUnidadeService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.parentescoUnidadeService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const parentescoUnidade = request.all()
        return response.status(200).send(await this.parentescoUnidadeService.cadastrar(parentescoUnidade))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const parentescoUnidade = request.all()
        return response.status(200).send(await this.parentescoUnidadeService.atualizar(parentescoUnidade, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.parentescoUnidadeService.ativar(id))
    }

}
