import { NextFunction, Request, Response } from 'express';
import { logger } from '@lib/logger';
import { removeTodo } from '@services/todo-service';
import { Cache } from '@lib/cache';
import config from 'config';

const log = logger.child({ method: 'controllers/todo/get' });

/**
 * Endpoint to retrieve Todo resource.
 * @param request
 * @param response
 */
 export async function deleteTodo(request: Request, response: Response, next: NextFunction): Promise<Response|void> {
  const { id } = request.params;
  log.info(`DELETE Todo: ${id}`);

  try {
    removeTodo(id);
  } catch (error) {
    return next(error);
  }

  Cache.getInstance().delete(`${config.get<string>('cache.namespaces.todo')}${id}`);

  // 204 = (No Content) status code if the action has been enacted and no further information is to be supplied.
  return response.status(204).json();
}