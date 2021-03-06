"use strict";

/**
 * Connects to MongoDB.
 *
 * @param {object} mongoose Mongoose object
 */
const connectDB = async (mongoose) => {
  try{
    const conn = await mongoose.connect( process.env.MONGO_URI+`/${process.env.DBNAME}`, {
        useNewUrlParser : true ,
        useUnifiedTopology: true,
        useFindAndModify : false,
        useCreateIndex : true
    });
    console.log(`MongoDB instance connected : ${conn.connection.host}`);
    console.log(`Database connected : ${conn.connection.name}`);
    console.log(`connection url : ${conn.connection.client.s.url}`);
  }catch(err){
    console.log(err);
    process.exit(1);
  }
};

export {
  connectDB
}
