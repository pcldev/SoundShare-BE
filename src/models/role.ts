import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    require: false,
  },
  code: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
