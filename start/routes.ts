/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('api/v1/login', 'UsuarioController.autenticar')

Route.group(() => {
  Route.post('', 'ModuloController.cadastrar')
  Route.put(':id', 'ModuloController.atualizar')
  Route.patch(':id', 'ModuloController.ativar')
  Route.get('', 'ModuloController.buscarTodos')
  Route.get('ativos', 'ModuloController.buscarAtivos')
  Route.get(':id', 'ModuloController.buscarPorId')
  Route.get('descricao/:descricao', 'ModuloController.buscarPorDescricao').where('descricao', /^[%a-zA-Z0-9]+$/)
}).prefix('api/v1/modulo').middleware(['auth']).where('id', Route.matchers.number())

Route.group(() => {
  Route.post('', 'UnidadeController.cadastrar')
  Route.put(':id', 'UnidadeController.atualizar')
  Route.patch(':id', 'UnidadeController.ativar')
  Route.get('', 'UnidadeController.buscarTodos')
  Route.get('ativos', 'UnidadeController.buscarAtivos')
  Route.get(':id', 'UnidadeController.buscarPorId')
  Route.get('descricao/:descricao', 'UnidadeController.buscarPorDescricao').where('descricao', /^[%a-zA-Z0-9]+$/)
}).prefix('api/v1/unidade').middleware(['auth']).where('id', Route.matchers.number())

Route.group(() => {
  Route.post('', 'FuncaoController.cadastrar')
  Route.put(':id', 'FuncaoController.atualizar')
  Route.patch(':id', 'FuncaoController.ativar')
  Route.get('', 'FuncaoController.buscarTodos')
  Route.get('ativos', 'FuncaoController.buscarAtivos')
  Route.get(':id', 'FuncaoController.buscarPorId')
  Route.get('descricao/:descricao', 'FuncaoController.buscarPorDescricao').where('descricao', /^[%a-zA-Z0-9]+$/)
}).prefix('api/v1/funcao').middleware(['auth']).where('id', Route.matchers.number())

Route.group(() => {
  Route.post('', 'SetorController.cadastrar')
  Route.put(':id', 'SetorController.atualizar')
  Route.patch(':id', 'SetorController.ativar')
  Route.get('', 'SetorController.buscarTodos')
  Route.get('ativos', 'SetorController.buscarAtivos')
  Route.get(':id', 'SetorController.buscarPorId')
  Route.get('descricao/:descricao', 'SetorController.buscarPorDescricao').where('descricao', /^[%a-zA-Z0-9]+$/)
}).prefix('api/v1/setor').middleware(['auth']).where('id', Route.matchers.number())

Route.group(() => {
  Route.post('', 'UsuarioController.cadastrar')
  Route.put(':id', 'UsuarioController.atualizar')
  Route.patch(':id', 'UsuarioController.ativar')
  Route.get('', 'UsuarioController.buscarTodos')
  Route.get('ativos', 'UsuarioController.buscarAtivos')
  Route.get(':id', 'UsuarioController.buscarPorId')
  Route.get('descricao/:descricao', 'UsuarioController.buscarPorDescricao').where('descricao', /^[%a-zA-Z0-9]+$/)
}).prefix('api/v1/usuario').middleware(['auth']).where('id', Route.matchers.number())

Route.group(() => {
  Route.post('', 'RegiaoController.cadastrar')
  Route.put(':id', 'RegiaoController.atualizar')
  Route.patch(':id', 'RegiaoController.ativar')
  Route.get('', 'RegiaoController.buscarTodos')
  Route.get('ativos', 'RegiaoController.buscarAtivos')
  Route.get(':id', 'RegiaoController.buscarPorId')
}).prefix('api/v1/regiao').middleware(['auth'])

Route.group(() => {
  Route.post('', 'PlanoController.cadastrar')
  Route.put(':id', 'PlanoController.atualizar')
  Route.patch(':id', 'PlanoController.ativar')
  Route.get('', 'PlanoController.buscarTodos')
  Route.get('ativos', 'PlanoController.buscarAtivos')
  Route.get(':id', 'PlanoController.buscarPorId')
}).prefix('api/v1/plano').middleware(['auth'])

Route.group(() => {
  Route.post('', 'EstadoCivilController.cadastrar')
  Route.put(':id', 'EstadoCivilController.atualizar')
  Route.patch(':id', 'EstadoCivilController.ativar')
  Route.get('', 'EstadoCivilController.buscarTodos')
  Route.get('ativos', 'EstadoCivilController.buscarAtivos')
  Route.get(':id', 'EstadoCivilController.buscarPorId')
}).prefix('api/v1/estadocivil').middleware(['auth'])

