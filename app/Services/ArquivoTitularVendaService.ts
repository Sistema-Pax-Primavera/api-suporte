import ArquivoTitularVenda from "App/Models/ArquivoTitularVenda"

export default class ArquivoTitularVendaService {

    public async buscarTodos() {
        return await ArquivoTitularVenda.query()
    }

    public async buscarAtivos() {
        return await ArquivoTitularVenda.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await ArquivoTitularVenda.findOrFail(id)
    }

    public async cadastrar(arquivoTitularVenda: any) {
        return await ArquivoTitularVenda.create(arquivoTitularVenda)
    }

    public async atualizar(novoArquivoTitularVenda: any, id: number) {
        let arquivoTitularVenda = await ArquivoTitularVenda.findOrFail(id)
        arquivoTitularVenda.merge(novoArquivoTitularVenda)
        return await arquivoTitularVenda.save()
    }

    public async ativar(id: number) {
        let arquivoTitularVenda = await ArquivoTitularVenda.findOrFail(id)
        arquivoTitularVenda.ativo = !arquivoTitularVenda.ativo
        return await arquivoTitularVenda.save()
    }

}