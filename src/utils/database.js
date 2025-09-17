import mongoose from 'mongoose'

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const connectToDB = async () => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      dbName: 'tutorsplan',
      bufferCommands: false,
    }

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then(mongooseInstance => {
        return mongooseInstance
      })
      .catch(err => {
        console.error('MongoDB connection error:', err)
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
