import { ITodo } from '@interfaces/todo-interface';
import { logger } from '@lib/logger';
import { TodoModel } from '@models/todo-model';
import { AppError } from '@lib/app-error';
const log = logger.child({ method: 'services/todo-service' });

/**
 * Create a Todo resource.
 * @param data
 * @returns Todo resource.
 */
export async function createTodo(data: ITodo): Promise<TodoModel> {

  // save todo in database
  log.debug(`Create todo: ${JSON.stringify(data)}`);

  return TodoModel.create(data, {
    logging: q => log.debug(q),
  });
}

/**
 * List collection of Todo resources.
 * @returns Todo resource.
 */
export async function listTodo(): Promise<TodoModel[]> {
  log.debug('list todos');

  return TodoModel.findAll({
    logging: q => log.debug(q),
  });
}

/**
 * Find one Todo resource by Id.
 * @param id UUID.
 * @returns Todo resource.
 */
export async function findTodo(id: string): Promise<TodoModel|null> {
  log.debug(`Get todo: ${id}`);

  return TodoModel.findByPk(id, {
    logging: q => log.debug(q),
  });
}

/**
 * Update a Todo resource by id.
 * @param id UUID.
 * @param data 
 * @returns Updated Todo resource.
 */
export async function updateTodo(id: string, data: ITodo): Promise<TodoModel> {
  // get resource
  const resource = await findTodo(id);
  if (!resource) {
    throw new AppError('Resource not found', 404);
  }

  return resource.update(data, {
    logging: q => log.debug(q),
  });
}

/**
 * Remove a Todo resource by Id.
 * @param id UUID.
 */
export async function removeTodo(id: string): Promise<void> {
  log.debug(`Remove todo: ${id}`);

  await TodoModel.destroy({
    logging: q => log.debug(q),
    where: {
      id,
    },
  });
}
