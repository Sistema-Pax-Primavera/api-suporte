import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Cobrador from 'App/Models/Cobrador'
import Funcao from 'App/Models/Funcao'
import Modulo from 'App/Models/Modulo'
import Permissao from 'App/Models/Permissao'
import Unidade from 'App/Models/Unidade'
import Usuario from 'App/Models/Usuario'
import CreateUsuarioValidator from 'App/Validators/CreateUsuarioValidator'
import UpdateUsuarioValidator from 'App/Validators/UpdateUsuarioValidator'

export default class UsuarioController {

    /**
     * Função para vincular as permissões do usuário.
     *
     * @public
     * @param {any[]} permissoes
     * @param {number} usuarioId
     * @param {(string | null | undefined)} usuario
     * @memberof UsuarioController
     */
    public async vincularPermissoes(permissoes: any[], usuarioId: number, usuario: string | null | undefined) {
        // Inativa todas as permissões existentes do usuário.
        await Permissao.query()
            .where('usuarioId', usuarioId)
            .update({ ativo: false, updatedBy: usuario })

        const permissoesFormatadas: any[] = []

        for (const item of permissoes) {
            // Verifica se o módulo existe e está ativo.
            let modulo = await Modulo.query()
                .where('id', item.moduloId)
                .where('ativo', true)
                .first()

            // Verifica se a unidade existe e está ativa.
            let unidade = await Unidade.query()
                .where('id', item.unidadeId)
                .where('ativo', true)
                .first()

            if (modulo && unidade) {
                permissoesFormatadas.push({
                    moduloId: item.moduloId,
                    unidadeId: item.unidadeId,
                    usuarioId: usuarioId,
                    acao: item.acao,
                    ativo: true,
                    createdBy: usuario,
                    updatedBy: usuario
                })
            }
        }

        // Persiste no banco as permissões atualizadas.
        await Permissao.updateOrCreateMany(['moduloId', 'unidadeId', 'usuarioId'], permissoesFormatadas)
    }

    /**
     * Função para vincular o registro de cobrador ao usuário caso o mesmo possua essa função.
     *
     * @private
     * @param {*} cobrador
     * @memberof UsuarioController
     */
    private async vincularCobrador(cobrador: any) {
        // Verifica se o usuário possui um registro de cobrador.
        const cobradorAntigo = await Cobrador.query().where('usuarioId', cobrador.usuarioId).first()

        // Caso seja encontrado algum registro, é feita a atualização, senão, é inserido um novo registro.
        if (cobradorAntigo) {
            cobradorAntigo.merge({
                descricao: cobrador.descricao,
                ativo: cobrador.ativo,
                updatedBy: cobrador.usuario
            })

            await cobradorAntigo.save()
        } else {
            await Cobrador.create({
                usuarioId: cobrador.usuarioId,
                descricao: cobrador.descricao,
                createdBy: cobrador.usuario
            })
        }
    }

