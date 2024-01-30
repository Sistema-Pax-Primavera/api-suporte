import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import UnidadeFinanceiraService from "App/Services/UnidadeFinanceiraService";

export default class UnidadeFinanceiraController {

    private unidadeFinanceiraService = new UnidadeFinanceiraService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.unidadeFinanceiraService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.unidadeFinanceiraService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.unidadeFinanceiraService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const unidadeFinanceira = request.all()
        return response.status(200).send(await this.unidadeFinanceiraService.cadastrar(unidadeFinanceira))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const unidadeFinanceira = request.all()
        return response.status(200).send(await this.unidadeFinanceiraService.atualizar(unidadeFinanceira, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.unidadeFinanceiraService.ativar(id))
    }

}
