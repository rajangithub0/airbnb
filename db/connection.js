const mongoose = require('mongoose');
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ne4pcyr.mongodb.net/?retryWrites=true&w=majority&appName=airbnb_simple`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true
    }
  )
  .then(() => console.log("connection succesfull"))
  .catch((err) => console.log(err));
