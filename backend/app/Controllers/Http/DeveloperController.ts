/**
 * @author {Danilo Antunes}
 * @extends BaseController
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'

import Developer from 'App/Models/Developer'

export default class DeveloperController extends BaseController {
  /**
   * Show a list of developers
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async index({ request, response }: HttpContextContract) {
    const keyword = request.qs().k

    const query = Developer.query().preload('level')

    if (keyword) {
      query.whereRaw(`developer_name LIKE "%${keyword}%"`)
    }

    const developers = await query

    return this.sendResponse(response, developers)
  }

  /**
   * Show a single developer
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async show({ response, params }: HttpContextContract) {
    const developerId = parseInt(params.id)

    if (!developerId) {
      return this.sendError(response, 'ID informado é inválido.', 400)
    }

    const developer = await Developer.query()
      .preload('level')
      .where({ developer_id: developerId })
      .limit(1)
      .first()

    if (!developer) {
      return this.sendError(
        response,
        'Não foi encontrado um developer associado ao ID informado.',
        404
      )
    }

    return this.sendResponse(response, developer)
  }

  /**
   * Create a new developer
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    if (!body.developer_name || !body.level_id || !body.gender || !body.birthday || !body.hobby) {
      return this.sendError(response, 'Todos os campos são obrigatórios', 400)
    }

    try {
      const developer = await Developer.create({
        level_id: body.level_id,
        developer_name: body.developer_name,
        gender: body.gender,
        birthday: body.birthday,
        hobby: body.hobby,
      })
      return this.sendResponse(response, developer, null, 201)
    } catch (error) {
      return this.sendError(response, error.code, 500)
    }
  }

  /**
   * Update an existing developer
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async update({ request, response, params }: HttpContextContract) {
    const body = request.body()

    const developerId = parseInt(params.id)

    if (!developerId) {
      return this.sendError(response, 'ID informado é inválido.', 400)
    }

    const developer = await Developer.query().where({ developer_id: developerId }).limit(1).first()

    if (!developer) {
      return this.sendError(
        response,
        'Não foi encontrado um developer associado ao ID informado.',
        404
      )
    }

    try {
      await developer
        .merge({
          level_id: body.level_id,
          developer_name: body.developer_name,
          gender: body.gender,
          birthday: body.birthday,
          hobby: body.hobby,
        })
        .save()

      this.sendResponse(response, developer)
    } catch (error) {
      return this.sendError(response, error.code, 500)
    }
  }

  /**
   * Remove an existing developer
   * @param {HttpContextContract}
   * @returns {void}
   */
  public async destroy({ response, params }: HttpContextContract) {
    const developerId = parseInt(params.id)

    if (!developerId) {
      return this.sendError(response, 'ID informado é inválido.', 400)
    }

    const developer = await Developer.query().where({ developer_id: developerId }).limit(1).first()

    if (!developer) {
      return this.sendError(
        response,
        'Não foi encontrado um developer associado ao ID informado.',
        404
      )
    }

    try {
      developer.delete()

      this.sendResponse(response, null, null, 204)
    } catch (error) {
      return this.sendError(response, error.code, 500)
    }
  }
}
