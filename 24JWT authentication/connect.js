const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};
//we create a schema or collection by mongoose.schema and access it using mongoose.model and by using mongoose.connect we define where to store it

//1)mongoose.Schema: Defines the structure of the data.
//2)mongoose.model: Saves the schema as a model and 
// links it to a collection.
//3)mongoose.connect: Specifies the database where the
//  collection and documents will be stored.