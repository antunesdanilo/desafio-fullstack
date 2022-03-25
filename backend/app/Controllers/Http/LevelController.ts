/**
 * @author {Danilo Antunes}
 * @extends BaseController
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'

import Level from 'App/Models/Level'
import Developer from 'App/Models/Developer'

export default class LevelController extends BaseController {
  /**
   * Show a list of levels
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async index({ request, response }: HttpContextContract) {
    const keyword = request.qs().k

    const query = Level.query().withCount('developers')

    if (keyword) {
      query.whereRaw(`level_name LIKE "%${keyword}%"`)
    }

    const levels = await query

    return this.sendResponse(response, levels)
  }

  /**
   * Show a single level
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async show({ response, params }: HttpContextContract) {
    const levelId = parseInt(params.id)

    if (!levelId) {
      return this.sendError(response, 'ID informado é inválido.', 400)
    }

    const level = await Level.query()
      .where({ level_id: levelId })
      .preload('developers')
      .limit(1)
      .first()

    if (!level) {
      return this.sendError(response, 'Não foi encontrado um nível associado ao ID informado.', 404)
    }

    return this.sendResponse(response, level)
  }

  /**
   * Create a new Level
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    try {
      const level = await Level.create({
        level_name: body.level_name,
      })

      return this.sendResponse(response, level, null, 201)
    } catch (error) {
      return this.sendError(response, error.code + ' - ' + error.sqlMessage, 500)
    }
  }

  /**
   * Update an existing level
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async update({ request, response, params }: HttpContextContract) {
    const body = request.body()

    const levelId = parseInt(params.id)

    if (!levelId) {
      return this.sendError(response, 'ID informado é inválido.', 400)
    }

    const level = await Level.query().where({ level_id: levelId }).limit(1).first()

    if (!level) {
      return this.sendError(response, 'Não foi encontrado um nível associado ao ID informado.', 404)
    }

    try {
      await level
        .merge({
          level_name: body.level_name,
        })
        .save()

      this.sendResponse(response, level)
    } catch (error) {
      return this.sendError(response, error.code, 500)
    }
  }

  /**
   * Remove an existing level, since it's empty
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async destroy({ response, params }: HttpContextContract) {
    const levelId = parseInt(params.id)

    if (!levelId) {
      return this.sendError(response, 'ID informado é inválido.', 400)
    }

    const level = await Level.query().where({ level_id: levelId }).limit(1).first()

    if (!level) {
      return this.sendError(response, 'Não foi encontrado um nível associado ao ID informado.', 404)
    }

    const developers = await Developer.query().where({ level_id: levelId })

    if (developers.length) {
      return this.sendError(
        response,
        'Não é possível excluir este nível, pois há um ou mais desenvolvedores associados a ele.',
        501
      )
    }

    try {
      level.delete()

      this.sendResponse(response, null, null, 204)
    } catch (error) {
      return this.sendError(response, error.code, 500)
    }
  }
}
