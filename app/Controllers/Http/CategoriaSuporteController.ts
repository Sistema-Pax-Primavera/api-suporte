import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import CategoriaSuporteService from "App/Services/CategoriaSuporteService";

export default class CategoriaSuporteController {

    private categoriaSuporteService = new CategoriaSuporteService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.categoriaSuporteService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.categoriaSuporteService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.categoriaSuporteService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const categoriaSuporte = request.all()
        return response.status(200).send(await this.categoriaSuporteService.cadastrar(categoriaSuporte))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const categoriaSuporte = request.all()
        return response.status(200).send(await this.categoriaSuporteService.atualizar(categoriaSuporte, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.categoriaSuporteService.ativar(id))
    }

}
