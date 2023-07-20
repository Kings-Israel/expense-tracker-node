const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`Mongo DB Connected: ${conn.connection.host}`.cyan.underline.bold)
  } catch (err) {
    console.log(`Error connecting to Mongo: ${err.message}`.red)
    process.exit(1)
  }
}

module.exports = connectDB