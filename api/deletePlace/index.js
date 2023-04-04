require('dotenv').config();
const { MongoClient } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env['AZURE_COSMOSDB_CONNECTION_STRING'];

module.exports = async function (context, req) {
  const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
  await client.connect();
  if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found.");}
  if (req.body.userID !== "" && req.body.name !== "" && req.body.longitude !== "" && req.body.latitude !== "") {
    // Get reference of database and collection
    let db = await client.db('mapadvisor-db');
    let collection = await db.collection('places');

    // Check if user has already saved places
    const foundPlaces = await collection.findOne({userID: req.body.userID });

    if(foundPlaces == null) {
      context.res.status(400).send({ message: "There are no saved places yet." });
    } else {
      // Remove place from placesList array
      const index = foundPlaces.placesList.findIndex(place => 
        place.name === req.body.name && 
        place.longitude === req.body.longitude && 
        place.langitude === req.body.langitude
      );
      if (index > -1) { foundPlaces.placesList.splice(index, 1); }
      await collection.updateOne(
        { userID: req.body.userID },
        { $set: { 'placesList': foundPlaces.placesList } }
      )
      context.res.status(200).send({ message: "The place was deleted" });
    }
  } else {
    context.res.status(400).send({ message: "UserId and/or name and/or longitude and/or langitude is missing." });
  }
}