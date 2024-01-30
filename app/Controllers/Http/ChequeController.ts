import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ChequeService from "App/Services/ChequeService";

export default class ChequeController {

    private chequeService = new ChequeService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.chequeService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.chequeService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.chequeService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const cheque = request.all()
        return response.status(200).send(await this.chequeService.cadastrar(cheque))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const cheque = request.all()
        return response.status(200).send(await this.chequeService.atualizar(cheque, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.chequeService.ativar(id))
    }

}
