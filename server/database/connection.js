const mongoose = require('mongoose')
// const databaseUrl =
//   process.env.DATABASE_URL;
//   console.log(process.env.DATABASE_URL);
module.exports = async () => {
  try {
    console.log(process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}

