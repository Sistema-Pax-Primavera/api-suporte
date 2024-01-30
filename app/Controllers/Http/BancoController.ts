import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import BancoService from "App/Services/BancoService";

export default class BancoController {

    private bancoService = new BancoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.bancoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.bancoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.bancoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const banco = request.all()
        return response.status(200).send(await this.bancoService.cadastrar(banco))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const banco = request.all()
        return response.status(200).send(await this.bancoService.atualizar(banco, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.bancoService.ativar(id))
    }

}
