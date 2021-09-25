const bcrypt = require('bcrypt');

const password = '123';

const salt = '$2b$12$AF1izBlIs9MdikA1Ryb8yO';
const hashed = bcrypt.hashSync(password, salt);
bcrypt.console.log(hashed);

// $2b$12$AF1izBlIs9MdikA1Ryb8yOxko0Oi.h98lDeXIejTpTQtu1XxfI/aO
// $2b$12$AF1izBlIs9MdikA1Ryb8yO
