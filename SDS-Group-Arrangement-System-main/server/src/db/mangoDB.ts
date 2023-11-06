import mongoose from 'mongoose'
import config from '../config'

export async function DB() {
  try {
    await mongoose.connect(config.URI, {
      serverApi: {
        version: '1',
      },
    })

    // Send a ping to confirm a successful connection
    const adminDb = mongoose.connection.db.admin()
    await adminDb.command({ ping: 1 })
    console.log(
      'Pinged. Server successfully connected to MongoDB!',
    )
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}
