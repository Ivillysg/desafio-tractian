import mongoose from 'mongoose';

const UseSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    unique:true
  },

  createdAt:{
    type:Date,
    default:Date.now
  }
})


export default mongoose.model('Users', UseSchema)