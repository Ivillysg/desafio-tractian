import mongoose from 'mongoose';

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // This error happens when you try to drop a collection that's already dropped. Happens infrequently.
      // Safe to ignore.
      if (error.message === 'ns not found') return;

      // This error happens when you use it.todo.
      // Safe to ignore.
      if (error.message.includes('a background operation is currently running'))
        return;

      console.log(error.message);
    }
  }
}
export default dbName => {
  beforeAll(async () => {
    const url = `mongodb://localhost:27017/${dbName}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

  // Cleans up database between each test
  afterEach(async () => {
    await removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });
};
