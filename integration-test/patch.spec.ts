import App from '../src/app';
import { sequelize } from '../src/helpers/sequelize';
import request from 'supertest';
import { expect } from 'chai';
const app = new App();
const server = app.start();

describe('PATCH todos/{id}', () => {

  const uuid = '5da05d36-5889-4227-a538-ca80afa21e60';

  it('should reply 200 for patching todo as completed', async() => {
    await sequelize.query(`INSERT INTO TodoModels(id, description, completed, createdAt, updatedAt) 
        VALUES ('${uuid}', 'mooi', 0, '2021-03-10 12:00:00', '2021-03-10 12:00:00');`);

    const todoComplete = {
      completed: true
    };
    const result = await request(server)
    .patch(`/todos/${uuid}`)
    .send(todoComplete)

    expect(result.status).to.equal(200);
    expect(result.type).to.equal('application/json');
    expect(result.body.completed).to.be.true;
    expect(result.body.completedAt).not.to.be.null;

    // and more checks like:
    // id = UUID
    // createdAt, updatedAt are dates..
  });

  after(async() => {
    await sequelize.query(`DELETE FROM TodoModels WHERE id = '${uuid}';`);
  });
});