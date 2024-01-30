import MensagemMobile from "App/Models/MensagemMobile"

export default class MensagemMobileService {

    public async buscarTodos() {
        return await MensagemMobile.query()
    }

    public async buscarAtivos() {
        return await MensagemMobile.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await MensagemMobile.findOrFail(id)
    }

    public async cadastrar(mensagemMobile: any) {
        return await MensagemMobile.create(mensagemMobile)
    }

    public async atualizar(novaMensagemMobile: any, id: number) {
        let mensagemMobile = await MensagemMobile.findOrFail(id)
        mensagemMobile.merge(novaMensagemMobile)
        return await mensagemMobile.save()
    }

    public async ativar(id: number) {
        let mensagemMobile = await MensagemMobile.findOrFail(id)
        mensagemMobile.ativo = !mensagemMobile.ativo
        return await mensagemMobile.save()
    }

}