import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Usuario from 'App/Models/Usuario'
import CreateUsuarioValidator from 'App/Validators/CreateUsuarioValidator'
import UpdateUsuarioValidator from 'App/Validators/UpdateUsuarioValidator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Permissao from 'App/Models/Permissao'

export default class UsuarioController {

    private async vincularPermissoes(permissoes: any[], usuarioId: number, usuario: string | null | undefined) {
        await Permissao.query()
            .where('usuarioId', usuarioId)
            .update({ ativo: false, updatedBy: usuario })

        const permissoesFormatadas = permissoes.flatMap((item) => {
            return {
                moduloId: item.moduloId,
                unidadeId: item.unidadeId,
                usuarioId: usuarioId,
                acao: item.acao,
                ativo: true,
                createdBy: usuario,
                updatedBy: usuario
            }
        })

        await Permissao.updateOrCreateMany(['moduloId', 'unidadeId', 'usuarioId'], permissoesFormatadas)
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

            await this.vincularPermissoes(permissoes, usuario.id, auth.user?.nome)

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
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
                updatedBy: auth.user?.nome ?? null
            })
           
            // Persiste no banco o objeto atualizado.
            await usuario.save()

            await this.vincularPermissoes(permissoes, usuario.id, auth.user?.nome)
            
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
            usuario.ativo = !usuario.ativo
            usuario.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await usuario.save()

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
}
