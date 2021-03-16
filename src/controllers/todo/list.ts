import { Request, Response } from 'express';
import { logger } from '@lib/logger';
import { listTodo } from '@services/todo-service';

const log = logger.child({ method: 'controllers/todo/list' });

/**
 * Endpoint to list all Todo resources.
 * @param request
 * @param response
 */
 export  async function getListTodo(request: Request, response: Response): Promise<Response|void> {
  log.info('GET Todo list');

  const todos = await listTodo();
  const result = {
    resources: todos,
    count: 2,
    total: 46,
    links: {
      self: 'http://example.org/api/todos?page=3',
      first: 'http://example.org/api/todos',
      prev: 'http://example.org/api/todos?page=2',
      next: 'http://example.org/api/todos?page=4',
      last: 'http://example.org/api/todos?page=8',
    }
  }

  return response.json(result);
}