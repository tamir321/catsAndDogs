
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const cats = require('./cats_routes')(app);
const dogs = require('./dogs_routes')(app);

const server = app.listen(3000,function(){
    console.log('Server runnig at http://127.0.0.1:3000/');
})




