const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://Ashik:${process.env.PASSWORD}@cluster0.v6axh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Server connected with database"))
  .catch((err) => console.log(err));

module.exports = mongoose;
