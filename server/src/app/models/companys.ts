import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

export default mongoose.model('Companys', CompanySchema);
