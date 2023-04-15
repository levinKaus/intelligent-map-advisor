require('dotenv').config();

module.exports = async function (context, req) {
  if (req.body.places && !req.body.places.isEmpty()){
    //TODO Add OpenAI stuff here
    context.res.status(200).send({ message: "Places List is Present and not Empty" });
  } else {
    context.res.status(400).send({ message: "Places List Does not exist or is Empty" });
  }
}