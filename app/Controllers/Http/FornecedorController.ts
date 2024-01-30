import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import FornecedorService from "App/Services/FornecedorService";

export default class FornecedorController {

    private fornecedorService = new FornecedorService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.fornecedorService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.fornecedorService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.fornecedorService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const fornecedor = request.all()
        return response.status(200).send(await this.fornecedorService.cadastrar(fornecedor))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const fornecedor = request.all()
        return response.status(200).send(await this.fornecedorService.atualizar(fornecedor, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.fornecedorService.ativar(id))
    }

}
