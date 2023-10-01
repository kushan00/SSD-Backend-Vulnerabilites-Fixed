const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueID = require("../helpers/uniqueID");
const apiResponse = require("../helpers/apiResponse");

const passport = require('passport');
const TOTPStrategy = require('passport-totp').Strategy;

const User = require("../models/userModel.js");
const Admin = require("../models/adminModel.js");
const OTP = require("../models/userOTPModel");
const Instructor = require("../models/instructorModel.js");

const logger = require('../Log/Logger.js');

const speakeasy = require("speakeasy");
var ShoutoutClient = require("shoutout-sdk");

var apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMTBiMTc2MC01ZTliLTExZWUtODkwMi0zZjA0M2QxZjAwNDEiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY5NTk3MzMyNywiZXhwIjoyMDExNTkyNTI3LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjU3NDQ1NiIsInNvX3VzZXJfcm9sZSI6InVzZXIiLCJzb19wcm9maWxlIjoiYWxsIiwic29fdXNlcl9uYW1lIjoiIiwic29fYXBpa2V5Ijoibm9uZSJ9.T7xpeoZqZtF6R5zwHFr96rMb_FmsQ2eah-h6Dnzdv_A";

var debug = true;
var verifySSL = false;

var jwtSecret = "mysecrettoken";



const registerUser = async (req, res) => {

  const { 
        fullName, 
        email, 
        password,  
        mobileno, 
        dateOfBirth,
        weight,
        height,    
    } = req.body;


    
  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (user) {
      apiResponse.AlreadyExists(res,"User already exists",{user : user?.fullName});
      return 0; 
    }

    // generating user unique gym id
    var gym_id = await uniqueID.generateID();

    user = new User({
        gym_id,
        fullName, 
        email, 
        password,  
        mobileno, 
        dateOfBirth,
        weight,
        height, 
    });

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      apiResponse.Success(res,"Register Success",{ token, userRole: user.userRole, user: user.fullName , userID : user.gym_id , _id:user?._id  })
    });
  } catch (err) {
    logger.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const authUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) 
    {
        user = await Admin.findById(req.user.id);
        if(!user)
        {
            user = await Instructor.findById(req.user.id);
            if(!user)
            {
                apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
                return 0;  
            }
        }
    }
    apiResponse.Success(res,"Auth Success",{ user: user })
  } catch (err) {
    logger.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    // See if user exists
    let user = await User.findOne({ email });

    if (!user) 
    {
        user = await Admin.findOne({ email });
        if(!user)
        {
            user = await Instructor.findOne({ email });
            if(!user)
            {
                apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
                return 0; 
            }
        }
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
    }

    req.session.isAuthenticated = true;

    req.session.regenerate(() => {
        //Return jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(payload, jwtSecret, { expiresIn: "1 days" }, (err, token) => {
          if (err) throw err;
          apiResponse.Success(res,"Login Success",{ token, userRole: user.userRole , user: user.fullName , userID : user?.gym_id ? user?.gym_id : "" , _id:user?._id  })
        });
    });
    
  } catch (err) {
    logger.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};


const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { fullName, mobileno, email } = req.body;

  const filter = { _id: id };
  const update = { 
       fullName: fullName,
       mobileno:mobileno,
       email : email,    
      };

  try {
  
  let data = await Admin.findOneAndUpdate(filter, update);
  console.log(data);
  apiResponse.Success(res,"Admin Details Updated", {data:data});

  } catch (error) {
    logger.error(error.message);
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}


const sendUserOTP = async (req, res) => {

  const { email, password } = req.body;
  

  try {

    // See if user exists
    let user = await User.findOne({ email });

    if (!user) 
    {
        user = await Admin.findOne({ email });
        if(!user)
        {
            user = await Instructor.findOne({ email });
            if(!user)
            {
                apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
                return 0; 
            }
        }
    }
    

      // Generate a new secret for the user (store this securely on the server)
      const secret = speakeasy.generateSecret();

      // Generate the OTP code
      const otp = secret;

      const otpSaved = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
    });
  
      userOTP = new OTP({
          email,
          otp, 
      });

      await userOTP.save();

      let olduser = await OTP.findOne({ email });

       if (!olduser) 
       {
          await userOTP.save();  
       }
       else
       {
          const filter = { _id: olduser._id };
          const update = { 
              otp:otp,
              email : email,    
              };
          
          await OTP.findOneAndUpdate(filter, update);
       }

      // Send the OTP via SMS (using Twilio in this example)
      var client = new ShoutoutClient(apiKey, debug, verifySSL);
  
      var message = {
          content: {
          sms:
              "Hello! "+"\n"+
              " Your OTP code :-" +
              otpSaved
          },
          destinations: [user.mobileno],
          source: "ShoutDEMO",
          transports: ["SMS"],
      };
  
      client.sendMessage(message, (error, result) => {          
          if (error) {
            console.log("asdasdasd",error);
            apiResponse.ServerError(res,"OTP sending Error",{data:error});
          } else {
            console.log("asdasdasd",result);
            apiResponse.Success(res,"OTP sent Successfull", {data:result});
          }
      });
    
  } catch (err) {
    logger.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const verifyUserOTP = async (req, res) => {

  const { email,otp } = req.body; 



  try {  
    
       // See if user exists
       let user = await OTP.findOne({ email });

       console.log(user);

       if (!user) 
       {
          apiResponse.NotFound(res,"OTP not Valid",{ err: "Error" })
          return 0;  
       }

    // Verify the OTP
    const verificationResult = speakeasy.totp.verify({
      secret: user.otp.base32,
      encoding: 'base32',
      token: otp,
      window: 1, // Optional: Allow a small time window (e.g., 1 step) for clock skew
    });
    
    if (verificationResult) {
        console.log('OTP is valid');
        apiResponse.Success(res,"OTP Verify Successfull", {data:verificationResult});
    } else {
        console.log('OTP is invalid');
        apiResponse.ServerError(res,"OTP Verify failed",{data:verificationResult});
    }

  } catch (err) {
    logger.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};



module.exports = {
  registerUser,
  authUser,
  loginUser,
  updateAdmin,
  sendUserOTP,
  verifyUserOTP
};
