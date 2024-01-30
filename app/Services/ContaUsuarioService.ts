import ContaUsuario from "App/Models/ContaUsuario"

export default class ContaUsuarioService {

    public async buscarTodos() {
        return await ContaUsuario.query()
    }

    public async buscarAtivos() {
        return await ContaUsuario.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await ContaUsuario.findOrFail(id)
    }

    public async cadastrar(contaUsuario: any) {
        return await ContaUsuario.create(contaUsuario)
    }

    public async atualizar(novaContaUsuario: any, id: number) {
        let contaUsuario = await ContaUsuario.findOrFail(id)
        contaUsuario.merge(novaContaUsuario)
        return await contaUsuario.save()
    }

    public async ativar(id: number) {
        let contaUsuario = await ContaUsuario.findOrFail(id)
        contaUsuario.ativo = !contaUsuario.ativo
        return await contaUsuario.save()
    }

}