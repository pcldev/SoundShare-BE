import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
