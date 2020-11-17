import mongoose from 'mongoose';

const ActiveSchema = new mongoose.Schema({

  name: {
    type:String,
    required:true,
  },

  description:{
    type:String,
    required:true
  },

  model:{
    type:String,
    required:true
  },

  image:{
    type:String,
    required:true,

  },

  assignedTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:true,
  },

  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Company',
    required:true,
  },

  unit:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Units',
    required:true,
  },

  status:{
    type:String,
    default: 'Desativado'
  },

  healthScore:{
    type:Number,
    default:0
  },

  createdAt:{
    type:Date,
    default:Date.now
  }
})


export default mongoose.model('Units', ActiveSchema)