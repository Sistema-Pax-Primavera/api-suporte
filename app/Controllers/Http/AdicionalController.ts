import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import CustomError from 'App/Exceptions/CustomError';
import AdicionalService from 'App/Services/AdicionalService';
import { portes } from 'App/Utils/Globals';
import handleRequest from 'App/Utils/HandleResponse';

export default class AdicionalController {
    private adicionalService = new AdicionalService();

    private schemaAdicional = schema.create({
        descricao: schema.string(),
        pet: schema.boolean(),
        porte: schema.enum.nullableAndOptional(portes),
        resgate: schema.boolean(),
    });

    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        await handleRequest(async () => {
            return await this.adicionalService.buscarTodos();
        }, response);
    }

    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        await handleRequest(async () => {
            return await this.adicionalService.buscarAtivos();
        }, response);
    }

    public async buscarPorId({ params, response }: HttpContextContract): Promise<any> {
        await handleRequest(async () => {
            const { id } = params;
            if (!Number.isInteger(Number(id))) {
                throw new CustomError('Parâmetro inválido.', 400);
            }
            
            return await this.adicionalService.buscarPorId(id);
        }, response);
    }

    public async cadastrar({ request, response }: HttpContextContract): Promise<any> {
        await handleRequest(async () => {
            const payload = await request.validate({ schema: this.schemaAdicional });
            return await this.adicionalService.cadastrar(payload);
        }, response);
    }

    public async atualizar({ request, params, response }: HttpContextContract): Promise<any> {
        const { id } = params;
        if (!Number.isInteger(Number(id))) {
            throw new CustomError('Parâmetro inválido.', 400);
        }

        await handleRequest(async () => {
            const payload = await request.validate({ schema: this.schemaAdicional });
            return await this.adicionalService.atualizar(payload, id);
        }, response);
    }

    public async ativar({ params, response }: HttpContextContract): Promise<any> {
        const { id } = params;
        if (!Number.isInteger(Number(id))) {
            throw new CustomError('Parâmetro inválido.', 400);
        }

        await handleRequest(async () => {
            return await this.adicionalService.ativar(id);
        }, response);
    }
}
