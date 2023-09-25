const mongoose = require("mongoose");
const Users = require("./models/adminModel.js");
const dotenv = require("dotenv");

/* Loading the environment variables from the .env file. */
dotenv.config();

/* Connecting to the MongoDB database. */
mongoose.connect(
  process.env.DB_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);

/* Creating an array of admin objects. */
const seedAdmins = [
  {
    fullName: "admin",
    email: "admin@gmail.com",
    mobileno: "+94715391491",
    password: "$2a$10$kyDfuM.pQv/lbOQlyU.4Geycmv42dnN1O7nrGQku9kxrhwGd0dV9a", //123@Testing
  },
  {
    fullName: "admin2",
    email: "admin2@gmail.com",
    mobileno: "94715391491",
    password: "$2a$10$kyDfuM.pQv/lbOQlyU.4Geycmv42dnN1O7nrGQku9kxrhwGd0dV9a", //123@Testing
  },
];

/**
 * Delete all users, then insert the seedAdmins array into the database.
 */
const seedDB = async () => {
  try {
    await Users.deleteMany({});
    await Users.insertMany(seedAdmins);
    console.log("Successfully admins seeded to the database.");
  } catch (error) {
    console.error(error);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
