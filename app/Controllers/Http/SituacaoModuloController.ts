import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import SituacaoModuloService from "App/Services/SituacaoModuloService";

export default class SituacaoModuloController {

    private situacaoModuloService = new SituacaoModuloService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.situacaoModuloService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.situacaoModuloService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.situacaoModuloService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const situacaoModulo = request.all()
        return response.status(200).send(await this.situacaoModuloService.cadastrar(situacaoModulo))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const situacaoModulo = request.all()
        return response.status(200).send(await this.situacaoModuloService.atualizar(situacaoModulo, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.situacaoModuloService.ativar(id))
    }

}
