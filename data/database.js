import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "hostal_project",
    }).then((db) => {
        console.log(`Database is connected with ${db.connection.host} `)
    }).catch((err) => {
        console.log(err);
    });
};