require('dotenv').config();
const { MongoClient } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env['AZURE_COSMOSDB_CONNECTION_STRING'];

module.exports = async function (context, req) {
  const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
  await client.connect();
  if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found.");}
  if (req.body.username !== "" && req.body.email !== "" && req.body.password !== "") {
    // Get reference of database and collection
    let db = await client.db('mapadvisor-db');
    let collection = await db.collection('users');

    // Check if email or username already exists
    const foundEmail = await collection.findOne({email: req.body.email });
    if(foundEmail != null) {
      context.res.status(400).send({ message: "This email is already in use." });
    } else {
      const foundUsername = await collection.findOne({ username: req.body.username });
      if(foundUsername != null) {
        context.res.status(400).send({ message: "This username is already in use." });
      } else {
        // Create new doc and upsert (create or replace) to collection
        let today = new Date();
        let timestampString = today.toISOString();
        const user = { 
          username: req.body.username, 
          email: req.body.email, 
          password: req.body.password,
          created: timestampString,
        };
        const query = { username: user.username};
        const update = { $set: user };
        const options = {upsert: true, new: true};
        // Insert via upsert (create or replace) doc to collection directly
        try{
          const upsertResult1 = await collection.updateOne(query, update, options);
          console.log("Signing up new user");
          context.res.status(200).send({ message: "Sign up new user was successfull.", timestamp: timestampString });
        }catch(error){
          context.res.status(500).send({ message: "Error while signing up.", error: error });
        }
      }
    }
  } else {
    context.res.status(400).send({ message: "Username and/or email and/or password is missing." });
  }
}