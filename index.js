
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const mongoose = require('mongoose');

//user tamir321
//password PUPKbJsQOi9GNhET

//mongodb+srv://tamir321:<password>@cluster0.g41k0.mongodb.net/<dbname>?retryWrites=true&w=majority

//mongodb+srv://tamir321:PUPKbJsQOi9GNhET@cluster0.g41k0.mongodb.net/<dbname>?retryWrites=true&w=majority



//const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tamir321:PUPKbJsQOi9GNhET@cluster0.g41k0.mongodb.net/petshop?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//mongoose.connect('mongodb://localhost/cats',{
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const cats = require('./routes/cats_routes')(app);
const dogs = require('./routes/dogs_routes')(app);
const persons =  require('./routes/person_routes')(app);
const owners =  require('./routes/owner_routes')(app);
const server = app.listen(3000,function(){
    console.log('Server runnig at http://127.0.0.1:3000/');
})




