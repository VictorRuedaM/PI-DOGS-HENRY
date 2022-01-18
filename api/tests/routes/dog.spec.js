/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Dog.sync({ force: true })
//     .then(() => Dog.create(dog)));
//   describe('GET /dogs', () => {
//     it('should get 200', () =>
//       agent.get('/dogs').expect(200)
//     );
//   });
  
// });

// Test a las rutas 

describe('GET /dogs', () => {
  it('responds with 200', () => agent.get('/dogs').expect(200))});
    



describe('GET /dogs/:id', () => {
  it('responds with 404', () => agent.get('/dogs/:350').expect(404));
  it('responds with and object with message `There are no breeds of dogs with that Id...`', () =>
      agent.get('/dogs/350').then((res) => {
        expect(res.body).to.equal('There are no breeds of dogs with that Id...');
      }))});

