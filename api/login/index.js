require('dotenv').config();
const { MongoClient } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env['AZURE_COSMOSDB_CONNECTION_STRING'];

module.exports = async function (context, req) {
  const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
  await client.connect();
  if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found.");}
  if (req.body.username !== "" && req.body.password !== "") {
    // Get reference of database and collection
    let db = await client.db('mapadvisor-db');
    let collection = await db.collection('users');

    // Check if username exists
    const foundUsername = await collection.findOne({ username: req.body.username });
    if(foundUsername == null) {
      context.res.status(400).send({ message: "This user doesn't exist" });
    } else{
      if(foundUsername.password == req.body.password){
        // Login
        context.res.status(200).send({ message: "Login was successfull.", userID: foundUsername._id, username: foundUsername.username });
      } else {
        context.res.status(400).send({ message: "Username and password don't match." });
      }
    }
  } else {
    context.res.status(400).send({ message: "Username and/or password are missing." });
  }
}