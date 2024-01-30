import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import SubCategoriaHistoricoService from "App/Services/SubCategoriaHistoricoService";

export default class SubCategoriaHistoricoController {

    private subCategoriaHistoricoService = new SubCategoriaHistoricoService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.subCategoriaHistoricoService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.subCategoriaHistoricoService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.subCategoriaHistoricoService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const subCategoriaHistorico = request.all()
        return response.status(200).send(await this.subCategoriaHistoricoService.cadastrar(subCategoriaHistorico))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const subCategoriaHistorico = request.all()
        return response.status(200).send(await this.subCategoriaHistoricoService.atualizar(subCategoriaHistorico, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.subCategoriaHistoricoService.ativar(id))
    }

}
