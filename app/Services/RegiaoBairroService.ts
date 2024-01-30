import RegiaoBairro from "App/Models/RegiaoBairro"

export default class RegiaoBairroService {

    public async buscarTodos() {
        return await RegiaoBairro.query()
    }

    public async buscarAtivos() {
        return await RegiaoBairro.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await RegiaoBairro.findOrFail(id)
    }

    public async cadastrar(regiaoBairro: any) {
        return await RegiaoBairro.create(regiaoBairro)
    }

    public async atualizar(novaRegiaoBairro: any, id: number) {
        let regiaoBairro = await RegiaoBairro.findOrFail(id)
        regiaoBairro.merge(novaRegiaoBairro)
        return await regiaoBairro.save()
    }

    public async ativar(id: number) {
        let regiaoBairro = await RegiaoBairro.findOrFail(id)
        regiaoBairro.ativo = !regiaoBairro.ativo
        return await regiaoBairro.save()
    }

}