import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ContaUsuarioService from "App/Services/ContaUsuarioService";

export default class ContaUsuarioController {

    private contaUsuarioService = new ContaUsuarioService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.contaUsuarioService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.contaUsuarioService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.contaUsuarioService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const contaUsuario = request.all()
        return response.status(200).send(await this.contaUsuarioService.cadastrar(contaUsuario))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const contaUsuario = request.all()
        return response.status(200).send(await this.contaUsuarioService.atualizar(contaUsuario, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.contaUsuarioService.ativar(id))
    }

}
