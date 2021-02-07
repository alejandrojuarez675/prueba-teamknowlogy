import mongoose from 'mongoose';

/**
 * Method that connect the server with de MongoDB.
 * 
 * For default has the local host and a default name that can be replace with environment paths
 */
async function connect() {
    const host = process.env.MONGO_HOST || 'localhost';
    const dbName = process.env.DB || 'prueba-teamknowlogy';
    const dbProtocol = process.env.DB_PROTOCOL || 'mongodb';
    const dbAuth = process.env.USER_PASSWORD || undefined;

    await mongoose.connect(`${dbProtocol}://${dbAuth ? dbAuth + '@' : ''}${host}/${dbName}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    console.log(`MongoDb '${dbName}' at '${host}' is connected`)
}
connect();

export default mongoose.connection;