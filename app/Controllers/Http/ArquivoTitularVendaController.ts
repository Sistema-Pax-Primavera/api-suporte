import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ArquivoTitularVendaService from "App/Services/ArquivoTitularVendaService";

export default class ArquivoTitularVendaController {

    private arquivoTitularVendaService = new ArquivoTitularVendaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.arquivoTitularVendaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.arquivoTitularVendaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.arquivoTitularVendaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const arquivoTitularVenda = request.all()
        return response.status(200).send(await this.arquivoTitularVendaService.cadastrar(arquivoTitularVenda))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const arquivoTitularVenda = request.all()
        return response.status(200).send(await this.arquivoTitularVendaService.atualizar(arquivoTitularVenda, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.arquivoTitularVendaService.ativar(id))
    }

}
