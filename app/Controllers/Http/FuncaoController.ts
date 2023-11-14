import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Funcao from 'App/Models/Funcao'
import Modulo from 'App/Models/Modulo'
import ModuloFuncao from 'App/Models/ModuloFuncao'
import CreateFuncaoValidator from 'App/Validators/CreateFuncaoValidator'

export default class FuncaoController {

    /**
     * Função para vincular os módulas a função especificada.
     *
     * @private
     * @param {any[]} modulos
     * @param {Number} funcaoId
     * @param {(string | undefined | null)} usuario
     * @memberof FuncaoController
     */
    private async vincularModulos(modulos: any[], funcaoId: number, usuario: string | undefined | null): Promise<void> {

        // Inativa todos os módulos liberados.  
        await ModuloFuncao.query()
            .where('funcaoId', funcaoId)
            .update({ ativo: false, updatedBy: usuario })

        const modulosFormatados: any[] = []

        // Formata os módulos em um novo array.
        for (const item of modulos) {
            // Verifica se o módulo existe e está ativo.
            let modulo = await Modulo.query()
                .where('id', item.moduloId)
                .where('ativo', true)
                .first()

            if (modulo) {
                modulosFormatados.push({
                    moduloId: item.moduloId,
                    funcaoId: funcaoId,
                    acao: item.acao,
                    ativo: true,
                    createdBy: usuario,
                    updatedBy: usuario
                })
            }
        }

        // Atualiza ou criar os registros na tabela.
        await ModuloFuncao.updateOrCreateMany(['moduloId', 'funcaoId'], modulosFormatados)
    }

    /**
     * Método para cadastrar função.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { descricao, modulos } = await request.validate(CreateFuncaoValidator)

            // Insere o registro no banco de dados.
            const funcao = await Funcao.create({
                descricao,
                createdBy: auth.user?.nome
            })

            // Chama a função para vincular os módulos.
            await this.vincularModulos(modulos, funcao.id, auth.user?.nome)

            // Carrega os módulos da função.
            await funcao.load('modulos')

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: funcao
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar função.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o função pelo id informado.
            const funcao = await Funcao.findOrFail(params.id)

            // Valida os campos informados.
            const { descricao, modulos } = await request.validate(CreateFuncaoValidator)

            // Atualiza o objeto com os dados novos.
            funcao.merge({
                descricao,
                updatedBy: auth.user?.nome
            })

            // Persiste no banco o objeto atualizado.
            await funcao.save()

            // Chama a função para vincular os módulos
            await this.vincularModulos(modulos, funcao.id, auth.user?.nome)

            // Carrega os módulos da função.
            await funcao.load('modulos')

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: funcao
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar função.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a função pelo id informado.
            const funcao = await Funcao.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            funcao.merge({
                ativo: !funcao.ativo,
                updatedBy: auth.user?.nome
            })

            // Persiste no banco o objeto atualizado.
            await funcao.save()

            // Ativa / inativa os módulos da função.
            await ModuloFuncao.query().update({ ativo: funcao.ativo, updatedBy: auth.user?.nome }).where({
                funcaoId: funcao.id
            })

            // Carrega os módulos da função.
            await funcao.load('modulos')

            return response.status(201).send({
                status: true,
                message: `Registro ${funcao.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: funcao
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos as funções.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as funções existentes.
            const funcoes = await Funcao.query()
                .preload('modulos', (query) => {
                    query.select(['id', 'descricao', 'ativo'])
                })
                .orderBy('descricao', 'asc')

            // Verifica se não foi retornado nenhum registro.
            if (funcoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: funcoes
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar as funções ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as funções ativas.
            const funcoes = await Funcao.query()
                .preload('modulos', (query) => {
                    query.select(['id', 'descricao', 'ativo'])
                }).where('ativo', true)
                .orderBy('descricao', 'asc')

            // Verifica se não foi retornado nenhum registro.
            if (funcoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: funcoes
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar a função por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a função pelo id informado.
            const funcao = await Funcao.query()
                .preload('modulos', (query) => {
                    query.select(['id', 'descricao', 'ativo'])
                }).where('id', params.id).firstOrFail()

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: funcao
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar as funções ativas por descricao.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FuncaoController
     */
    public async buscarPorDescricao({ response, params }: HttpContextContract): Promise<any> {
        try {

            // Converte a string para o formato aceito.
            const descricao = params.descricao.replace('%20', ' ').toLowerCase()

            // Busca o módulo pela descrição informada.
            const funcoes = await Funcao.query()
                .preload('modulos', (query) => {
                    query.select(['id', 'descricao', 'ativo'])
                })
                .where('ativo', true)
                .andWhereILike('descricao', `%${descricao}%`)
                .orderBy('descricao', 'asc')

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: funcoes
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
