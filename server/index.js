const app = require('express')();
const port = 4003;
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require('./api/index');

const corsOptions = {
  origin: ['http://localhost:5173', 'https://sleeping-app.vercel.app'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

routes(app, { urlencodedParser });
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`listning on ${port}`);
});
