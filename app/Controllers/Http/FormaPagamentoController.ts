import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import FormaPagamentoService from "App/Services/FormaPagamentoService";

export default class FormaPagamentoController {

    private formaPagamentoService = new FormaPagamentoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.formaPagamentoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.formaPagamentoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.formaPagamentoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const formaPagamento = request.all()
        return response.status(200).send(await this.formaPagamentoService.cadastrar(formaPagamento))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const formaPagamento = request.all()
        return response.status(200).send(await this.formaPagamentoService.atualizar(formaPagamento, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.formaPagamentoService.ativar(id))
    }

}
