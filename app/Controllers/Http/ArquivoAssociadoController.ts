import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ArquivoAssociadoService from "App/Services/ArquivoAssociadoService";

export default class ArquivoAssociadoController {

    private arquivoAssociadoService = new ArquivoAssociadoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.arquivoAssociadoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.arquivoAssociadoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.arquivoAssociadoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const arquivoAssociado = request.all()
        return response.status(200).send(await this.arquivoAssociadoService.cadastrar(arquivoAssociado))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const arquivoAssociado = request.all()
        return response.status(200).send(await this.arquivoAssociadoService.atualizar(arquivoAssociado, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.arquivoAssociadoService.ativar(id))
    }

}
