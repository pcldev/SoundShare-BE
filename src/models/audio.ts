import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  file: {
    type: mongoose.Schema.ObjectId,
    ref: 'File',
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Audio = mongoose.model('Audio', audioSchema);

export default Audio;
