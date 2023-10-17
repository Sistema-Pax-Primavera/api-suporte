import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Usuario from 'App/Models/Usuario'
import CreateUsuarioValidator from 'App/Validators/CreateUsuarioValidator'
import UpdateUsuarioValidator from 'App/Validators/UpdateUsuarioValidator'

export default class UsuarioController {
    
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
                senha, porcentagemDesconto
            } = await request.validate(CreateUsuarioValidator)

            // Insere o registro no banco de dados.
            const usuario = await Usuario.create({
                unidadeId, setorId, funcaoId,
                nome, cpf, porcentagemDesconto,
                password: senha,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: usuario
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
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
                senha, porcentagemDesconto
            } = await request.validate(UpdateUsuarioValidator)

            // Atualiza o objeto com os dados novos.
            usuario = {
                ...usuario, 
                unidadeId, setorId, funcaoId, nome, porcentagemDesconto,
                password: senha ?? usuario.password,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await usuario.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: usuario
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
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

            return response.status(200).send({
                status: true,
                message: `Registro ${usuario.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: usuario
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
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
            return response.status(500).send({
                status: false,
                message: error
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
            return response.status(500).send({
                status: false,
                message: error
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
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}