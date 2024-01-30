import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import DependenteService from "App/Services/DependenteService";

export default class DependenteController {

    private dependenteService = new DependenteService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.dependenteService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.dependenteService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.dependenteService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const dependente = request.all()
        return response.status(200).send(await this.dependenteService.cadastrar(dependente))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const dependente = request.all()
        return response.status(200).send(await this.dependenteService.atualizar(dependente, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.dependenteService.ativar(id))
    }

}
