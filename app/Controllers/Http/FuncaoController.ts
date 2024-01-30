import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import FuncaoService from "App/Services/FuncaoService";

export default class FuncaoController {

    private funcaoService = new FuncaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.funcaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.funcaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.funcaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const funcao = request.all()
        return response.status(200).send(await this.funcaoService.cadastrar(funcao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const funcao = request.all()
        return response.status(200).send(await this.funcaoService.atualizar(funcao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.funcaoService.ativar(id))
    }

}
