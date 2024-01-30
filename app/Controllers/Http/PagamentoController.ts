import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import PagamentoService from "App/Services/PagamentoService";

export default class PagamentoController {

    private pagamentoService = new PagamentoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.pagamentoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.pagamentoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.pagamentoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const pagamento = request.all()
        return response.status(200).send(await this.pagamentoService.cadastrar(pagamento))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const pagamento = request.all()
        return response.status(200).send(await this.pagamentoService.atualizar(pagamento, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.pagamentoService.ativar(id))
    }

}
