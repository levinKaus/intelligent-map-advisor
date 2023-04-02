require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env["AZURE_COSMOSDB_CONNECTION_STRING"];

module.exports = async function (req, res) {
    const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
    client.connect();
    if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found.");}
        // Get reference of database and collection
        let db = await client.db(`mapadvisor-db`);
        let collection = await db.collection('users');

        // Check if email or username already exists
        const foundEmail = await collection.findOne({email: "testUser@domain.com" });
        if(foundEmail != null) {
            res.status(400).send({ message: "This email is already in use."});
        } 
        else {
            const foundUsername = await collection.findOne({ username: "testUser" });
            if(foundUsername != null) {
                res.status(400).send({message: "This username is already in use."});
            }
            else {
                // Create new doc and upsert (create or replace) to collection
                let today = new Date();
                let timestampString = today.toISOString();
                const user = { 
                    username: "testUser",
                    email: "testUser@domain.com", 
                    password: "kfni8934hf=djwfj",
                    created: "kfni8934hf=djwfj",
                };
                const query = { username: user.username};
                const update = { $set: user };
                const options = {upsert: true, new: true};
                // Insert via upsert (create or replace) doc to collection directly
                try{
                    const upsertResult1 = await collection.updateOne(query, update, options);
                    console.log("Signing up new user");
                    res.status(200).send({message: "Sign up new user was successfull.", timestamp: timestampString});
                }catch(error){
                    res.status(500).send({message: "Error while signing up.", error: error});
                }
            }
        }
    req.res.json({
        text: "Hello from the API"
    });
}