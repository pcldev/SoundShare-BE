import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have an user name'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  description: {
    type: String,
    required: false,
  },
  isDisabled: {
    type: Number,
    default: 0,
  },
  role: {
    type: mongoose.Schema.ObjectId,
    ref: 'Role',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
