import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import CategoriaItemService from "App/Services/CategoriaItemService";

export default class CategoriaItemController {

    private categoriaItemService = new CategoriaItemService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.categoriaItemService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.categoriaItemService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.categoriaItemService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const categoriaItem = request.all()
        return response.status(200).send(await this.categoriaItemService.cadastrar(categoriaItem))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const categoriaItem = request.all()
        return response.status(200).send(await this.categoriaItemService.atualizar(categoriaItem, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.categoriaItemService.ativar(id))
    }

}
