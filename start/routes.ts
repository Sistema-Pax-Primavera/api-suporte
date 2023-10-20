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


Route.group(() => {
  Route.post('', 'ModuloController.cadastrar')
  Route.put(':id', 'ModuloController.atualizar')
  Route.patch(':id', 'ModuloController.ativar')
  Route.get('', 'ModuloController.buscarTodos')
  Route.get('ativos', 'ModuloController.buscarAtivos')
  Route.get(':id', 'ModuloController.buscarPorId')
}).prefix('ap1/v1/modulo').middleware('auth')