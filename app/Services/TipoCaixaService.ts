import TipoCaixa from "App/Models/TipoCaixa"

export default class TipoCaixaService {

    public async buscarTodos() {
        return await TipoCaixa.query()
    }

    public async buscarAtivos() {
        return await TipoCaixa.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await TipoCaixa.findOrFail(id)
    }

    public async cadastrar(tipoCaixa: any) {
        return await TipoCaixa.create(tipoCaixa)
    }

    public async atualizar(novoTipoCaixa: any, id: number) {
        let tipoCaixa = await TipoCaixa.findOrFail(id)
        tipoCaixa.merge(novoTipoCaixa)
        return await tipoCaixa.save()
    }

    public async ativar(id: number) {
        let tipoCaixa = await TipoCaixa.findOrFail(id)
        tipoCaixa.ativo = !tipoCaixa.ativo
        return await tipoCaixa.save()
    }

}