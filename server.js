const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require('./Log/Logger.js');
const notifier = require('node-notifier');
const session = require('express-session');
const admin = require('firebase-admin');
const serviceAccount = require('./utils/ssd-frontend-firebase-adminsdk-3bwg7-5e9826cf99.json'); // Specify the correct path

const xss = require("xss-clean");


dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_LINK,
});

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

app.use(session({
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Set to true for HTTPS
    maxAge: 3600000, // Session timeout in milliseconds (e.g., 1 hour)
  },
}))

// Prevent XSS attacks
app.use(xss());

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

function isSuspiciousActivity(request) {
    // Example criteria:
    const { method, url, headers, body } = request;

    // Check if the request method is unusual (e.g., not GET or POST).
    if (method !== 'GET' && method !== 'POST') {
      return true;
    }
  
    // Check if the request URL contains suspicious keywords.
    if (url.includes('admin') || url.includes('debug')) {
      return true;
    }
  
    // Check if the request headers contain unusual values.
    if (headers['user-agent'] && headers['user-agent'].includes('curl')) {
      return true;
    }
  
    // // Check if the request body contains potentially harmful content.
    // if (body && body.includes('SQL injection attempt')) {
    //   return true;
    // }
  
    return false;
}

// Use the logger middleware
app.use((req, res, next) => {
  if (isSuspiciousActivity(req)) {
    // Log an alert with Winston
    logger.debug(`${req.method} ${req.url}`);
    logger.warn('Suspicious activity detected:', { request: req });
    // You can also trigger notifications here (e.g., send an email, push notification, etc.).
    notifier.notify({
      title: 'Suspicious Activity Detected',
      message: 'Check the logs for details.'
    });
    
  }
  else
  {
    logger.debug(`${req.method} ${req.url}`);
  }
  
  next();
});

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