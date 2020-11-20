import mongoose from 'mongoose';
import Actives from './active';

const UnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companys',
    required: true,
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  actives: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actives',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UnitSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Actives.deleteMany({
      unit: doc._id,
    });
  }
});
export default mongoose.model('Units', UnitSchema);
