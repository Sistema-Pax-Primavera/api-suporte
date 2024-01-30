import MensagemMobileVenda from "App/Models/MensagemMobileVenda"

export default class MensagemMobileVendaService {

    public async buscarTodos() {
        return await MensagemMobileVenda.query()
    }

    public async buscarAtivos() {
        return await MensagemMobileVenda.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await MensagemMobileVenda.findOrFail(id)
    }

    public async cadastrar(mensagemMobileVenda: any) {
        return await MensagemMobileVenda.create(mensagemMobileVenda)
    }

    public async atualizar(novaMensagemMobile: any, id: number) {
        let mensagemMobileVenda = await MensagemMobileVenda.findOrFail(id)
        mensagemMobileVenda.merge(novaMensagemMobile)
        return await mensagemMobileVenda.save()
    }

    public async ativar(id: number) {
        let mensagemMobileVenda = await MensagemMobileVenda.findOrFail(id)
        mensagemMobileVenda.ativo = !mensagemMobileVenda.ativo
        return await mensagemMobileVenda.save()
    }

}