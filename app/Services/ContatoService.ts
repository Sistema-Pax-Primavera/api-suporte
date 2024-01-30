import Contato from "App/Models/Contato"

export default class ContatoService {

    public async buscarTodos() {
        return await Contato.query()
    }

    public async buscarAtivos() {
        return await Contato.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Contato.findOrFail(id)
    }

    public async cadastrar(contato: any) {
        return await Contato.create(contato)
    }

    public async atualizar(novoContato: any, id: number) {
        let contato = await Contato.findOrFail(id)
        contato.merge(novoContato)
        return await contato.save()
    }

    public async ativar(id: number) {
        let contato = await Contato.findOrFail(id)
        contato.ativo = !contato.ativo
        return await contato.save()
    }

}