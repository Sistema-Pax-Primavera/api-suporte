import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import CustomError from 'App/Exceptions/CustomError';
import FuncaoService from 'App/Services/FuncaoService';
import handleRequest from 'App/Utils/HandleResponse';

export default class FuncaoController {
    private funcaoService = new FuncaoService();

    private schemaFuncao = schema.create({
        descricao: schema.string()
    });

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        await handleRequest(async () => {
            return await this.funcaoService.buscarTodos();
        }, response);
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        await handleRequest(async () => {
            return await this.funcaoService.buscarAtivos();
        }, response);
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        await handleRequest(async () => {
            const { id } = params;
            if (!Number.isInteger(Number(id))) {
                throw new CustomError('Parâmetro inválido.', 400);
            }
            
            return await this.funcaoService.buscarPorId(id);
        }, response);
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        await handleRequest(async () => {
            const payload = await request.validate({ schema: this.schemaFuncao });
            return await this.funcaoService.cadastrar(payload);
        }, response);
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params;
        if (!Number.isInteger(Number(id))) {
            throw new CustomError('Parâmetro inválido.', 400);
        }

        await handleRequest(async () => {
            const payload = await request.validate({ schema: this.schemaFuncao });
            return await this.funcaoService.atualizar(payload, id);
        }, response);
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params;
        if (!Number.isInteger(Number(id))) {
            throw new CustomError('Parâmetro inválido.', 400);
        }

        await handleRequest(async () => {
            return await this.funcaoService.ativar(id);
        }, response);
    }
}