Route.group(() => {
  Route.post('', 'ReligiaoController.cadastrar')
  Route.put(':id', 'ReligiaoController.atualizar')
  Route.patch(':id', 'ReligiaoController.ativar')
  Route.get('', 'ReligiaoController.buscarTodos')
  Route.get('ativos', 'ReligiaoController.buscarAtivos')
  Route.get(':id', 'ReligiaoController.buscarPorId')
}).prefix('api/v1/religiao').middleware(['auth'])

Route.group(() => {
  Route.post('', 'MunicipioController.cadastrar')
  Route.put(':id', 'MunicipioController.atualizar')
  Route.patch(':id', 'MunicipioController.ativar')
  Route.get('', 'MunicipioController.buscarTodos')
  Route.get('ativos', 'MunicipioController.buscarAtivos')
  Route.get(':id', 'MunicipioController.buscarPorId')
}).prefix('api/v1/municipio').middleware(['auth'])

Route.group(() => {
  Route.post('', 'RegiaoBairroController.cadastrar')
  Route.put(':id', 'RegiaoBairroController.atualizar')
  Route.patch(':id', 'RegiaoBairroController.ativar')
  Route.get('', 'RegiaoBairroController.buscarTodos')
  Route.get('ativos', 'RegiaoBairroController.buscarAtivos')
  Route.get(':id', 'RegiaoBairroController.buscarPorId')
}).prefix('api/v1/regiaobairro').middleware(['auth'])

Route.group(() => {
  Route.post('', 'BairroController.cadastrar')
  Route.put(':id', 'BairroController.atualizar')
  Route.patch(':id', 'BairroController.ativar')
  Route.get('', 'BairroController.buscarTodos')
  Route.get('ativos', 'BairroController.buscarAtivos')
  Route.get(':id', 'BairroController.buscarPorId')
}).prefix('api/v1/bairro').middleware(['auth'])

Route.group(() => {
  Route.post('', 'RotaController.cadastrar')
  Route.put(':id', 'RotaController.atualizar')
  Route.patch(':id', 'RotaController.ativar')
  Route.get('', 'RotaController.buscarTodos')
  Route.get('ativos', 'RotaController.buscarAtivos')
  Route.get(':id', 'RotaController.buscarPorId')
}).prefix('api/v1/rota').middleware(['auth'])

Route.group(() => {
  Route.post('', 'ConcorrenteController.cadastrar')
  Route.put(':id', 'ConcorrenteController.atualizar')
  Route.patch(':id', 'ConcorrenteController.ativar')
  Route.get('', 'ConcorrenteController.buscarTodos')
  Route.get('ativos', 'ConcorrenteController.buscarAtivos')
  Route.get(':id', 'ConcorrenteController.buscarPorId')
}).prefix('api/v1/concorrente').middleware(['auth'])

Route.group(() => {
  Route.post('', 'SituacaoController.cadastrar')
  Route.put(':id', 'SituacaoController.atualizar')
  Route.patch(':id', 'SituacaoController.ativar')
  Route.get('', 'SituacaoController.buscarTodos')
  Route.get('ativos', 'SituacaoController.buscarAtivos')
  Route.get(':id', 'SituacaoController.buscarPorId')
}).prefix('api/v1/situacao').middleware(['auth'])

Route.group(() => {
  Route.post('', 'AdicionalController.cadastrar')
  Route.put(':id', 'AdicionalController.atualizar')
  Route.patch(':id', 'AdicionalController.ativar')
  Route.get('', 'AdicionalController.buscarTodos')
  Route.get('ativos', 'AdicionalController.buscarAtivos')
  Route.get(':id', 'AdicionalController.buscarPorId')
}).prefix('api/v1/adicional').middleware(['auth'])

Route.group(() => {
  Route.post('', 'TipoAtendimentoController.cadastrar')
  Route.put(':id', 'TipoAtendimentoController.atualizar')
  Route.patch(':id', 'TipoAtendimentoController.ativar')
  Route.get('', 'TipoAtendimentoController.buscarTodos')
  Route.get('ativos', 'TipoAtendimentoController.buscarAtivos')
  Route.get(':id', 'TipoAtendimentoController.buscarPorId')
}).prefix('api/v1/tipoatendimento').middleware(['auth'])

