import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mia-raku';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
    throw new Error('Please define the MONGODB_URI environment variable in production');
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getCollection(name: string) {
  const { db } = await connectToDatabase();
  return db.collection(name);
}
