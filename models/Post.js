const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  text: {
    type: String,
    required: true,
    maxlength: 1000,
  }, 
}, {
  timestamps: true, 
});

module.exports = mongoose.model("Posts", PostSchema);
