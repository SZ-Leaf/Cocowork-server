const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3005;

app.use(express.json());
app.use(morgan('dev'));

// respond with "Cocowork API, Hello!" when a GET request is made to the homepage
app.get('/', function (req, res) {
   res.send('Cocowork API, Hello!');
});

app.use(cors());

app.listen(port, () => console.log(`App Running on : http://localhost:${port}`));