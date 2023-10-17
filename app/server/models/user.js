import mongoose, { Schema } from "mongoose";

//require('dotenv').config({path: './../../.env'})
// const uri = process.env.MONGODB_URI;
// const dbName = process.env.MONGODB_DATABASE;

// // Check values before using them in your database connection
// console.log(`URI: ${uri}`);
// console.log(`DB Name: ${dbName}`);

// // we want the database connection to happen synchronously so we define
// // this async function and use await on the connect call
// const doConnect = async () => {
//   console.log('connecting to', process.env.MONGODB_URI);
//   await mongoose.connect(process.env.MONGODB_URI, {
//           dbName: process.env.MONGODB_DATABASE,
//           useNewUrlParser: true,
//           useUnifiedTopology: true
//         })
//       .catch((error) => {
//           console.log('error connecting to MongoDB:', error.message)
//       })
//   }
// // call the connection function
// doConnect()

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "Name is required!",
    },
    email: {
      type: String,
      required: "Email is required!",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required!",
    },
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "",
        localPath: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

// .set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
// })

module.exports = mongoose.model("User", userSchema);
