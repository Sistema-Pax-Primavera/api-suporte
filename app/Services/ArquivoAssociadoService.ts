import ArquivoAssociado from "App/Models/ArquivoAssociado"

export default class ArquivoAssociadoService {

    public async buscarTodos() {
        return await ArquivoAssociado.query()
    }

    public async buscarAtivos() {
        return await ArquivoAssociado.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await ArquivoAssociado.findOrFail(id)
    }

    public async cadastrar(arquivoAssociado: any) {
        return await ArquivoAssociado.create(arquivoAssociado)
    }

    public async atualizar(novoArquivoAssociado: any, id: number) {
        let arquivoAssociado = await ArquivoAssociado.findOrFail(id)
        arquivoAssociado.merge(novoArquivoAssociado)
        return await arquivoAssociado.save()
    }

    public async ativar(id: number) {
        let arquivoAssociado = await ArquivoAssociado.findOrFail(id)
        arquivoAssociado.ativo = !arquivoAssociado.ativo
        return await arquivoAssociado.save()
    }

}