import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companys',
    required: true
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },

  actives: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actives'
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
})


export default mongoose.model('Units', UnitSchema)