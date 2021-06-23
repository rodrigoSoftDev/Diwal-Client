const { MongoClient } = require("mongodb");

// Database info
const dbName = "Justry";
const ownerName = "owner";
const pw = "S9Tci5gr9UsXAN1r";
const host = "mongodb+srv://";
const params = "?retryWrites=true&w=majority";
const uri = `${host}${ownerName}:${pw}@justry.vvjud.mongodb.net/${dbName}${params}`;

// Conection info 
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const client = () => new MongoClient(uri, mongoOptions);
const database = client => client.db('Justry');

module.exports = { database, client};