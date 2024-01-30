const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { sequelize } = require('./db/sequelizeSetup')

const app = express();
const port = 3005;


app.use(express.json());
app.use(morgan('dev'));

// respond with "Cocowork API, Hello!" when a GET request is made to the homepage
app.get('/', function (req, res) {
   res.send('Cocowork API, Hello!');
});

const userRouter = require('./routes/userRoutes')
const salleReunionrouter = require('./routes/salleReunionRoutes')

app.use(cors());

app.use('/api/salles-reunion/', salleReunionrouter)
app.use('/api/users',userRouter)

app.listen(port, () => console.log(`App Running on : http://localhost:${port}`));