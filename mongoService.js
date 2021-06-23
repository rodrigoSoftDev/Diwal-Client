const { database, client} = require("./mongoConnection");

async function find(collectionName, key, value) {
    const newClient = client();
  try {
    await newClient.connect();
    const collection = database(newClient).collection(collectionName);
    var query = {};
    query[key] = value;
    const result = await collection.findOne(query);
    return result;
  } finally {
    await newClient.close();
  }
};

async function create(collectionName, document) {
    const newClient = client();
    try {
      await newClient.connect();
      const collection = database(newClient).collection(collectionName);
      const result = await collection.insertOne(document);
      return result;
    } finally {
      await newClient.close();
    }
};

module.exports = { find, create};