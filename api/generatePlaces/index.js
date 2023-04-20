require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

module.exports = async function (context, req) {
  if (req.body.places && req.body.places.length != 0) {
    if(!process.env['OPENAI_API_KEY']) {
      context.res.status(400).send({
      message: "OPENAI_API_KEY not found"
    });}
    const configuration = new Configuration({
      apiKey: process.env['OPENAI_API_KEY'],
      basePath: "https://api.pawan.krd/v1",
    });

    const openai = new OpenAIApi(configuration);

    const googleAPI = process.env['GOOGLE_MAPS_API_KEY'];
    if(!process.env['GOOGLE_MAPS_API_KEY']) {
      context.res.status(400).send({
      message: "GOOGLE not found"
    });}
    try {
      const result = await Promise.all(req.body.places.map(async place => {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Recommend me 5 ${place.action} places that are in ${place.location}. Give me only the names.`,
          temperature: 0.8,
          max_tokens: 150
        });

        const addresses = [];

        console.log(completion.data);

        for (let i = 1; i <= 5; i++) {
          addresses.push(completion.data.choices[0].text.split(". ")[i].split("\n")[0]);
        }

        const fetchPromises = addresses.map(async address => {
          try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address.concat(" ", place.location))}&key=${googleAPI}`);
            const data = await response.json();

            if (data.status === "OK") {
              const location = data.results[0].geometry.location;
              console.log(location);
              console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);

              return {
                address: address,
                latitude: location.lat,
                longitude: location.lng,
              };
            } else {
              console.log(`Geocode was not successful for the following reason: ${data.status}`);
              throw new Error("Geocode was not successful for the following reason: " + data.status);
            }
          } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching the locations.");
          }
        });

        const locations = await Promise.all(fetchPromises);
        return {
          locations: locations.filter(location => location !== null)
        };
      }));

      context.res.status(200).send({
        message: "Places List is Present and not Empty",
        result: result
      });
    } catch (error) {
      console.error(error);
      context.res.status(400).send({
        message: `An error occurred while fetching the locations: ${error}`
      });
    }

  } else {
    context.res.status(400).send({
      message: "Places List Does not exist or is Empty"
    });
  }
}