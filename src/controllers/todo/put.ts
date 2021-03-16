import { NextFunction, Request, Response } from 'express';
import { logger } from '@lib/logger';
import { updateTodo } from '@services/todo-service';
import { Cache } from '@lib/cache';
import config from 'config';

const log = logger.child({ method: 'controllers/todo/update' });

/**
 * Endpoint to update Todo resource.
 * @param request
 * @param response
 */
 export async function putTodo(request: Request, response: Response, next: NextFunction): Promise<Response|void> {
  const { id } = request.params;
  log.info(`PUT Todo: ${id}`);

  let resource;

  try {
    resource = await updateTodo(id, request.body);
  } catch (error) {
    return next(error);
  }

  Cache.getInstance().set(`${config.get<string>('cache.namespaces.todo')}${resource.get('id')}`, resource);

  return response.json(resource);
}
