const { Schema, model } = require('mongoose');

const noteSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    favoriteCount: {
      type: Number,
      required: false,
      default: 0
    },
    favoritedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);
// setting timestamps equal to true adds createdAt and updatedAt fields to the model

const Note = new model('Note', noteSchema);

module.exports = Note;
