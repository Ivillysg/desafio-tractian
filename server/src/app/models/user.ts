import mongoose from 'mongoose';
import Companys from './companys';
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Companys',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Users', UserSchema);
