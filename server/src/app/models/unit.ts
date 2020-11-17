import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companys',
    required: true,
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },

  actives: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'actives',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('units', UnitSchema);
