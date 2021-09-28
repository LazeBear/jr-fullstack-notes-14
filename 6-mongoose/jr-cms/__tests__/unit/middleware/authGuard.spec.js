// const { validateToken } = require('../utils/jwt');

// module.exports = (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   if (!authHeader) {
//     return res.sendStatus(401);
//   }
//   const contentArray = authHeader.split(' ');
//   if (contentArray.length !== 2 || contentArray[0] !== 'Bearer') {
//     return res.sendStatus(401);
//   }

//   const decoded = validateToken(contentArray[1]);
//   if (decoded) {
//     // role
//     req.user = decoded;
//     return next();
//   }
//   return res.sendStatus(401);
// };

const authGuard = require('../../../src/middleware/authGuard');
const { validateToken } = require('../../../src/utils/jwt');

jest.mock('../../../src/utils/jwt');
// jest.mock('../../../src/utils/jwt', () => {
//   return {
//     validateToken: jest.fn().mockImplementation((token) => token),
//   };
// });

describe('The auth guard middleware', () => {
  it('should return 401 if token is invalid', () => {
    const req = {
      header: jest.fn().mockReturnValue('xxx'),
    };

    const res = {
      sendStatus: jest.fn(),
    };

    const next = jest.fn();

    authGuard(req, res, next);
    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it('should return 401 if authorization header is missing', () => {
    const req = {
      header: jest.fn().mockReturnValue(),
    };

    const res = {
      sendStatus: jest.fn(),
    };

    const next = jest.fn();

    authGuard(req, res, next);
    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it('should call next if token is valid', () => {
    // const token = generateToken({ _id: 'xxx' });
    const token = 'xxx';
    const req = {
      header: jest.fn().mockReturnValue(`Bearer ${token}`),
    };

    const res = {
      sendStatus: jest.fn(),
    };

    const next = jest.fn();

    validateToken.mockImplementation((token) => token);

    authGuard(req, res, next);
    expect(validateToken).toHaveBeenCalledWith(token);
    expect(req.user).toBeDefined();
    expect(next).toHaveBeenCalled();
  });
});
