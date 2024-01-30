import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import TipoCaixaService from "App/Services/TipoCaixaService";

export default class TipoCaixaController {

    private tipoCaixaService = new TipoCaixaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.tipoCaixaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.tipoCaixaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.tipoCaixaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const tipoCaixa = request.all()
        return response.status(200).send(await this.tipoCaixaService.cadastrar(tipoCaixa))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const tipoCaixa = request.all()
        return response.status(200).send(await this.tipoCaixaService.atualizar(tipoCaixa, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.tipoCaixaService.ativar(id))
    }

}
