require('dotenv').config();
const { MongoClient } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env['AZURE_COSMOSDB_CONNECTION_STRING'];

module.exports = async function (context, req) {
  const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
  await client.connect();
  if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found.");}
  if (req.body.userID !== "") {
    // Get reference of database and collection
    let db = await client.db('mapadvisor-db');
    let collection = await db.collection('places');

    // Check if user has already saved places
    const foundPlaces = await collection.findOne({userID: req.body.userID });

    if(foundPlaces == null) {
      context.res.status(400).send({ message: "There are no saved places yet." });
    } else {
      context.res = {
        headers: {
          'Content-Type': 'application/json'
        },
        body: { placesList: foundPlaces.placesList }
      };
    }
  } else {
    context.res.status(400).send({ message: "UserId is missing." });
  }
}