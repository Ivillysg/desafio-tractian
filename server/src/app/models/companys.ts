import mongoose from 'mongoose';
import Units from './unit';
import Actives from './active';

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  units: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Units',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
CompanySchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    if (doc) {
      await Units.deleteOne({
        company: doc._id,
      });
      await Actives.deleteOne({
        company: doc._id,
      });
    }
  }
});

export default mongoose.model('Companys', CompanySchema);
