import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import CategoriaHistoricoService from "App/Services/CategoriaHistoricoService";

export default class CategoriaHistoricoController {

    private categoriaHistoricoService = new CategoriaHistoricoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.categoriaHistoricoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.categoriaHistoricoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.categoriaHistoricoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const categoriaHistorico = request.all()
        return response.status(200).send(await this.categoriaHistoricoService.cadastrar(categoriaHistorico))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const categoriaHistorico = request.all()
        return response.status(200).send(await this.categoriaHistoricoService.atualizar(categoriaHistorico, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.categoriaHistoricoService.ativar(id))
    }

}
