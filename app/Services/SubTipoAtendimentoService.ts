import SubTipoAtendimento from "App/Models/SubTipoAtendimento"

export default class SubTipoAtendimentoService {

    public async buscarTodos() {
        return await SubTipoAtendimento.query()
    }

    public async buscarAtivos() {
        return await SubTipoAtendimento.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await SubTipoAtendimento.findOrFail(id)
    }

    public async cadastrar(subTipoAtendimento: any) {
        return await SubTipoAtendimento.create(subTipoAtendimento)
    }

    public async atualizar(novoSubTipoAtendimento: any, id: number) {
        let subTipoAtendimento = await SubTipoAtendimento.findOrFail(id)
        subTipoAtendimento.merge(novoSubTipoAtendimento)
        return await subTipoAtendimento.save()
    }

    public async ativar(id: number) {
        let subTipoAtendimento = await SubTipoAtendimento.findOrFail(id)
        subTipoAtendimento.ativo = !subTipoAtendimento.ativo
        return await subTipoAtendimento.save()
    }

}