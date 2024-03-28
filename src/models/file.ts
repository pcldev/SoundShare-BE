import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  url: {
    type: String,
    require: false,
  },
  size: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const File = mongoose.model('File', fileSchema);

export default File;
