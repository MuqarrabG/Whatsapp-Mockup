import mongoose, { Schema } from "mongoose";

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
