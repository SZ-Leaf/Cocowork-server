const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { sequelize } = require('./db/sequelizeSetup')

const app = express();
const port = 3005;


app.use(express.json());
app.use(morgan('dev'));

app.use('/images', express.static(__dirname + '/images'));

// respond with "Cocowork API, Hello!" when a GET request is made to the homepage
app.get('/', function (req, res) {
   res.send('Cocowork API, Hello!');
});

const userRouter = require('./routes/userRoutes')
const meetingRouter = require('./routes/meetingRoomRoutes')
const messageRouter = require('./routes/messageRoutes')
const reservationRouter = require('./routes/reservationRoutes')
const coworkRouter = require('./routes/coworkRoutes')
const closedSpaceRouter = require('./routes/closedSpaceRoutes')

app.use(cors());


app.use('/api/cowork', coworkRouter)
app.use('/api/meetingRooms', meetingRouter)
app.use('/api/users', userRouter)
app.use('/api/messages', messageRouter)
app.use('/api/reservations', reservationRouter)
app.use('./api/closedSpace', closedSpaceRouter)

app.use('/images', express.static(__dirname + '/images'));

app.listen(port, () => console.log(`App Running on : http://localhost:${port}`));