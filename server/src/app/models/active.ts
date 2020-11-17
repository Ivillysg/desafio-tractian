import mongoose from 'mongoose';

const ActiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  model: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companys',
    required: true,
  },

  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'units',
    required: true,
  },

  status: {
    type: String,
    default: 'Desativado',
  },

  healthScore: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('actives', ActiveSchema);