Route.group(() => {
  Route.post('', 'SubTipoAtendimentoController.cadastrar')
  Route.put(':id', 'SubTipoAtendimentoController.atualizar')
  Route.patch(':id', 'SubTipoAtendimentoController.ativar')
  Route.get('', 'SubTipoAtendimentoController.buscarTodos')
  Route.get('ativos', 'SubTipoAtendimentoController.buscarAtivos')
  Route.get(':id', 'SubTipoAtendimentoController.buscarPorId')
}).prefix('api/v1/subtipoatendimento').middleware(['auth'])

Route.group(() => {
  Route.post('', 'ParentescoController.cadastrar')
  Route.put(':id', 'ParentescoController.atualizar')
  Route.patch(':id', 'ParentescoController.ativar')
  Route.get('', 'ParentescoController.buscarTodos')
  Route.get('ativos', 'ParentescoController.buscarAtivos')
  Route.get(':id', 'ParentescoController.buscarPorId')
}).prefix('api/v1/parentesco').middleware(['auth'])

Route.group(() => {
  Route.post('', 'EspecieController.cadastrar')
  Route.put(':id', 'EspecieController.atualizar')
  Route.patch(':id', 'EspecieController.ativar')
  Route.get('', 'EspecieController.buscarTodos')
  Route.get('ativos', 'EspecieController.buscarAtivos')
  Route.get(':id', 'EspecieController.buscarPorId')
}).prefix('api/v1/especie').middleware(['auth'])

Route.group(() => {
  Route.post('', 'RacaController.cadastrar')
  Route.put(':id', 'RacaController.atualizar')
  Route.patch(':id', 'RacaController.ativar')
  Route.get('', 'RacaController.buscarTodos')
  Route.get('ativos', 'RacaController.buscarAtivos')
  Route.get(':id', 'RacaController.buscarPorId')
}).prefix('api/v1/raca').middleware(['auth'])

Route.group(() => {
  Route.post('', 'CategoriaHistoricoController.cadastrar')
  Route.put(':id', 'CategoriaHistoricoController.atualizar')
  Route.patch(':id', 'CategoriaHistoricoController.ativar')
  Route.get('', 'CategoriaHistoricoController.buscarTodos')
  Route.get('ativos', 'CategoriaHistoricoController.buscarAtivos')
  Route.get(':id', 'CategoriaHistoricoController.buscarPorId')
}).prefix('api/v1/categoriahistorico').middleware(['auth'])

Route.group(() => {
  Route.post('', 'SubCategoriaHistoricoController.cadastrar')
  Route.put(':id', 'SubCategoriaHistoricoController.atualizar')
  Route.patch(':id', 'SubCategoriaHistoricoController.ativar')
  Route.get('', 'SubCategoriaHistoricoController.buscarTodos')
  Route.get('ativos', 'SubCategoriaHistoricoController.buscarAtivos')
  Route.get(':id', 'SubCategoriaHistoricoController.buscarPorId')
}).prefix('api/v1/subcategoriahistorico').middleware(['auth'])

Route.group(() => {
  Route.post('', 'BancoController.cadastrar')
  Route.put(':id', 'BancoController.atualizar')
  Route.patch(':id', 'BancoController.ativar')
  Route.get('', 'BancoController.buscarTodos')
  Route.get('ativos', 'BancoController.buscarAtivos')
  Route.get(':id', 'BancoController.buscarPorId')
}).prefix('api/v1/banco').middleware(['auth'])

Route.group(() => {
  Route.post('', 'TipoCaixaController.cadastrar')
  Route.put(':id', 'TipoCaixaController.atualizar')
  Route.patch(':id', 'TipoCaixaController.ativar')
  Route.get('', 'TipoCaixaController.buscarTodos')
  Route.get('ativos', 'TipoCaixaController.buscarAtivos')
  Route.get(':id', 'TipoCaixaController.buscarPorId')
}).prefix('api/v1/tipocaixa').middleware(['auth'])

Route.group(() => {
  Route.post('', 'ContaController.cadastrar')
  Route.put(':id', 'ContaController.atualizar')
  Route.patch(':id', 'ContaController.ativar')
  Route.get('', 'ContaController.buscarTodos')
  Route.get('ativos', 'ContaController.buscarAtivos')
  Route.get(':id', 'ContaController.buscarPorId')
}).prefix('api/v1/conta').middleware(['auth'])

Route.group(() => {
  Route.post('', 'FormaPagamentoController.cadastrar')
  Route.put(':id', 'FormaPagamentoController.atualizar')
  Route.patch(':id', 'FormaPagamentoController.ativar')
  Route.get('', 'FormaPagamentoController.buscarTodos')
  Route.get('ativos', 'FormaPagamentoController.buscarAtivos')
  Route.get(':id', 'FormaPagamentoController.buscarPorId')
}).prefix('api/v1/formapagamento').middleware(['auth'])

