import CustomError from "App/Exceptions/CustomError"
import CategoriaSuporte from "App/Models/CategoriaSuporte"
import CrudDatabase from "App/Utils/CrudDatabase"
import validateFields from "App/Utils/Functions"
import { FieldOptions } from "App/Utils/Globals"

interface CategoriaSuporteInterface {
    [key: string]: FieldOptions
}

const fields: CategoriaSuporteInterface = {
    descricao: { type: 'string', required: true },
    prioridade: { type: 'number', required: true },
    setor: { type: 'array', required: false, nestedFields: { item: { type: 'number', required: true } } },
    ativo: { type: 'boolean', required: false, default: true },
    createdBy: { type: 'string', required: true },
    createdAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' },
    updatedBy: { type: 'string', required: false },
    updatedAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' }
}

export default class CategoriaSuporteService {
    serviceDatabase = new CrudDatabase(CategoriaSuporte)

    public async buscarTodos() {
        return await this.serviceDatabase.findAll()
    }

    public async buscarAtivos() {
        return await this.serviceDatabase.findByFilter({ ativo: true })
    }

    public async buscarPorId(id: number) {
        return await this.serviceDatabase.findById(id)
    }

    public async cadastrar(data: object) {
        data["createdBy"] = 'ADMIN'

        const verify = await validateFields(data, fields, this.serviceDatabase)
        if (!verify["status"]) throw new CustomError(verify["message"], 404)

        return await this.serviceDatabase.insert(data)
    }

    public async atualizar(data: object, id: number) {
        data["createdBy"] = 'ADMIN'
        fields["updatedBy"].required = true

        const verify = await validateFields(data, fields, this.serviceDatabase)
        if (!verify["status"]) throw new CustomError(verify["message"], 404)

        return await this.serviceDatabase.update(id, data)
    }

    public async ativar(id: number) {
        return await this.serviceDatabase.activate(id)
    }

}