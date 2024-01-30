import Permissao from "App/Models/Permissao"

export default class PermissaoService {

    public async buscarTodos() {
        return await Permissao.query()
    }

    public async buscarAtivos() {
        return await Permissao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Permissao.findOrFail(id)
    }

    public async cadastrar(permissao: any) {
        return await Permissao.create(permissao)
    }

    public async atualizar(novaPermissao: any, id: number) {
        let permissao = await Permissao.findOrFail(id)
        permissao.merge(novaPermissao)
        return await permissao.save()
    }

    public async ativar(id: number) {
        let permissao = await Permissao.findOrFail(id)
        permissao.ativo = !permissao.ativo
        return await permissao.save()
    }

}