import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  audio: {
    type: mongoose.Schema.ObjectId,
    ref: 'Audio',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
