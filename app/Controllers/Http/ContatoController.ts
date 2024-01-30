import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ContatoService from "App/Services/ContatoService";

export default class ContatoController {

    private contatoService = new ContatoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.contatoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.contatoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.contatoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const contato = request.all()
        return response.status(200).send(await this.contatoService.cadastrar(contato))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const contato = request.all()
        return response.status(200).send(await this.contatoService.atualizar(contato, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.contatoService.ativar(id))
    }

}
