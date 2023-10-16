import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUnidadeValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    descricao: schema.string([
      rules.maxLength(150)
    ]),
    razaoSocial: schema.string([
      rules.maxLength(150)
    ]),
    cnpj: schema.string([
      rules.cnpj()
    ]),
    telefone: schema.string([
      rules.telefone()
    ]),
    email: schema.string([
      rules.email()
    ]),
    cep: schema.string([
      rules.cep()
    ]),
    uf: schema.string([
      rules.regex(/^[A-Z]{2}/)
    ]),
    municipio: schema.string([
      rules.maxLength(150)
    ]),
    bairro: schema.string([
      rules.maxLength(150)
    ]),
    rua: schema.string([
      rules.maxLength(150)
    ]),
    numero: schema.string([
      rules.maxLength(50)
    ]),
    complemento: schema.string.nullable([
      rules.maxLength(150)
    ]),
    inscricaoEstadual: schema.string.nullable([
      rules.maxLength(50)
    ]),
    inscricaoMunicipal: schema.string.nullable([
      rules.maxLength(50)
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'required': 'Campo {{field}} é obrigatório',
    'maxLength': 'Campo {{field}} deve possuir tamanho máximo de {{options.maxLength}}',
    'uf.regex': 'O UF informado é invalido'
  }
}
