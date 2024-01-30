import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ContaService from "App/Services/ContaService";

export default class ContaController {

    private contaService = new ContaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.contaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.contaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.contaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const conta = request.all()
        return response.status(200).send(await this.contaService.cadastrar(conta))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const conta = request.all()
        return response.status(200).send(await this.contaService.atualizar(conta, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.contaService.ativar(id))
    }

}
