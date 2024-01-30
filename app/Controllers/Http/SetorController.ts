import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import SetorService from "App/Services/SetorService";

export default class SetorController {

    private setorService = new SetorService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.setorService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.setorService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.setorService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const setor = request.all()
        return response.status(200).send(await this.setorService.cadastrar(setor))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const setor = request.all()
        return response.status(200).send(await this.setorService.atualizar(setor, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.setorService.ativar(id))
    }

}
