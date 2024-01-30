import ContaPagar from "App/Models/ContaPagar"

export default class ContaPagarService {

    public async buscarTodos() {
        return await ContaPagar.query()
    }

    public async buscarAtivos() {
        return await ContaPagar.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await ContaPagar.findOrFail(id)
    }

    public async cadastrar(contaPagar: any) {
        return await ContaPagar.create(contaPagar)
    }

    public async atualizar(novaContaPagar: any, id: number) {
        let contaPagar = await ContaPagar.findOrFail(id)
        contaPagar.merge(novaContaPagar)
        return await contaPagar.save()
    }

    public async ativar(id: number) {
        let contaPagar = await ContaPagar.findOrFail(id)
        contaPagar.ativo = !contaPagar.ativo
        return await contaPagar.save()
    }

}