const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials:true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server successfully  started on : ${PORT}`));



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


//import routes
const Auth = require("./routes/AuthRoutes");
const product = require("./routes/product.routes");
const equipment = require("./routes/EquipmentsRoutes");
const membership = require("./routes/MembershipsRoutes");
const userRouter = require("./routes/userRoutes");
const instructor = require("./routes/InstructorsRoutes");
const workout = require("./routes/WorkoutsRoutes");
const diet = require("./routes/DietsRoutes");
const payment = require("./routes/paymetRoutes");
const card = require("./routes/cardRoutes");
const cart = require("./routes/cart");


//User management routes
app.use("/gym",Auth);

//Store management routes
app.use("/product",product);
app.use("/uploads", express.static("uploads"));


//Equipments Routes
app.use("/gym/equipment", equipment);

//Instructors Routes
app.use("/gym/instructor", instructor);

//Membership Routes
app.use("/gym/membership", membership);

//user routes
app.use("/gym/user",userRouter);

//Workout Routes
app.use("/gym/workout", workout);

//Diet Routes
app.use("/gym/diet", diet);

//Payment Routes
app.use("/gym/payment", payment);

//Card Routes
app.use("/gym/card", card)

//cart routes
app.use("/gym/cart",cart)