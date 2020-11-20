import mongoose from 'mongoose';
import Companys from './companys';
import Units from './unit';
import Actives from './active';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
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
UserSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Companys.deleteMany({
      assignedTo: doc._id,
    });
    await Units.deleteMany({
      assignedTo: doc._id,
    });
    await Actives.deleteMany({
      assignedTo: doc._id,
    });
  }
});

export default mongoose.model('Users', UserSchema);
