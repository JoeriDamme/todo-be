import { NextFunction, Request, Response } from 'express';
import { logger } from '@lib/logger';
import { joiValidate } from '@helpers/joi/joi-validator';
import { todoSchema } from '@helpers/joi/schemas/todo-schema';
import { createTodo } from '@services/todo-service';
import { Cache } from '@lib/cache';
import config from 'config';

const log = logger.child({ method: 'controllers/todo/post' });

/**
 * Endpoint to create Todo resource.
 * @param request
 * @param response
 */
 export async function postTodo(request: Request, response: Response, next: NextFunction): Promise<Response|void> {
  log.info(`POST Todo ${JSON.stringify(request.body)}`);
  const body = request.body;
  let result;
  try {
    joiValidate(todoSchema, body);
    result = await createTodo(body);
  } catch (error) {
    return next(error);
  }

  // update cache
  Cache.getInstance().set(`${config.get<string>('cache.namespaces.todo')}${result.get('id')}`, result);

  return response.json(result);
}