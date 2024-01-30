import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import FinanceiroService from "App/Services/FinanceiroService";

export default class FinanceiroController {

    private financeiroService = new FinanceiroService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.financeiroService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.financeiroService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.financeiroService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const financeiro = request.all()
        return response.status(200).send(await this.financeiroService.cadastrar(financeiro))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const financeiro = request.all()
        return response.status(200).send(await this.financeiroService.atualizar(financeiro, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.financeiroService.ativar(id))
    }

}
