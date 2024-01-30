import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import UnidadeDevedoraService from "App/Services/UnidadeDevedoraService";

export default class UnidadeDevedoraController {

    private unidadeDevedoraService = new UnidadeDevedoraService()

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.unidadeDevedoraService.buscarTodos())
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        return response.status(200).send(await this.unidadeDevedoraService.buscarAtivos())
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.unidadeDevedoraService.buscarPorId(id))
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        const unidadeDevedora = request.all()
        return response.status(200).send(await this.unidadeDevedoraService.cadastrar(unidadeDevedora))
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        const unidadeDevedora = request.all()
        return response.status(200).send(await this.unidadeDevedoraService.atualizar(unidadeDevedora, id))
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params
        return response.status(200).send(await this.unidadeDevedoraService.ativar(id))
    }

}
