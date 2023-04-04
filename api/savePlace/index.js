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
    let foundPlaces = await collection.findOne({userID: req.body.userID });

    if(foundPlaces == null) {
      // Create new places entry for the user
      const places = {
        userID: req.body.userID,
        placesList : []
      }
      const query = { userID: places.userID };
      const update = { $set: places };
      const options = { upsert: true, new: true };
      // Insert via upsert (create or replace) doc to collection directly
      try {
        const upsertResult1 = await collection.updateOne(query, update, options);
        console.log("Creating new places entry for user")
        context.res.status(200).send({ message: "Creating new places entry was successfull." });
      } catch(error) {
        context.res.status(500).send({ message: "Error while creating new places entry.", error: error });
      }
    } 

    // Fetch existing places entry
    foundPlaces = await collection.findOne({userID: req.body.userID });

    // Add place to placesList array
    foundPlaces.placesList.push({
      name: req.body.name,
      longitude: req.body.longitude,
      langitude: req.body.langitude
    })
    await collection.updateOne(
      { userID: req.body.userID }, 
      { $set: {'placesList': foundPlaces.placesList } }  
    )
  } else {
    context.res.status(400).send({ message: "UserId and/or name and/or longitude and/or langitude is missing." });
  }
}