    /**
     * Método para autenticar usuário.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UsuarioController
     */
    public async autenticar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {
            // Valida os campos informados.
            const { cpf, senha } = await request.validate({
                schema: schema.create({
                    cpf: schema.string([
                        rules.cpf()
                    ]),
                    senha: schema.string()
                }),
                messages: {
                    'required': 'Campo {{field}} é obrigatório',
                }
            })

            // Valida as credenciais e gera o token.
            const token = await auth.use('api').attempt(cpf.replace(/[^0-9]/g, ''), senha, {
                expiresIn: '12 hours',
            })

            // Busca informações adicionais do usuario.
            const usuario = await Usuario.findOrFail(token.user.id)

            return response.status(200).send({
                status: true,
                message: "Usuário autorizado!",
                data: {
                    ...usuario.toJSON(),
                    token: token.token
                }
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para cadastrar usuário.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UsuarioController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                unidadeId, setorId, funcaoId, nome, cpf,
                password, porcentagemDesconto, permissoes
            } = await request.validate(CreateUsuarioValidator)

            // Insere o registro no banco de dados.
            const usuario = await Usuario.create({
                unidadeId, setorId, funcaoId,
                nome, cpf, porcentagemDesconto,
                password: password,
                createdBy: auth.user?.nome
            })

            // Chama a função para vincular as permissões.
            await this.vincularPermissoes(permissoes, usuario.id, auth.user?.nome)

            // Verifica se o usuário possui a função de cobrador.
            const funcao = await Funcao.query()
                .where('id', funcaoId)
                .andWhereILike('descricao', '%COBRADOR%')
                .first()

            if (funcao) {
                const cobrador: any = {
                    usuarioId: usuario.id,
                    descricao: usuario.nome,
                    usuario: auth.user?.nome,
                    ativo: true
                }

                // Chama a função de vínculo do cobrador.
                await this.vincularCobrador(cobrador)
            }

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: usuario
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.messages ?? error.message
            })
        }
    }

    /**
     * Método para atualizar usuário.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UsuarioController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o usuário pelo id informado.
            let usuario = await Usuario.findOrFail(params.id)

            // Valida os campos informados.
            const {
                unidadeId, setorId, funcaoId, nome,
                password, porcentagemDesconto, permissoes
            } = await request.validate(UpdateUsuarioValidator)

            // Atualiza o objeto com os dados novos.
            usuario.merge({
                unidadeId, setorId, funcaoId, nome,
                password: password ?? usuario.password,
                porcentagemDesconto,
                updatedBy: auth.user?.nome
            })

            // Persiste no banco o objeto atualizado.
            await usuario.save()

            // Chama a função para vincular as permissões.
            await this.vincularPermissoes(permissoes, usuario.id, auth.user?.nome)

            // Verifica se o usuário possui a função de cobrador.
            const funcao = await Funcao.query()
                .where('id', funcaoId)
                .andWhereILike('descricao', '%COBRADOR%')
                .first()

            if (funcao) {
                const cobrador: any = {
                    usuarioId: usuario.id,
                    descricao: usuario.nome,
                    usuario: auth.user?.nome,
                    ativo: usuario.ativo
                }

                // Chama a função de vínculo do cobrador.
                await this.vincularCobrador(cobrador)
            }

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: usuario
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar usuário.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UsuarioController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o usuário pelo id informado.
            const usuario = await Usuario.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            usuario.merge({
                ativo: !usuario.ativo,
                updatedBy: auth.user?.nome
            })

            // Persiste no banco o objeto atualizado.
            await usuario.save()

            // Ativa/Inativa as permissões do usuário.
            await Permissao.query()
                .where('usuarioId', usuario.id)
                .update({ ativo: usuario.ativo, updatedBy: auth.user?.nome })

            // Ativa/Inativa o registro de cobrador.
            await Cobrador.query()
                .where('usuarioId', usuario.id)
                .update({ ativo: usuario.ativo, updatedBy: auth.user?.nome })

            return response.status(201).send({
                status: true,
                message: `Registro ${usuario.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: usuario
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todos os usuários.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UsuarioController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os usuários existentes.
            const usuarios = await Usuario.query()

            // Verifica se não foi retornado nenhum registro.
            if (usuarios.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: usuarios
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os usuários ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UsuarioController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os usuários ativos.
            const usuarios = await Usuario.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (usuarios.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: usuarios
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar o usuário por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UsuarioController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o usuário pelo id informado.
            const usuario = await Usuario.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: usuario
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar os usuários ativos por descricao.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UsuarioController
     */
    public async buscarPorDescricao({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Converte a string para o formato aceito.
            const descricao = params.descricao.replace('%20', ' ').toLowerCase()

            // Busca o usuário pela descrição informada.
            const usuarios = await Usuario.query()
                .where('ativo', true)
                .andWhere((query) => {
                    query.whereILike('nome', `%${descricao}%`)
                        .orWhereILike('cpf', `%${descricao}%`)
                })
                .orderBy('nome', 'asc')

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: usuarios
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
