const app = require('./app');
const connectToDB = require('./utils/db');

connectToDB();

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
