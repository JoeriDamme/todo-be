import { NextFunction, Request, Response } from 'express';
import { logger } from '@lib/logger';
import { findTodo } from '@services/todo-service';
import { AppError } from '@lib/app-error';

const log = logger.child({ method: 'controllers/todo/get' });

/**
 * Endpoint to retrieve Todo resource.
 * @param request
 * @param response
 */
 export async function getTodo (request: Request, response: Response, next: NextFunction): Promise<Response|void> {
  const { id } = request.params;
  log.info(`GET Todo: ${id}`);

  let resource;
  try {
    resource = await findTodo(id);

    if (!resource) {
      throw new AppError('Resouce not found', 404);
    }
  } catch (error) {
    return next(error);
  }

  return response.json(resource);
}