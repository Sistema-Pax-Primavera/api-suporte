import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import MensagemMobileService from "App/Services/MensagemMobileService";

export default class MensagemMobileController {

    private mensagemMobileService = new MensagemMobileService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.mensagemMobileService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.mensagemMobileService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.mensagemMobileService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const mensagemMobile = request.all()
        return response.status(200).send(await this.mensagemMobileService.cadastrar(mensagemMobile))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const mensagemMobile = request.all()
        return response.status(200).send(await this.mensagemMobileService.atualizar(mensagemMobile, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.mensagemMobileService.ativar(id))
    }

}
