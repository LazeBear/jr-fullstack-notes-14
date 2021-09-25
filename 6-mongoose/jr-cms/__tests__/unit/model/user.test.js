const User = require('../../../src/models/user');
const bcrypt = require('bcrypt');

describe('The user model', () => {
  it('should hash the password', async () => {
    const userData = { username: 'mason', password: 'abc123' };
    const userDoc = new User(userData);
    await userDoc.hashPassword();
    expect(bcrypt.compareSync(userData.password, userDoc.password)).toBe(true);
  });
  // it('should validate the password if password is correct')

  // describe()
});

// jr-cms-14-test
