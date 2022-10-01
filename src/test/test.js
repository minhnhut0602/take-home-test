const request = require('supertest');
const app = require('../app');

describe('Home test API', () => {

  let token = null;
  describe('Hometest API', function() {

    it('should signup user, login user, check token, get users, get user and delete user <id> DELETE', function(done) {
      request(app)
        .post('/signup')
        // send user signup details
        .send({
            'name': 'Tester',
            'email': 'tester@mailinator.com',
            'password': '123456'
          }
        )
        .end((err, res) => {
          request(app)
            .post('/login')
            .send(
              {
                'email': 'minhnhut0602@gmail.com',
                'password': '123456'
              }
            )
            .end(function(err, res) {
              token = res.body.token;
              request(app)
                .get('/users')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                  console.log('users=', JSON.stringify(res));
                  // console.log('users size=', res.length)
                  const data = JSON.parse(res.text);
                  const test = data.users.filter(u => u.email === 'tester@mailinator.com')[0];
                  request(app)
                    .delete('/users/' + test.id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200, done);
                });
            });
        });
    });
  })
});