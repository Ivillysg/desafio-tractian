import mongoose from 'mongoose';
export default function database() {
  if (process.env.NODE_ENV !== 'test') {
    mongoose
      .connect(
        process.env.NODE_ENV === 'development'
          ? process.env.DEVELOPMENT
          : process.env.PRODUCTION,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
      )
      .then(() => console.log('Conectado ao database!'))
      .catch(err => console.log(err));
  }
}
