import { deleteTodo } from '@controllers/todo/delete';
import { getTodo } from '@controllers/todo/get';
import { getListTodo } from '@controllers/todo/list';
import { patchTodo } from '@controllers/todo/patch';
import { postTodo } from '@controllers/todo/post';
import { putTodo } from '@controllers/todo/put';
import { middlewares } from '@middlewares/index';
import { Router } from 'express';
import config from 'config';

export const todoRoutes = Router()
  .get('/', getListTodo)
  .get('/:id', middlewares.checkCache('id', config.get<string>('cache.namespaces.todo')), getTodo)
  .put('/:id', putTodo)
  .patch('/:id', patchTodo)
  .delete('/:id', deleteTodo)
  .post('/', postTodo);
