import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import PermissaoService from "App/Services/PermissaoService";

export default class PermissaoController {

    private permissaoService = new PermissaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.permissaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.permissaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.permissaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const permissao = request.all()
        return response.status(200).send(await this.permissaoService.cadastrar(permissao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const permissao = request.all()
        return response.status(200).send(await this.permissaoService.atualizar(permissao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.permissaoService.ativar(id))
    }

}
