import ParentescoUnidade from "App/Models/ParentescoUnidade"

export default class ParentescoUnidadeService {

    public async buscarTodos() {
        return await ParentescoUnidade.query()
    }

    public async buscarAtivos() {
        return await ParentescoUnidade.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await ParentescoUnidade.findOrFail(id)
    }

    public async cadastrar(parentescoUnidade: any) {
        return await ParentescoUnidade.create(parentescoUnidade)
    }

    public async atualizar(novoParentescoUnidade: any, id: number) {
        let parentescoUnidade = await ParentescoUnidade.findOrFail(id)
        parentescoUnidade.merge(novoParentescoUnidade)
        return await parentescoUnidade.save()
    }

    public async ativar(id: number) {
        let parentescoUnidade = await ParentescoUnidade.findOrFail(id)
        parentescoUnidade.ativo = !parentescoUnidade.ativo
        return await parentescoUnidade.save()
    }

}