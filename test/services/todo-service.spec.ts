import * as todoService from '../../src/services/todo-service';
import { TodoModel } from '../../src/models/todo-model';
import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;

const logger = {
  debug: () => null,
  info: () => null,
  error: () => null,
} as any;

describe('services/todo-service', () => {
  describe('findTodo()', () => {
    it('should find todo', async() => {
      const id = 'ff26325e-15c7-4c85-a6a2-14df26dd7c91';
      const resource = TodoModel.build({
        id,
        completed: true,
        description: 'test test',
        completedAt: '2021-03-14T22:05:01.637Z',
      });
      const stubTodoFindByPk = sinon.stub(TodoModel, 'findByPk').resolves(resource);
      const result = await todoService.findTodo(id);

      // Reset stub.
      stubTodoFindByPk.restore();
  
      const data = result?.toJSON();
      expect(result instanceof TodoModel).to.be.true;
      expect(data).to.deep.equal({
        id: 'ff26325e-15c7-4c85-a6a2-14df26dd7c91',
        completed: true,
        description: 'test test',
        completedAt: new Date('2021-03-14T22:05:01.637Z')
      });
    });
  });

  describe('updateTodo()', () => {
    it('should update a todo', async() => {
      const id = '838c252c-ebc7-438e-b29b-64bce553d2fb';
      const resource = TodoModel.build({
        id,
        completed: false,
        description: 'test update',
        completedAt: null,
      });

      const updateData = {
        description: 'new desc',
        completed: true,
      }

      // UpdateTodo internally calls findTodo.
      const stubTodoFindByPk = sinon.stub(TodoModel, 'findByPk').resolves(resource);

      // Stub update method on model. Don't need to store this in variable, because it's an instance sow e don't need to reset this.
      sinon.stub(resource, 'update').resolves(resource);

      const result = await todoService.updateTodo(id, updateData);
      stubTodoFindByPk.restore();

      expect(result instanceof TodoModel).to.be.true;
      expect(result.get('id')).to.be.equal(id);
      
    });
  });
});