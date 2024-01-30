import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import CartaoAssociadoService from "App/Services/CartaoAssociadoService";

export default class CartaoAssociadoController {

    private cartaoAssociadoService = new CartaoAssociadoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.cartaoAssociadoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.cartaoAssociadoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.cartaoAssociadoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const cartaoAssociado = request.all()
        return response.status(200).send(await this.cartaoAssociadoService.cadastrar(cartaoAssociado))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const cartaoAssociado = request.all()
        return response.status(200).send(await this.cartaoAssociadoService.atualizar(cartaoAssociado, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.cartaoAssociadoService.ativar(id))
    }

}
