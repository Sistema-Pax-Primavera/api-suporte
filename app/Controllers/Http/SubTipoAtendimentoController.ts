import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import SubTipoAtendimentoService from "App/Services/SubTipoAtendimentoService";

export default class SubTipoAtendimentoController {

    private subTipoAtendimentoService = new SubTipoAtendimentoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.subTipoAtendimentoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.subTipoAtendimentoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.subTipoAtendimentoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const subTipoAtendimento = request.all()
        return response.status(200).send(await this.subTipoAtendimentoService.cadastrar(subTipoAtendimento))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const subTipoAtendimento = request.all()
        return response.status(200).send(await this.subTipoAtendimentoService.atualizar(subTipoAtendimento, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.subTipoAtendimentoService.ativar(id))
    }

}
