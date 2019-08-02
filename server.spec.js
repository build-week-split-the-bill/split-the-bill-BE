const request = require('supertest');

const server = require('./server.js');

// Testing for correct environment
describe('server environment tests', () => {
  it('db environment set to development', () => {
    expect(process.env.DB_ENV).toBe('development');
  });
});

describe('GET All USERS', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .get('/api/users')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('GET A SINGLE USER', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .get('/api/users/1')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('GET BILLS OF USER', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .get('/api/users/1/bills')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('UPDATE A USER', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .put('/api/users/1')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('GET ALL BILLS', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .get('/api/bills')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('GET A SINGLE BILL', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .get('/api/bills/2')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('GET ALL NOTIFICATIONS FOR SINGLE BILL', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .get('/api/bills/1/notifications')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('CREATE A NEW BILL', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .post('/api/bills')
      .send({
        incorrectColumn: 3,
        notExisting: 'whatever',
      })
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('UPDATE A BILL', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .put('/api/bills/2')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('DELETE A BILL', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .delete('/api/bills/2')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('DELETE ALL NOTIFICATIONS OF A BILL', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .delete('/api/bills/52/notifications')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('GET ALL NOTIFICATIONS', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .get('/api/notifications')
      .set('authorization', 'incorrectToken')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '50')
      .then(res => {
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});

describe('CREATE A NEW NOTIFICATION', () => {
  it('returns 401 Unauthorized', () => {
    return request(server)
      .post('/api/notifications')
      .send({
        bill_id: 52,
        email: [
          'friend_one@test.com',
          'friend_two@test.com',
          'friend_three@test.com',
        ],
      })
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.warning).toBe(`Authorization failed. Access denied!`);
      });
  });
});
