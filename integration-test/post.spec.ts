
import App from '../src/app';
import request from 'supertest';
import { expect } from 'chai';
import { sequelize } from '../src/helpers/sequelize';
const app = new App();
const server = app.start();

describe('POST todos', () => {
  let uuid: string;
  it('should reply 200 for new todo', async() => {
    const todo = {
      description: 'lol'
    };
    const result = await request(server)
    .post('/todos')
    .send(todo)

    expect(result.status).to.equal(200);
    expect(result.type).to.equal('application/json');
    expect(result.body.completed).to.be.false;
    expect(result.body.description).to.equal('lol');
    expect(result.body.completedAt).to.be.null;

    uuid = result.body.id;

    // and more checks like:
    // id = UUID
    // createdAt, updatedAt are dates..
  });

  after(async() => {
    if (uuid) {
      await sequelize.query(`DELETE FROM TodoModels WHERE id = '${uuid}';`);
    }
  });
});