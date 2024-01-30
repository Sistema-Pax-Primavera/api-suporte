import Fornecedor from "App/Models/Fornecedor"

export default class FornecedorService {

    public async buscarTodos() {
        return await Fornecedor.query()
    }

    public async buscarAtivos() {
        return await Fornecedor.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Fornecedor.findOrFail(id)
    }

    public async cadastrar(fornecedor: any) {
        return await Fornecedor.create(fornecedor)
    }

    public async atualizar(novoFornecedor: any, id: number) {
        let fornecedor = await Fornecedor.findOrFail(id)
        fornecedor.merge(novoFornecedor)
        return await fornecedor.save()
    }

    public async ativar(id: number) {
        let fornecedor = await Fornecedor.findOrFail(id)
        fornecedor.ativo = !fornecedor.ativo
        return await fornecedor.save()
    }

}