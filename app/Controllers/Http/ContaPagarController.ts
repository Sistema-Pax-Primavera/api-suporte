import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ContaPagarService from "App/Services/ContaPagarService";

export default class ContaPagarController {

    private contaPagarService = new ContaPagarService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.contaPagarService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.contaPagarService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.contaPagarService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const contaPagar = request.all()
        return response.status(200).send(await this.contaPagarService.cadastrar(contaPagar))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const contaPagar = request.all()
        return response.status(200).send(await this.contaPagarService.atualizar(contaPagar, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.contaPagarService.ativar(id))
    }

}
