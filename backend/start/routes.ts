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

Route.get('/', async () => {
  return { hello: 'world - devlist' }
})

Route.group(() => {
  Route.group(() => {
    Route.get('', 'LevelController.index')
    Route.get(':id', 'LevelController.show')
    Route.post('', 'LevelController.store')
    Route.put(':id', 'LevelController.update')
    Route.delete(':id', 'LevelController.destroy')
  }).prefix('/level')

  Route.group(() => {
    Route.get('', 'DeveloperController.index')
    Route.get(':id', 'DeveloperController.show')
    Route.post('', 'DeveloperController.store')
    Route.put(':id', 'DeveloperController.update')
    Route.delete(':id', 'DeveloperController.destroy')
  }).prefix('/developer')
}).namespace('App/Controllers/Http')

Route.any('*', async ({ response }) => {
  return response.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    code: 404,
  })
})
