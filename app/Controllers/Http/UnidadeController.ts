import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Unidade from 'App/Models/Unidade'
import CreateUnidadeValidator from 'App/Validators/CreateUnidadeValidator'

export default class UnidadeController {

    /**
    * Método para cadastrar unidade.
    *
    * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
    * @return {*} 
    * @memberof UnidadeController
    */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                descricao, razaoSocial, cnpj, telefone, email, cep,
                uf, municipio, bairro, rua, numero, complemento,
                inscricaoEstadual, inscricaoMunicipal
            } = await request.validate(CreateUnidadeValidator)

            // Insere o registro no banco de dados.
            const unidade = await Unidade.create({
                descricao, razaoSocial, cnpj, telefone, email, cep,
                uf, municipio, bairro, rua, numero, complemento,
                inscricaoEstadual, inscricaoMunicipal,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: unidade
            })
        } catch (error) {
            console.log(error.messages)
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para atualizar unidade.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a unidade pelo id informado.
            const unidade = await Unidade.findOrFail(params.id)

            // Valida os campos informados.
            const {
                descricao, razaoSocial, cnpj, telefone, email, cep,
                uf, municipio, bairro, rua, numero, complemento,
                inscricaoEstadual, inscricaoMunicipal
            } = await request.validate(CreateUnidadeValidator)

            // Atualiza o objeto com os dados novos.
            unidade.merge({
                descricao, razaoSocial, cnpj, telefone, email, cep, uf, municipio, bairro, rua, numero, 
                complemento, inscricaoEstadual, inscricaoMunicipal, updatedBy: auth.user?.nome
            })

            // Persiste no banco o objeto atualizado.
            await unidade.save()

            return response.status(201).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: unidade
            })
        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para ativar/inativar unidade.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a unidade pelo id informado.
            const unidade = await Unidade.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            unidade.merge({
                ativo: !unidade.ativo,
                updatedBy: auth.user?.nome
            })

            // Persiste no banco o objeto atualizado.
            await unidade.save()

            return response.status(201).send({
                status: true,
                message: `Registro ${unidade.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: unidade
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar todas as unidades.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as unidades existentes.
            const unidades = await Unidade.query()

            // Verifica se não foi retornado nenhum registro.
            if (unidades.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: unidades
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar as unidades ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todas as unidades ativas.
            const unidades = await Unidade.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (unidades.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: unidades
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar a unidade por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a unidade pelo id informado.
            const unidade = await Unidade.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: unidade
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * Método para buscar a unidade por descricao.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof UnidadeController
     */
    public async buscarPorDescricao({ response, params }: HttpContextContract): Promise<any> {
        try {

            // Converte a string para o formato aceito.
            const descricao = params.descricao.replace('%20', ' ').toLowerCase()

            // Busca a unidade pela descrição informada.
            const unidade = await Unidade.query().whereILike('descricao', `%${descricao}%`)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: unidade
            })

        } catch (error) {
            return response.status(error.status).send({
                status: false,
                message: error.message
            })
        }
    }
}
