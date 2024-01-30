import Usuario from "App/Models/Usuario"

export default class UsuarioService {

    public async buscarTodos() {
        return await Usuario.query()
    }

    public async buscarAtivos() {
        return await Usuario.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Usuario.findOrFail(id)
    }

    public async cadastrar(usuario: any) {
        return await Usuario.create(usuario)
    }

    public async atualizar(novoUsuario: any, id: number) {
        let usuario = await Usuario.findOrFail(id)
        usuario.merge(novoUsuario)
        return await usuario.save()
    }

    public async ativar(id: number) {
        let usuario = await Usuario.findOrFail(id)
        usuario.ativo = !usuario.ativo
        return await usuario.save()
    }

}