import Setor from "App/Models/Setor"

export default class SetorService {

    public async buscarTodos() {
        return await Setor.query()
    }

    public async buscarAtivos() {
        return await Setor.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Setor.findOrFail(id)
    }

    public async cadastrar(setor: any) {
        return await Setor.create(setor)
    }

    public async atualizar(novoSetor: any, id: number) {
        let setor = await Setor.findOrFail(id)
        setor.merge(novoSetor)
        return await setor.save()
    }

    public async ativar(id: number) {
        let setor = await Setor.findOrFail(id)
        setor.ativo = !setor.ativo
        return await setor.save()
    }

}