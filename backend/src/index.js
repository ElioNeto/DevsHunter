const express = require('express'); 
const mongoose = require('mongoose');
//const cors = require('cors')
//const http = require('http')

const routes = require('./routes')
//const { setupWebSocket } = require('./websocket')

const app = express();
//const server = http.Server(app)

//setupWebSocket(server)
console.log('connect')

mongoose.connect('mongodb+srv://Elioneto:Elinho123@cluster0-zvkiv.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

//app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3334);