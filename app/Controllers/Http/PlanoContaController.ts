import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import PlanoContaService from "App/Services/PlanoContaService";

export default class PlanoContaController {

    private planoContaService = new PlanoContaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.planoContaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.planoContaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.planoContaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const planoConta = request.all()
        return response.status(200).send(await this.planoContaService.cadastrar(planoConta))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const planoConta = request.all()
        return response.status(200).send(await this.planoContaService.atualizar(planoConta, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.planoContaService.ativar(id))
    }

}
