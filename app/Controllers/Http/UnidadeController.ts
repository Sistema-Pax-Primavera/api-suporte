import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import UnidadeService from "App/Services/UnidadeService";

export default class UnidadeController {

    private unidadeService = new UnidadeService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.unidadeService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.unidadeService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.unidadeService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const unidade = request.all()
        return response.status(200).send(await this.unidadeService.cadastrar(unidade))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const unidade = request.all()
        return response.status(200).send(await this.unidadeService.atualizar(unidade, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.unidadeService.ativar(id))
    }

}
