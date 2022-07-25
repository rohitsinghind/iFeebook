const mongoose = require("mongoose");
const MONGO_URI = 'mongodb+srv://rksinghpc:tihorkumar@cluster0.3bvfzex.mongodb.net/?retryWrites=true&w=majority'

exports.connectDatabase = () => {
    mongoose
        .connect(MONGO_URI)
        .then(() => console.log(`Database Connected`))
        .catch((err) => console.log(err));
}