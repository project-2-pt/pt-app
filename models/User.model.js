const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      lowercase: true,
      trim: true,
    },
    userName: {
      type: "String",
      required: [true, "Username is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    image: String,
    role: {
      type: String,
      enum: ["instructor", "client"],
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
