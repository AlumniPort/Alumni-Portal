const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/user.routes.js');
app.use('/api/users', userRoutes);

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