Route.group(() => {
  Route.post('', 'FornecedorController.cadastrar')
  Route.put(':id', 'FornecedorController.atualizar')
  Route.patch(':id', 'FornecedorController.ativar')
  Route.get('', 'FornecedorController.buscarTodos')
  Route.get('ativos', 'FornecedorController.buscarAtivos')
  Route.get(':id', 'FornecedorController.buscarPorId')
}).prefix('api/v1/fornecedor').middleware(['auth'])

Route.group(() => {
  Route.post('', 'PlanoContaController.cadastrar')
  Route.put(':id', 'PlanoContaController.atualizar')
  Route.patch(':id', 'PlanoContaController.ativar')
  Route.get('', 'PlanoContaController.buscarTodos')
  Route.get('ativos', 'PlanoContaController.buscarAtivos')
  Route.get(':id', 'PlanoContaController.buscarPorId')
}).prefix('api/v1/planoconta').middleware(['auth'])

Route.group(() => {
  Route.post('', 'UnidadeFinanceiraController.cadastrar')
  Route.put(':id', 'UnidadeFinanceiraController.atualizar')
  Route.patch(':id', 'UnidadeFinanceiraController.ativar')
  Route.get('', 'UnidadeFinanceiraController.buscarTodos')
  Route.get('ativos', 'UnidadeFinanceiraController.buscarAtivos')
  Route.get(':id', 'UnidadeFinanceiraController.buscarPorId')
}).prefix('api/v1/unidadefinanceira').middleware(['auth'])

Route.group(() => {
  Route.post('', 'CategoriaItemController.cadastrar')
  Route.put(':id', 'CategoriaItemController.atualizar')
  Route.patch(':id', 'CategoriaItemController.ativar')
  Route.get('', 'CategoriaItemController.buscarTodos')
  Route.get('ativos', 'CategoriaItemController.buscarAtivos')
  Route.get(':id', 'CategoriaItemController.buscarPorId')
}).prefix('api/v1/categoriaitem').middleware(['auth'])

Route.group(() => {
  Route.post('', 'ItemController.cadastrar')
  Route.put(':id', 'ItemController.atualizar')
  Route.patch(':id', 'ItemController.ativar')
  Route.get('', 'ItemController.buscarTodos')
  Route.get('ativos', 'ItemController.buscarAtivos')
  Route.get(':id', 'ItemController.buscarPorId')
}).prefix('api/v1/item').middleware(['auth'])

Route.group(() => {
  Route.post('', 'DescontoRegraController.cadastrar')
  Route.put(':id', 'DescontoRegraController.atualizar')
  Route.patch(':id', 'DescontoRegraController.ativar')
  Route.get('', 'DescontoRegraController.buscarTodos')
  Route.get('ativos', 'DescontoRegraController.buscarAtivos')
  Route.get(':id', 'DescontoRegraController.buscarPorId')
}).prefix('api/v1/descontoregra').middleware(['auth'])

Route.group(() => {
  Route.post('', 'TemplateController.cadastrar')
  Route.put(':id', 'TemplateController.atualizar')
  Route.patch(':id', 'TemplateController.ativar')
  Route.get('', 'TemplateController.buscarTodos')
  Route.get('ativos', 'TemplateController.buscarAtivos')
  Route.get(':id', 'TemplateController.buscarPorId')
}).prefix('api/v1/template').middleware(['auth'])

Route.group(() => {
  Route.post('', 'CategoriaSuporteController.cadastrar')
  Route.put(':id', 'CategoriaSuporteController.atualizar')
  Route.patch(':id', 'CategoriaSuporteController.ativar')
  Route.get('', 'CategoriaSuporteController.buscarTodos')
  Route.get('ativos', 'CategoriaSuporteController.buscarAtivos')
  Route.get(':id', 'CategoriaSuporteController.buscarPorId')
}).prefix('api/v1/categoriasuporte').middleware(['auth'])

Route.group(() => {
  Route.post('', 'CampoSuporteController.cadastrar')
  Route.put(':id', 'CampoSuporteController.atualizar')
  Route.patch(':id', 'CampoSuporteController.ativar')
  Route.get('', 'CampoSuporteController.buscarTodos')
  Route.get('ativos', 'CampoSuporteController.buscarAtivos')
  Route.get(':id', 'CampoSuporteController.buscarPorId')
}).prefix('api/v1/camposuporte').middleware(['auth'])

