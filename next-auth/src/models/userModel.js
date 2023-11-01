import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // If a user tries to save a document without providing a username, Mongoose will generate an error with the message "Please provide a username."
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// User is the mongoose model which will be used to interact with users collection.
// mongoose.models.users: This checks whether a model with the name "users" already exists in Mongoose. If the model "users" does not exist, this part of the code creates a new Mongoose model for the "users" collection.

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;


/* 
working of forgot password:
when user clicks forgot pw an email is sent with a token and a user is searched based on that token and pw is reset for that user
*/
