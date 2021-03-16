import { getTodo } from '../../../src/controllers/todo/get';
import * as todoService from '../../../src/services/todo-service';
import chai from 'chai';
import sinon from 'sinon';
import { TodoModel } from '../../../src/models/todo-model';
const expect = chai.expect;

const logger = {
  debug: () => null,
  info: () => null,
  error: () => null,
} as any;

describe('controllers/todo/get', () => {
  it('should return todo item', async() => {
    const request = {
      params: {
        id: '69d6e22a-1100-460f-819a-642a9280712a'
      }
    } as any;
    const response = {
      json: sinon.spy(),
    } as any;
    const next = sinon.spy();

    const resource = TodoModel.build({
      id: '69d6e22a-1100-460f-819a-642a9280712a',
      description: 'blaat',
      completed: false,
    });

    const stubFindTodo = sinon.stub(todoService, 'findTodo').resolves(resource);

    await getTodo(request, response, next);

    stubFindTodo.restore();

    expect(response.json.args[0][0] instanceof TodoModel).to.be.true;
    expect(response.json.calledOnce).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it('should throw error if not found', async() => {
    const request = {
      params: {
        id: '69d6e22a-1100-460f-819a-642a9280712a'
      }
    } as any;
    const response = {
      json: sinon.spy(),
    } as any;
    const next = sinon.spy();

    const stubFindTodo = sinon.stub(todoService, 'findTodo').resolves(null);

    await getTodo(request, response, next);

    stubFindTodo.restore();

    expect(response.json.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
    expect(next.args[0][0].message).to.be.equal('Resouce not found');
  });
});
