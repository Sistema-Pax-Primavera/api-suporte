import TipoAtendimento from "App/Models/TipoAtendimento"

export default class TipoAtendimentoService {

    public async buscarTodos() {
        return await TipoAtendimento.query()
    }

    public async buscarAtivos() {
        return await TipoAtendimento.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await TipoAtendimento.findOrFail(id)
    }

    public async cadastrar(tipoAtendimento: any) {
        return await TipoAtendimento.create(tipoAtendimento)
    }

    public async atualizar(novoTipoAtendimento: any, id: number) {
        let tipoAtendimento = await TipoAtendimento.findOrFail(id)
        tipoAtendimento.merge(novoTipoAtendimento)
        return await tipoAtendimento.save()
    }

    public async ativar(id: number) {
        let tipoAtendimento = await TipoAtendimento.findOrFail(id)
        tipoAtendimento.ativo = !tipoAtendimento.ativo
        return await tipoAtendimento.save()
    }

}