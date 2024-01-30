import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import UsuarioService from "App/Services/UsuarioService";

export default class UsuarioController {

    private usuarioService = new UsuarioService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.usuarioService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.usuarioService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.usuarioService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const usuario = request.all()
        return response.status(200).send(await this.usuarioService.cadastrar(usuario))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const usuario = request.all()
        return response.status(200).send(await this.usuarioService.atualizar(usuario, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.usuarioService.ativar(id))
    }

}
