const supertest = require('supertest');
const mongoose = require('mongoose');
const Student = require('../../src/models/student');
const app = require('../../src/app');
const { generateToken } = require('../../src/utils/jwt');

const request = supertest(app);

const TOKEN = generateToken({ id: 'fake token' });

describe('/api/students', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Create', () => {
    it('should save the student if request is valid', async () => {
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
    });

    // edge case
    it.each`
      field          | value
      ${'firstName'} | ${undefined}
      ${'email'}     | ${undefined}
      ${'email'}     | ${'a'}
      ${'email'}     | ${'a@'}
      ${'email'}     | ${'a@b'}
      ${'email'}     | ${'a@b.c'}
    `('should return 400 when $field is $value', async ({ field, value }) => {
      const validStudent = {
        firstName: 'mason',
        lastName: 'xxx',
        email: 'example@google.com',
      };
      const payload = { ...validStudent, [field]: value };
      const res = await request
        .post('/api/students')
        .send(payload)
        .set('Authorization', `Bearer ${TOKEN}`);
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET', () => {
    beforeEach(async () => {
      await Student.deleteMany({});
    });

    it('should return all students', async () => {
      await Student.insertMany([
        { firstName: 'mason', lastName: 'xxx', email: 'example@google.com' },
        { firstName: 'jason', lastName: 'xxx', email: 'example@google.com' },
      ]);

      const res = await request
        .get('/api/students')
        .set('Authorization', `Bearer ${TOKEN}`);
      // expect(res.body.length).toBeGreaterThanOrEqual(2);
      expect(res.body.length).toBe(2);
    });
  });
});
