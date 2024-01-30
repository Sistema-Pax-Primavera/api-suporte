import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import HistoricoFinanceiroService from "App/Services/HistoricoFinanceiroService";

export default class HistoricoFinanceiroController {

    private historicoFinanceiroService = new HistoricoFinanceiroService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.historicoFinanceiroService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.historicoFinanceiroService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.historicoFinanceiroService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const historicoFinanceiro = request.all()
        return response.status(200).send(await this.historicoFinanceiroService.cadastrar(historicoFinanceiro))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const historicoFinanceiro = request.all()
        return response.status(200).send(await this.historicoFinanceiroService.atualizar(historicoFinanceiro, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.historicoFinanceiroService.ativar(id))
    }

}
