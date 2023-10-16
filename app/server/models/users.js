require('dotenv').config({path: './../../.env'})
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE;

// Check values before using them in your database connection
console.log(`URI: ${uri}`);
console.log(`DB Name: ${dbName}`);

// we want the database connection to happen synchronously so we define
// this async function and use await on the connect call
const doConnect = async () => {
  console.log('connecting to', process.env.MONGODB_URI);
  await mongoose.connect(process.env.MONGODB_URI, {
          dbName: process.env.MONGODB_DATABASE,
          useNewUrlParser: true, 
          useUnifiedTopology: true 
        })  
      .catch((error) => {    
          console.log('error connecting to MongoDB:', error.message)
      })
  }
// call the connection function
doConnect() 

const likeSchema = new mongoose.Schema({
    content: String,
    votes: Number,
    user: Number
})

likeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Like = mongoose.model("Like", likeSchema)

const newUser = new Like({ content: "Llala", votes: 5, user:2});
newUser.save();