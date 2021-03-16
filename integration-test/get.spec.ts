import App from '../src/app';
import request from 'supertest';
import { expect } from 'chai';
const app = new App();
const server = app.start();

describe('GET todos/{id}', () => {
  it('should reply not found 404', async() => {
    const result = await request(server)
    .get('/todos/f1e8bd6e-eaeb-4c0e-a633-cc08db4ac604')

    expect(result.status).to.equal(404);
    expect(result.type).to.equal('application/json');
    expect(result.body).to.deep.equal({ message: 'Resouce not found', statusCode: 404 });

  });
});