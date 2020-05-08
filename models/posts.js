var mongoose = require("mongoose");
var validate = require("mongoose-validator");
const Schema = mongoose.Schema;

var postValidator = [
  validate({
    validator: "isLength",
    arguments: [1, 300],
    message: "Name should be between 3 and 50 characters",
  }),
  validate({
    validator: "isAlphanumeric",
    passIfEmpty: true,
    message: "Name should contain alpha-numeric characters only",
  }),
];

var commentSchema = new Schema(
  {
    comment: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

var postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: postValidator,
    },
    body: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);
