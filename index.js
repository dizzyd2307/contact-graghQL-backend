const express = require('express');
const graphqlHttp = require('express-graphql');
const app = express();
const schema = require('./graphql/schema');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dizzyd:4dizzyd2enter@side-projects-96wsn.mongodb.net/graphql?retryWrites=true&w=majority',{useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('MongoDB connection Successful')
})
app.use(cors());

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}));

app.listen(3000, () =>{
    console.log('Listening on port 3000')
})