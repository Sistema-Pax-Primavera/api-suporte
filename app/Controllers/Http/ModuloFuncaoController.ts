import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ModuloFuncaoService from "App/Services/ModuloFuncaoService";

export default class ModuloFuncaoController {

    private moduloFuncaoService = new ModuloFuncaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.moduloFuncaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.moduloFuncaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.moduloFuncaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const moduloFuncao = request.all()
        return response.status(200).send(await this.moduloFuncaoService.cadastrar(moduloFuncao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const moduloFuncao = request.all()
        return response.status(200).send(await this.moduloFuncaoService.atualizar(moduloFuncao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.moduloFuncaoService.ativar(id))
    }

}
