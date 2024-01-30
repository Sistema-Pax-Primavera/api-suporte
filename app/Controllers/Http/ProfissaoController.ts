import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ProfissaoService from "App/Services/ProfissaoService";

export default class ProfissaoController {

    private profissaoService = new ProfissaoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.profissaoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.profissaoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.profissaoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const profissao = request.all()
        return response.status(200).send(await this.profissaoService.cadastrar(profissao))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const profissao = request.all()
        return response.status(200).send(await this.profissaoService.atualizar(profissao, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.profissaoService.ativar(id))
    }

}
