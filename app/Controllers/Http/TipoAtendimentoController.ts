import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import TipoAtendimentoService from "App/Services/TipoAtendimentoService";

export default class TipoAtendimentoController {

    private tipoAtendimentoService = new TipoAtendimentoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.tipoAtendimentoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.tipoAtendimentoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.tipoAtendimentoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const tipoAtendimento = request.all()
        return response.status(200).send(await this.tipoAtendimentoService.cadastrar(tipoAtendimento))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const tipoAtendimento = request.all()
        return response.status(200).send(await this.tipoAtendimentoService.atualizar(tipoAtendimento, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.tipoAtendimentoService.ativar(id))
    }

}
