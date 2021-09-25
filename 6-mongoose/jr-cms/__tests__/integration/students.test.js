const supertest = require('supertest');
const mongoose = require('mongoose');
const Student = require('../../src/models/student');
const app = require('../../src/app');
const { generateToken } = require('../../src/utils/jwt');

const request = supertest(app);

const TOKEN = generateToken({ id: 'fake token' });

describe('/api/students', () => {
  describe('Create', () => {
    it('should save the student if request is valid', async () => {
      await mongoose.connect(global.__MONGO_URI__);
      const body = {
        firstName: 'mason',
        lastName: 'xxx',
        email: 'example@google.com',
        // ABC
        // a@a.com
        // a@a
      };
      const res = await request
        .post('/api/students')
        .send(body)
        .set('Authorization', `Bearer ${TOKEN}`);
      expect(res.statusCode).toBe(201);
      const student = await Student.findOne({ firstName: 'mason' }).exec();
      expect(student.lastName).toBe(body.lastName);
      expect(student.email).toBe(body.email);

      await mongoose.connection.close();
    });
  });
});
