import ModuloFuncao from "App/Models/ModuloFuncao"

export default class ModuloFuncaoService {

    public async buscarTodos() {
        return await ModuloFuncao.query()
    }

    public async buscarAtivos() {
        return await ModuloFuncao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await ModuloFuncao.findOrFail(id)
    }

    public async cadastrar(moduloFuncao: any) {
        return await ModuloFuncao.create(moduloFuncao)
    }

    public async atualizar(novoModuloFuncao: any, id: number) {
        let moduloFuncao = await ModuloFuncao.findOrFail(id)
        moduloFuncao.merge(novoModuloFuncao)
        return await moduloFuncao.save()
    }

    public async ativar(id: number) {
        let moduloFuncao = await ModuloFuncao.findOrFail(id)
        moduloFuncao.ativo = !moduloFuncao.ativo
        return await moduloFuncao.save()
    }

}