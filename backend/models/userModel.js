var mongoose = require("mongoose");
var dotenv = require('dotenv')

dotenv.config({path: "./.env"})

const mongoUri = process.env.MONGODB_URL;

// connect with promise + logging
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected:", mongoUri);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// connection event handlers
mongoose.connection.on("connected", () => {
  console.log("Mongoose event: connected");
});
mongoose.connection.on("error", (err) => {
  console.error("Mongoose event: error ->", err);
});
mongoose.connection.on("disconnected", () => {
  console.warn("Mongoose event: disconnected");
});
mongoose.connection.on("reconnected", () => {
  console.log("Mongoose event: reconnected");
});

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phoneno: Number,
  password: String,
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
