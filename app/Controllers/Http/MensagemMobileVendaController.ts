import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import MensagemMobileVendaService from "App/Services/MensagemMobileVendaService";

export default class MensagemMobileVendaController {

    private mensagemMobileVendaService = new MensagemMobileVendaService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.mensagemMobileVendaService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.mensagemMobileVendaService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.mensagemMobileVendaService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const mensagemMobileVenda = request.all()
        return response.status(200).send(await this.mensagemMobileVendaService.cadastrar(mensagemMobileVenda))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const mensagemMobileVenda = request.all()
        return response.status(200).send(await this.mensagemMobileVendaService.atualizar(mensagemMobileVenda, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.mensagemMobileVendaService.ativar(id))
    }

}
